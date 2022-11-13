import { writeFile } from 'node:fs/promises'
import fg from 'fast-glob'

function parseRoutes(options, files) {
  const { buildDir, siteUrl, sitemap } = options

  let newRoutes = []
  let customRoutes = sitemap.routes

  for (let file of files) {
    let routeSlug = file.replace(buildDir, '').replace(/index|.html/g, '')

    let routeDetails = {
      id: routeSlug,
      url: `${siteUrl}${routeSlug}`,
      lastmod: sitemap.lastmod,
      changefreq: sitemap.changefreq,
      priority: sitemap.priority
    }

    if (customRoutes.length) {
      let routeMatchId = customRoutes.filter(
        route => route.id === routeDetails.id
      )
      let routeMatchDetails = routeMatchId.flat()
      let routeCustomDetails = Object.assign(routeDetails, ...routeMatchDetails)

      newRoutes.push(routeCustomDetails)
    } else {
      newRoutes.push(routeDetails)
    }
  }

  newRoutes.sort((a, b) => b.id.length - a.id.length)

  return newRoutes.slice().reverse()
}

function generateUrls(sitemap, parsedRoutes) {
  let urlOpen = `<url>\n`
  let urlClose = `</url>\n`
  let urls = ''

  for (let route of parsedRoutes) {
    let loc = `<loc>${route.url}</loc>\n`
    let lastmod = sitemap.lastmod ? `<lastmod>${route.lastmod}</lastmod>\n` : ''
    let changefreq = sitemap.changefreq
      ? `<changefreq>${route.changefreq}</changefreq>\n`
      : ''
    let priority = sitemap.priority
      ? `<priority>${route.priority}</priority>\n`
      : ''

    urls += urlOpen + loc + lastmod + changefreq + priority + urlClose
  }

  return urls.replace(/^\s*[\r\n]/gm, '')
}

function generateSitemap(options, routes) {
  const { sitemap } = options

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`
  let urlsetOpen = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`
  let urlsetClose = `</urlset>`
  let parsedRoutes = parseRoutes(options, routes)
  let urls = generateUrls(sitemap, parsedRoutes)

  let generateContent = xml + urlsetOpen + urls + urlsetClose

  return generateContent
}

export async function Sitemap(options) {
  const { buildDir, outDir, sitemap } = options

  try {
    let status, message

    if (sitemap) {
      status = 'success'
      message = `${sitemap.fileName} file is created in the "${buildDir}" directory`

      let exclude = [`${buildDir}/_app/**`, ...sitemap.exclude]
      let files = await fg([`${buildDir}/**/*.html`], {
        ignore: exclude
      })
      let file = `${buildDir}/${sitemap.fileName}`
      let fileCopy = `${outDir}/${sitemap.fileName}`

      let sitemapContent = generateSitemap(options, files)

      for (let _file of [file, fileCopy]) writeFile(_file, sitemapContent)
    }

    return {
      status,
      message
    }
  } catch (err) {
    throw new Error(err)
  }
}
