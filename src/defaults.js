export const defaults = {
  siteUrl: '',
  logs: true,
  buildDir: 'build',
  sitemap: {
    fileName: 'sitemap.xml',
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: 0.6,
    routes: [],
    exclude: []
  },
  robots: {
    fileName: 'robots.txt',
    rules: [],
    sitemaps: []
  },
  manifest: {
    appTemplate: 'src/app.html',
    fileName: 'site.webmanifest',
    link: true,
    rules: {
      name: process.env.npm_package_name,
      short_name: process.env.npm_package_name,
      description: process.env.npm_package_description,
      start_url: '/?standalone=true',
      display: 'standalone',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      icons: []
    }
  },
  minification: {
    exclude: [],
    rules: {
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true
    }
  }
}
