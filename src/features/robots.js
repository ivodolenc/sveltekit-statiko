import { writeFile } from 'node:fs/promises'
import { isArray, isEmpty } from '../utils/index.js'

function parseRules(block) {
  let newRules = ''

  for (let rule of Object.keys(block)) {
    if (!isArray(block[rule])) {
      newRules += `${rule}: ${block[rule]}\n`
    } else {
      for (let value of block[rule]) {
        newRules += `${rule}: ${value}\n`
      }
    }
  }

  return `${newRules}\n`
}

function parseSitemaps(sitemaps) {
  let newSitemaps = ''

  for (let sitemap of sitemaps) newSitemaps += `Sitemap: ${sitemap}\n`

  return newSitemaps
}

function generateRobots(options) {
  const { robots } = options

  let robotsContent = ''
  let rulesContent = ''

  for (let block of robots.rules) rulesContent += parseRules(block)

  robotsContent += rulesContent

  if (robots.sitemaps) robotsContent += parseSitemaps(robots.sitemaps)

  return robotsContent.trim()
}

export function Robots(options) {
  const { buildDir, outDir, robots, sitemap } = options

  try {
    let status, message

    if (robots) {
      status = 'success'
      message = `${robots.fileName} file is created in the "${buildDir}" directory`

      let file = `${buildDir}/${robots.fileName}`
      let fileCopy = `${outDir}/${robots.fileName}`
      let defaultSitemap = `${options.siteUrl}/${options.sitemap.fileName}`
      let defaultsRules = {
        'User-agent': '*',
        Disallow: ''
      }

      if (isEmpty(robots.rules)) robots.rules.push(defaultsRules)

      if (sitemap && isEmpty(robots.sitemaps))
        robots.sitemaps.push(defaultSitemap)

      let robotsContent = generateRobots(options)

      for (let _file of [file, fileCopy]) writeFile(_file, robotsContent)
    }

    return {
      status,
      message
    }
  } catch (err) {
    throw new Error(err)
  }
}
