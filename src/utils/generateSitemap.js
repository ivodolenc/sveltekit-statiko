const parseRoutes = (options, files) => {
  let newRoutes = []
  let customRoutes = options.sitemap.routes
  let buildDir = options.buildDir

  for (let file of files) {
    let routeSlug = file.replace(buildDir, '').replace(/index|.html/g, '')

    const routeDetails = {
      id: routeSlug,
      url: `${options.siteUrl}${routeSlug}`,
      lastmod: options.sitemap.lastmod,
      changefreq: options.sitemap.changefreq,
      priority: options.sitemap.priority
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

export const generateSitemap = (options, routes) => {
  let parsedRoutes = parseRoutes(options, routes)
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`
  let urlsetOpen = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`
  let urlsetClose = `</urlset>`
  let urlOpen = `<url>\n`
  let urlClose = `</url>\n`
  let urls = ''

  const generateUrls = () => {
    for (let route of parsedRoutes) {
      const loc = `<loc>${route.url}</loc>\n`

      const lastmod = options.sitemap.lastmod
        ? `<lastmod>${route.lastmod}</lastmod>\n`
        : ''

      const changefreq = options.sitemap.changefreq
        ? `<changefreq>${route.changefreq}</changefreq>\n`
        : ''

      const priority = options.sitemap.priority
        ? `<priority>${route.priority}</priority>\n`
        : ''

      urls += urlOpen + loc + lastmod + changefreq + priority + urlClose
    }

    return urls.replace(/^\s*[\r\n]/gm, '')
  }

  let generateContent = xml + urlsetOpen + generateUrls() + urlsetClose

  return generateContent
}
