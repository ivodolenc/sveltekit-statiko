const defaults = {
  siteUrl: '',
  logs: true,
  sitemap: {
    outDir: 'build',
    previewDir: '.svelte-kit/output/client',
    fileName: 'sitemap.xml',
    changefreq: 'daily',
    priority: 0.6,
    lastmod: new Date().toISOString(),
    routes: [],
    exclude: [],
    logs: true
  },
  robots: {
    outDir: 'build',
    previewDir: '.svelte-kit/output/client',
    fileName: 'robots.txt',
    logs: true,
    rules: [],
    sitemaps: []
  },
  manifest: {
    staticDir: 'static',
    outDir: 'build',
    previewDir: '.svelte-kit/output/client',
    fileName: 'site.webmanifest',
    logs: true,
    rules: {
      name: process.env.npm_package_name,
      short_name: process.env.npm_package_name,
      description: process.env.npm_package_description,
      display: 'standalone',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      icons: []
    }
  },
  minification: {
    outDir: 'build',
    logs: true,
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

export { defaults }
