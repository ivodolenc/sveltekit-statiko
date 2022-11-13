export const defaults = {
  siteUrl: '',
  logs: true,
  buildDir: 'build',
  appTemplate: 'src/app.html',
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
  icons: {
    src: 'static/icon.png',
    outDir: 'favicons',
    links: true,
    hash: true,
    sizes: [32, 64, 180, 192, 512],
    quality: {
      jpeg: { quality: 80 },
      png: { compressionLevel: 6 }
    }
  },
  manifest: {
    fileName: 'site.webmanifest',
    link: true,
    hash: true,
    rules: {
      id: '/?source=pwa',
      start_url: '/?source=pwa',
      display: 'standalone',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      icons: []
    }
  },
  minification: {
    exclude: [],
    rules: {
      collapseWhitespaces: 'all'
    }
  }
}
