const parseRoutes = (options, files) => {
  let newRoutes = []
  let customRoutes = options.sitemap.routes

  for (let file of files) {
    let routeSlug = file
      .replace(options.sitemap.outDir + '/', '')
      .replace(/index|.html/g, '')

    let routeName = routeSlug === '' ? 'index' : routeSlug

    const routeDetails = {
      name: routeName,
      url: `${options.siteUrl}/${routeSlug}`,
      changefreq: options.sitemap.changefreq,
      priority: options.sitemap.priority,
      lastmod: options.sitemap.lastmod
    }

    if (customRoutes.length) {
      let routeMatchName = customRoutes.filter(
        route => route.name === routeDetails.name
      )

      let routeMatchDetails = routeMatchName.flat()
      let routeCustomDetails = Object.assign(routeDetails, ...routeMatchDetails)

      newRoutes.push(routeCustomDetails)
    } else {
      newRoutes.push(routeDetails)
    }
  }

  return newRoutes.reverse()
}

const generateSitemap = (options, routes) => {
  let parsedRoutes = parseRoutes(options, routes)
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`
  let urlsetOpen = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`
  let urlsetClose = `</urlset>`
  let urlOpen = `<url>\n`
  let urlClose = `</url>\n`

  const generateUrls = () => {
    let urls = ''

    for (let route of parsedRoutes) {
      const changefreq = options.sitemap.changefreq
        ? `<changefreq>${route.changefreq}</changefreq>\n`
        : ''

      const priority = options.sitemap.priority
        ? `<priority>${route.priority}</priority>\n`
        : ''

      const lastmod = options.sitemap.lastmod
        ? `<lastmod>${route.lastmod}</lastmod>\n`
        : ''

      const loc = `<loc>${route.url}</loc>\n`

      urls += urlOpen + loc + changefreq + priority + lastmod + urlClose
    }

    return urls.replace(/^\s*[\r\n]/gm, '')
  }

  let generateContent = xml + urlsetOpen + generateUrls() + urlsetClose

  return generateContent
}

export { generateSitemap }
