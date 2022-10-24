import { readFileSync, writeFileSync, unlinkSync } from 'fs'
import { merge } from 'merge-kit'
import fg from 'fast-glob'
import { minify } from 'html-minifier-terser'
import { defaults } from './defaults.js'
import {
  log,
  generateSitemap,
  generateRobots,
  generateLogs
} from './utils/index.js'

export const Statiko = pluginOptions => {
  let options, buildDir, staticDir, outDir
  let appTemplate, manifestHref, manifestLink

  return {
    name: 'sveltekit-statiko',
    enforce: 'post',

    apply(config, { command }) {
      return command === 'build' && !config.build.ssr
    },

    async configResolved(viteConfig) {
      options = merge([defaults, pluginOptions])

      buildDir = options.buildDir
      staticDir = viteConfig.publicDir
      outDir = viteConfig.build.outDir

      appTemplate = options.manifest.appTemplate
      manifestHref = options.manifest.fileName

      if (typeof options.manifest.link === 'string')
        manifestHref = options.manifest.link

      manifestLink = `<link rel="manifest" href="/${manifestHref}" />`
    },

    buildStart() {
      if (options.siteUrl === '') {
        log.n()
        log.error('sveltekit-statiko > "siteUrl" option must be specified')
        process.exit()
      }

      if (options.manifest) {
        let manifestFile = `${staticDir}/${options.manifest.fileName}`
        let manifestContent = JSON.stringify(options.manifest.rules, null, 2)

        if (options.manifest.link) {
          let appContent = readFileSync(appTemplate, 'utf-8', err => {
            if (err) return log.error(err)
          })
          let injectLink = appContent.replace(
            /<\/head>/,
            `${manifestLink}</head>`
          )

          writeFileSync(appTemplate, injectLink, err => {
            if (err) return log.error(err)
          })
        }

        writeFileSync(manifestFile, manifestContent, err => {
          if (err) return log.error(err)
        })
      }
    },

    async closeBundle() {
      const isEmpty = v => v.length === 0
      let excludeDefaults = [`${buildDir}/_app/**`]

      if (options.sitemap) {
        let sitemapExclude = [...excludeDefaults, ...options.sitemap.exclude]
        let sitemapHtmlFiles = await fg([`${buildDir}/**/*.html`], {
          ignore: sitemapExclude
        })
        let sitemapFile = `${buildDir}/${options.sitemap.fileName}`
        let sitemapFileCopy = `${outDir}/${options.sitemap.fileName}`

        let sitemapContent = generateSitemap(options, sitemapHtmlFiles)

        for (let file of [sitemapFile, sitemapFileCopy]) {
          writeFileSync(file, sitemapContent, err => {
            if (err) return log.error(err)
          })
        }
      }

      if (options.robots) {
        let robotsFile = `${buildDir}/${options.robots.fileName}`
        let robotsFileCopy = `${outDir}/${options.robots.fileName}`
        let robotsDefaultSitemap = `${options.siteUrl}/${options.sitemap.fileName}`
        let robotsDefaultsRules = {
          'User-agent': '*',
          Disallow: ''
        }

        if (isEmpty(options.robots.rules))
          options.robots.rules.push(robotsDefaultsRules)

        if (options.robots.sitemaps && isEmpty(options.robots.sitemaps))
          options.robots.sitemaps.push(robotsDefaultSitemap)

        let robotsContent = generateRobots(options)

        for (let file of [robotsFile, robotsFileCopy]) {
          writeFileSync(file, robotsContent, err => {
            if (err) return log.error(err)
          })
        }
      }

      if (options.manifest) {
        let manifestUnlink = `${staticDir}/${options.manifest.fileName}`

        unlinkSync(manifestUnlink)

        if (options.manifest.link) {
          let appContent = readFileSync(appTemplate, 'utf-8', err => {
            if (err) return log.error(err)
          })

          let removeLink = appContent
            .replaceAll(manifestLink, '')
            .replace(/^\s*[\r\n]/gm, '')

          writeFileSync(appTemplate, removeLink, err => {
            if (err) return log.error(err)
          })
        }
      }

      if (options.minification) {
        let minificationExclude = [
          ...excludeDefaults,
          ...options.minification.exclude
        ]

        let minificationOptions = options.minification.rules
        let minificationHtmlFiles = await fg([`${buildDir}/**/*.html`], {
          ignore: minificationExclude
        })

        for (let file of minificationHtmlFiles) {
          let fileContent = readFileSync(file, 'utf-8', err => {
            if (err) return log.error(err)
          })
          let minifiedContent = await minify(fileContent, minificationOptions)

          writeFileSync(file, minifiedContent, err => {
            if (err) return log.error(err)
          })
        }
      }

      if (options.logs) generateLogs(options)
    }
  }
}
