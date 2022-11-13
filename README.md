<p align="center">
  <img src=".assets/cover.svg" />
</p>

<h1 align="center">SvelteKit Statiko</h1>

<p align="center">A multi-featured assistant for SvelteKit static projects.</p>

## Features

- Generates sitemap, robots, icons and manifest on the fly
- Automatically minifies all html files for production
- Supports static and dynamic routes
- Allows advanced customization for each feature separately
- Helps you to easily manage crawler traffic to your site
- Runs only during the build process to maximize the dev workflow
- Surprisingly fast, lightweight and efficient solution
- Designed for SSG rendering mode

## Quick Start

1. Install `sveltekit-statiko` to your project

```sh
npm i -D sveltekit-statiko
```

2. Enable the plugin in the Vite configuration file

```js
// vite.config.js

import { Statiko } from 'sveltekit-statiko'

export default {
  plugins: [
    Statiko({
      siteUrl: 'https://www.website.com' // Set your website url
    })
  ]
}
```

That's it! Start developing your app!

**Statiko's** minimal setup will automatically generate `sitemap.xml`, `robots.txt` and `site.webmanifest` files with all dynamic content during the `build` process.

To see and test all changes, simply run the `preview` command.

## Configuration

Options can be customized through `Statico()` plugin. See all [defaults](src/defaults.js).

```js
// vite.config.js

import { Statiko } from 'sveltekit-statiko'

export default {
  plugins: [
    Statiko({
      // plugin options ...
    })
  ]
}
```

## Site Url

- Type: `String`
- Default: `''`

Defines website url for production.

If the `sitemap` feature won't be used, feel free to skip this option.

```js
// Defaults

{
  siteUrl: ''
}
```

```js
// Example

{
  siteUrl: 'https://www.website.com'
}
```

## Sitemap

- Type: `Object`
- Default: `{ ... }`

Automatically generates a _sitemap.xml_ file with all dynamic content during the `build` process.

Also, the `trailingSlash` option will be automatically detected and parsed accordingly so there is no need for additional settings.

After the build process is done, run the `preview` command to see it in action.

```js
// Defaults

{
  sitemap: {
    fileName: 'sitemap.xml',
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: 0.6,
    routes: [],
    exclude: []
  }
}
```

For example, let's say you have a _home_ and an _about_ page.

Default settings will generate this content:

```html
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.website.com/</loc>
    <lastmod>2022-10-18T08:51:38.126Z</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://www.website.com/about</loc>
    <lastmod>2022-10-18T08:51:38.126Z</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
```

To completely disable the _sitemap_ feature, set it to `false`.

```js
// Disables the feature

{
  sitemap: false,
}
```

### sitemap.fileName

- Type: `String`
- Default: `'sitemap.xml'`

Defines the file name.

```js
// Defaults

{
  sitemap: {
    fileName: 'sitemap.xml'
  }
}
```

### sitemap.lastmod

- Type: `String`
- Default: `new Date().toISOString()`

Defines the last date when the specified page was modified. It uses the format `YYYY-MM-DD` or `YYYY-MM-DDThh:mm:ssTZD`.

```js
// Defaults

{
  sitemap: {
    lastmod: new Date().toISOString()
  }
}
```

To disable the option, set it to `false`.

```js
// Disables the option

{
  sitemap: {
    lastmod: false
  }
}
```

### sitemap.changefreq

- Type: `String`
- Default: `'daily'`

Defines how frequently the page is likely to change.

Available values are `always`, `hourly`, `weekly`, `monthly`, `yearly` and `never`.

```js
// Defaults

{
  sitemap: {
    changefreq: 'daily'
  }
}
```

To disable the option, set it to `false`.

```js
// Disables the option

{
  sitemap: {
    changefreq: false
  }
}
```

### sitemap.priority

- Type: `Number`
- Default: `0.6`

Defines the page priority. It uses numbers from `0.0` to `1.0`.

```js
// Defaults

{
  sitemap: {
    priority: 0.6
  }
}
```

To disable the option, set it to `false`.

```js
// Disables the option

{
  sitemap: {
    priority: false
  }
}
```

### sitemap.routes

- Type: `Array`
- Default: `[]`

An array of objects that allows customization for each route separately.

```js
// Defaults

{
  sitemap: {
    routes: []
  }
}
```

This is possible via a unique `id`, which is basically a `/route-slug`.

```js
// Example

{
  sitemap: {
    routes: [
      {
        id: '/', // index page
        lastmod: '2022-09-03',
        changefreq: 'daily',
        priority: 1.0
      },
      {
        id: '/about', // about page
        lastmod: '2022-10-18',
        changefreq: 'weekly',
        priority: 0.7
      }
      // ...
    ]
  }
}
```

### sitemap.exclude

- Type: `Array`
- Default: `[]`

An array of glob patterns that exclude routes from the sitemap.

```js
// Defaults

{
  sitemap: {
    exclude: [
      // Excluded directories
      'build/_app/**'
    ]
  }
}
```

## Robots

- Type: `Object`
- Default: `{ ... }`

Automatically generates a _robots.txt_ file with all dynamic content during the `build` process.

After the build process is done, run the `preview` command to see it in action.

```js
// Defaults

{
  robots: {
    fileName: 'robots.txt',
    rules: [],
    sitemaps: []
  }
}
```

Default settings will generate this _robots_ content:

```txt
User-agent: *
Disallow:

Sitemap: https://www.website.com/sitemap.xml
```

To completely disable the _robots_ feature, set it to `false`.

```js
// Disables the feature

{
  robots: false,
}
```

### robots.fileName

- Type: `String`
- Default: `'robots.txt'`

Defines the file name.

```js
// Defaults

{
  robots: {
    fileName: 'robots.txt'
  }
}
```

### robots.rules

- Type: `Array`
- Default: `[ ... ]`

An array of objects that define _robots_ rules. Each object is treated as a separate block of rules.

See all available [rules](https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt).

```js
// Defaults

{
  robots: {
    rules: [
      {
        'User-agent': '*',
        Disallow: ''
      }
    ]
  }
}
```

```js
// Example

{
  robots: {
    rules: [
      {
        'User-agent': '*',
        Disallow: ''
      },
      {
        'User-agent': ['agent-1', 'agent-2'],
        'Crawl-delay': 90,
        Disallow: ['/url-1', '/url-2', '/url-3']
      },
      {
        'User-agent': 'agent-3',
        Allow: ['/url-4', '/url-5']
      }
    ]
  }
}
```

The example above will generate this content:

```txt
User-agent: *
Disallow:

User-agent: agent-1
User-agent: agent-2
Crawl-delay: 90
Disallow: /url-1
Disallow: /url-2
Disallow: /url-3

User-agent: agent-3
Allow: /url-4
Allow: /url-5
```

### robots.sitemaps

- Type: `Array`
- Default: `[ ... ]`

An array of values that define _robots_ sitemaps. Each value is treated as a new url.

```js
// Defaults

{
  robots: {
    sitemaps: ['https://www.website.com/sitemap.xml']
  }
}
```

```js
// Example

{
  robots: {
    sitemaps: [
      'https://www.website.com/sitemap-1.xml',
      'https://www.website.com/sitemap-2.xml',
      'https://www.website.com/sitemap-3.xml'
    ]
  }
}
```

The example above will generate this content:

```txt
Sitemap: https://www.website.com/sitemap-1.xml
Sitemap: https://www.website.com/sitemap-2.xml
Sitemap: https://www.website.com/sitemap-3.xml
```

To disable the option, set it to `false`.

```js
// Disables the option

{
  robots: {
    sitemaps: false
  }
}
```

## Icons

- Type: `Object`
- Default: `{ ... }`

Automatically generates site favicons.

By default, it scans the `static/` directory for `icon.png` and automatically generates all other favicons (32, 64, 180, 192, 512) from that file.

Of course, icon links will be also injected into the _.html_ and _.webmanifest_ files.

So all you need to do is simply put `icon.png` in the `static/` directory and that's it. Recommended icon size is `512x512` px.

```js
// Defaults

{
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
  }
}
```

To completely disable the _icons_ feature, set it to `false`.

```js
// Disables the feature

{
  icons: false,
}
```

### icons.src

- Type: `String`
- Default: `'static/icon.png'`

Defines the icon's source.

```js
// Defaults

{
  icons: {
    src: 'static/icon.png',
  }
}
```

```js
// Example

{
  icons: {
    // Set different source if needed
    src: 'src/assets/images/icon.png',
  }
}
```

### icons.outDir

- Type: `String`
- Default: `'favicons'`

Defines the icon's output directory. This option cannot be empty or specify a path outside a directory.

```js
// Defaults

{
  icons: {
    outDir: 'favicons',
  }
}
```

### icons.links

- Type: `Boolean`
- Default: `true`

Automatically inserts icon links in `.html` and `.webmanifest` files.

```js
// Defaults

{
  icons: {
    link: true
  }
}
```

### icons.hash

- Type: `Boolean`
- Default: `true`

Appends a random string to the icon filename.

```js
// Defaults

{
  icons: {
    hash: true
  }
}
```

### icons.sizes

- Type: `Array`
- Default: `[32, 64, 180, 192, 512]`

Specifies all other sizes that will be generated from the main `icon.png` file.

```js
// Defaults

{
  icons: {
    sizes: [32, 64, 180, 192, 512],
  }
}
```

### icons.quality

- Type: `Object`
- Default: `{ ... }`

Specifies compression level.

```js
// Defaults

{
  icons: {
    quality: {
      jpeg: { quality: 80 },
      png: { compressionLevel: 6 }
    }
  }
}
```

## Manifest (Web App)

- Type: `Object`
- Default: `{ ... }`

Automatically generates a _site.webmanifest_ file with all dynamic content during the `build` process.

After the build process is done, run the `preview` command to see it in action.

By default, the _manifest_ `<link />` tag will be injected into the `<head>` section so you don't have to worry about that. Of course, if you want to disable that and manage it manually, set the `link` option to `false`.

```js
// Defaults

{
  manifest: {
    fileName: 'site.webmanifest',
    link: true,
    hash: true,
    rules: {
      name: package_name,
      short_name: package_name,
      description: package_description,
      id: '/?source=pwa',
      start_url: '/?source=pwa',
      display: 'standalone',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      icons: []
    }
  }
}
```

Default settings will generate this content:

```json
{
  "name": "your-package-name",
  "short_name": "your-package-name",
  "description": "your-package-description",
  "id": "/?source=pwa",
  "start_url": "/?standalone=true",
  "display": "standalone",
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "icons": [
    // links will be automatically added
    {
      "src": "/favicons/icon-64-nqfe8lpy.png",
      "sizes": "64x64",
      "type": "image/png"
    },
    {
      "src": "/favicons/icon-192-nqfe8lpy.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/favicons/icon-512-nqfe8lpy.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

To completely disable the _manifest_ feature, set it to `false`.

```js
// Disables the feature

{
  manifest: false,
}
```

### manifest.fileName

- Type: `String`
- Default: `'site.webmanifest'`

Defines the file name.

```js
// Defaults

{
  manifest: {
    fileName: 'site.webmanifest'
  }
}
```

### manifest.link

- Type: `Boolean`
- Default: `true`

Automatically injects manifest's `<link />` into the `<head>` section.

```js
// Defaults

{
  manifest: {
    link: true
  }
}
```

### manifest.hash

- Type: `Boolean`
- Default: `true`

Appends a random string to the manifest filename.

```js
// Defaults

{
  manifest: {
    hash: true
  }
}
```

### manifest.rules

- Type: `Object`
- Default: `{ ... }`

Defines _manifest_ rules. See all available [rules](https://developer.mozilla.org/en-US/docs/Web/Manifest#members).

```js
// Defaults

{
  manifest: {
    rules: {
      name: package_name,
      short_name: package_name,
      description: package_description,
      id: '/?source=pwa',
      start_url: '/?source=pwa',
      display: 'standalone',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      icons: []
    }
  }
}
```

```js
// Example

{
  manifest: {
    rules: {
      name: 'website-name',
      orientation: 'portrait'
      // ...
    }
  }
}
```

## Minification

- Type: `Object`
- Default: `{ ... }`

Automatically minifies all _.html_ files for production.

```js
// Defaults

{
  minification: {
    exclude: [],
    rules: {
      collapseWhitespaces: 'all'
    }
  }
}
```

To completely disable the _minification_ feature, set it to `false`.

```js
// Disables the feature

{
  minification: false,
}
```

### minification.exclude

- Type: `Array`
- Default: `[]`

An array of glob patterns that exclude _.html_ files from the minification.

```js
// Defaults

{
  minification: {
    exclude: [
      // Excluded directories
      'build/_app/**'
    ]
  }
}
```

### minification.rules

- Type: `Object`
- Default: `{ ... }`

Minification is done by _@swc/html_ under the hood. See all available [rules](https://github.com/swc-project/bindings/blob/main/packages/html/index.ts#L5).

```js
// Defaults

{
  minification: {
    rules: {
      collapseWhitespace: 'all',
    }
  }
}
```

## Logs

- Type: `Boolean`
- Default: `true`

Manages the default terminal logs when the build process is complete. By default, _logs_ are enabled.

```js
// Defaults

{
  logs: true
}
```

```txt
// Example

...

> Using @sveltejs/adapter-static
  Wrote site to "build"
  ✔ done

> Using plugin sveltekit-statiko
  ─ icons are created in the "build/favicons" directory
  ─ site.webmanifest is created in the "build" directory
  ─ sitemap.xml file is created in the "build" directory
  ─ robots.txt file is created in the "build" directory
  ─ all html files from the "build" directory are minified
  ✔ all done in 16ms
```

To disable the option, set it to `false`.

```js
// Disables the option

{
  logs: false
}
```

## Show Support

This is a free and open source project available to everyone. If you like it, `leave a star` to show your support.

### Starring a repository

Navigate to the top-right corner of the page and click the <kbd>☆ Star</kbd> button.

## License

### SvelteKit Statiko

[MIT License](LICENSE)

Copyright © Ivo Dolenc

Developed in Croatia 🇭🇷
