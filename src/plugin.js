import { readFileSync, writeFileSync, existsSync, unlinkSync } from 'fs'
import fg from 'fast-glob'
import { merge } from 'merge-kit'
import { minify } from 'html-minifier-terser'
import { defaults } from './defaults.js'
import {
  log,
  generateSitemap,
  generateRobots,
  generateLogs
} from './utils/index.js'

const plugin = pluginOptions => {
  let config, options

  return {
    name: 'sveltekit-statiko',
    enforce: 'post',

    configResolved(resolveConfig) {
      config = resolveConfig
      options = merge([defaults, pluginOptions])
    },

    buildStart() {
      if (!config.build.ssr) {
        if (options.manifest) {
          let manifestFile = `${options.manifest.staticDir}/${options.manifest.fileName}`
          let manifestContent = JSON.stringify(options.manifest.rules, null, 2)

          writeFileSync(manifestFile, manifestContent, err => {
            if (err) return log.error(err)
          })
        }
      }
    },

    async closeBundle() {
      if (config.command === 'build' && !config.build.ssr) {
        const isEmpty = v => v.length === 0
        let excludeDefaults = [
          'build/_app/**',
          'build/favicons/**',
          'build/images/**',
          'build/fonts/**'
        ]

        if (options.siteUrl === '') {
          log.n()
          log.error('sveltekit-statiko > "siteUrl" option must be specified')
          process.exit()
        }

        if (options.sitemap) {
          let sitemapExclude = [...excludeDefaults, ...options.sitemap.exclude]
          let sitemapHtmlFiles = await fg(
            [`${options.sitemap.outDir}/**/*.html`],
            {
              ignore: sitemapExclude
            }
          )
          let sitemapFile = `${options.sitemap.outDir}/${options.sitemap.fileName}`
          let sitemapFilePreview = `${options.sitemap.previewDir}/${options.sitemap.fileName}`
          let sitemapContent = generateSitemap(options, sitemapHtmlFiles)

          writeFileSync(sitemapFile, sitemapContent, err => {
            if (err) return log.error(err)
          })
          writeFileSync(sitemapFilePreview, sitemapContent, err => {
            if (err) return log.error(err)
          })
        }

        if (options.robots) {
          let robotsFile = `${options.robots.outDir}/${options.robots.fileName}`
          let robotsFilePreview = `${options.robots.previewDir}/${options.robots.fileName}`
          let robotsDefaultSitemap = `${options.siteUrl}/${options.sitemap.fileName}`
          let robotsDefaultsRules = {
            'User-agent': '*',
            Disallow: ''
          }

          if (isEmpty(options.robots.rules))
            options.robots.rules.push(robotsDefaultsRules)

          if (isEmpty(options.robots.sitemaps))
            options.robots.sitemaps.push(robotsDefaultSitemap)

          let robotsContent = generateRobots(options)

          writeFileSync(robotsFile, robotsContent, err => {
            if (err) return log.error(err)
          })
          writeFileSync(robotsFilePreview, robotsContent, err => {
            if (err) return log.error(err)
          })
        }

        if (options.manifest) {
          let manifestFile = `${options.manifest.outDir}/${options.manifest.fileName}`
          let manifestFilePreview = `${options.manifest.previewDir}/${options.manifest.fileName}`
          let manifestContent = JSON.stringify(options.manifest.rules, null, 2)
          let manifestUnlink = `${options.manifest.staticDir}/${options.manifest.fileName}`

          writeFileSync(manifestFile, manifestContent, err => {
            if (err) return log.error(err)
          })
          writeFileSync(manifestFilePreview, manifestContent, err => {
            if (err) return log.error(err)
          })

          if (existsSync(manifestUnlink)) unlinkSync(manifestUnlink)
        }

        if (options.minification) {
          let minificationExclude = [
            ...excludeDefaults,
            ...options.minification.exclude
          ]

          let minificationOptions = options.minification.rules
          let minificationHtmlFiles = await fg(
            [`${options.minification.outDir}/**/*.html`],
            {
              ignore: minificationExclude
            }
          )

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
}

export default plugin
