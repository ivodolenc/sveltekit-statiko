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
- Saves you headaches and manual changes
- Designed for SSG rendering mode

## Quick Start

1. Install `sveltekit-statiko` to your project

```sh
yarn add -D sveltekit-statiko # or npm i -D sveltekit-statiko
```

2. Enable the plugin in the Vite configuration file

```js
// vite.config.js

import statiko from 'sveltekit-statiko'

export default {
  plugins: [
    statiko({
      siteUrl: 'https://www.website.com' // Set your website url
    })
  ]
}
```

That's it! Start developing your app!

## Options

All options can be customized in the Vite config file through `statico()` plugin. See all [default](src/defaults.js) settings.

```js
// vite.config.js

import statiko from 'sveltekit-statiko'

export default {
  plugins: [
    statiko({
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

Defines site's full url.

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

After the build process is done, run `preview` command to see it in action.

```js
// Defaults

{
  sitemap: {
    fileName: 'sitemap.xml',
    changefreq: 'daily',
    priority: 0.6,
    lastmod: new Date().toISOString(),
    routes: [],
    exclude: []
  }
}
```

For example, let's say you have a _home_ and an _about_ page. Default settings will generate this _sitemap_ content:

```html
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.website.com/</loc>
    <changefreq>daily</changefreq>
    <priority>0.6</priority>
    <lastmod>2022-10-18T08:51:38.126Z</lastmod>
  </url>
  <url>
    <loc>https://www.website.com/about</loc>
    <changefreq>daily</changefreq>
    <priority>0.6</priority>
    <lastmod>2022-10-18T08:51:38.126Z</lastmod>
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

### sitemap.changefreq

- Type: `String`
- Default: `'daily'`

Defines how frequently the page is likely to change.

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

To disable the option, set it to `false`.

```js
// Disables the option

{
  sitemap: {
    priority: false
  }
}
```

### sitemap.lastmod

- Type: `String`
- Default: `new Date().toISOString()`

Defines the last date when the specified page was modified. It uses the format `YYYY-MM-DD` or `YYYY-MM-DDThh:mm:ssTZD`.

To disable the option, set it to `false`.

```js
// Disables the option

{
  sitemap: {
    lastmod: false
  }
}
```

### sitemap.routes

- Type: `Array`
- Default: `[]`

An array of objects that allows customization for each route separately.

```js
// Example

{
  sitemap: {
    routes: [
      {
        name: 'index',
        changefreq: 'daily',
        priority: 1.0,
        lastmod: '2022-09-03'
      },
      {
        name: 'about',
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: '2022-10-18'
      }
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
      'build/_app/**',
      'build/favicons/**',
      'build/images/**',
      'build/fonts/**'
    ]
  }
}
```

## Logs

- Type: `Boolean`
- Default: `true`

Manages the default terminal logs when the build process is complete. By default, _logs_ are enabled.

To disable the option, set it to `false`.

```js
// Disables the option

{
  logs: false
}
```

Log example:

```txt
...

> Using @sveltejs/adapter-static
  Wrote site to "build"
  ✔ done

> Using plugin sveltekit-statiko
  ─ robots.txt created in the "build" directory
  ─ sitemap.xml created in the "build" directory
  ─ manifest.json created in the "build" directory
  ─ All html files from the "build" directory are minified
  ✔ done
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
