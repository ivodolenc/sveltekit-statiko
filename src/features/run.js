import { log } from '../utils'
import {
  Icons,
  IconsLinks,
  IconsUnlink,
  Manifest,
  ManifestLink,
  ManifestUnlink,
  Sitemap,
  Robots,
  Minification,
  AppTransformStart,
  AppTransformClose
} from './index.js'

export const run = {
  start: options => {
    if (!options.siteUrl) {
      log.error('"siteUrl" option must be specified')

      return process.exit()
    }

    let transform = ''
    transform += IconsLinks(options) + ManifestLink(options)

    AppTransformStart(options, transform)

    let features = [Icons(options), Manifest(options)]

    return Promise.all(features).catch(err => {
      if (err) throw new Error(err)
    })
  },

  close: options => {
    let start = Date.now()

    AppTransformClose(options)

    if (options.logs) log.info('Using plugin sveltekit-statiko')

    let features = [
      IconsUnlink(options),
      ManifestUnlink(options),
      Sitemap(options),
      Robots(options),
      Minification(options)
    ]

    return Promise.all(features)
      .then(results => {
        if (options.logs) {
          let end = Date.now() - start

          for (let result of results) {
            if (result.status === 'success') log(`  ─ ${result.message}`)
            if (result.status === 'warn')
              log('magenta', `  ─ ${result.message}`)
          }

          return log('lime', `  ✔ all done in ${end}ms`)
        }
      })
      .catch(err => {
        if (err) throw new Error(err)
      })
  }
}
