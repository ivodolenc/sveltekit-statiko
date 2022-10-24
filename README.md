<h1 align="center">SvelteKit Statiko</h1>

<p align="center">A multi-featured assistant for SvelteKit static projects.</p>

## Features

- Generates sitemap, robots and manifest on the fly
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
yarn add -D sveltekit-statiko # or npm i -D sveltekit-statiko
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
      siteUrl: 'https://www.website.com',
      sitemap: {
        // ...
      }
      // ...
    })
  ]
}
```

## Site Url

- Type: `String`
- Required: `true`

Defines website url for production.

This option is **required** because it is used in _sitemap.xml_ and _robots.txt_ files.

```js
// Defaults

{
  siteUrl: ''
}
```

However, if the _sitemap_ and _robots_ features will not be used, set it to `false`.

```js
// Disables the option

{
  siteUrl: false,
}
```

## Sitemap

- Type: `Object`
- Default: `{ ... }`

Automatically generates a _sitemap.xml_ file with all dynamic content during the `build` process.

If specified, the `trailingSlash` option will be automatically parsed so there is no need for additional settings.

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
  }
}
```

Default settings will generate this content:

```json
{
  "name": "your-package-name",
  "short_name": "your-package-name",
  "description": "your-package-description",
  "start_url": "/?standalone=true",
  "display": "standalone",
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "icons": []
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

### manifest.rules

- Type: `Object`
- Default: `{ ... }`

Defines _manifest_ rules. See all available [rules](https://developer.mozilla.org/en-US/docs/Web/Manifest#members).

```js
// Defaults

{
  manifest: {
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
  }
}
```

```js
// Example

{
  manifest: {
    rules: {
      name: 'website-name',
      icons: [
        {
          src: '/icon-32x32.png',
          sizes: '32x32',
          type: 'image/png'
        },
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ],
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
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true
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

Minification is done by _html-minifier-terser_ under the hood. See all available [rules](https://github.com/terser/html-minifier-terser#options-quick-reference).

```js
// Defaults

{
  minification: {
    rules: {
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true
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
  ─ robots.txt created in the "build" directory
  ─ sitemap.xml created in the "build" directory
  ─ manifest.json created in the "build" directory
  ─ all html files from the "build" directory are minified
  ✔ done
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
