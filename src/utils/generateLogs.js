import { log } from './log.js'

export const generateLogs = options => {
  log.n()
  log.info('Using plugin sveltekit-statiko')

  if (options.sitemap)
    log.details2(
      `${options.sitemap.fileName} created in the "${options.buildDir}" directory`
    )

  if (options.robots)
    log.details2(
      `${options.robots.fileName} created in the "${options.buildDir}" directory`
    )

  if (options.manifest)
    log.details2(
      `${options.manifest.fileName} created in the "${options.buildDir}" directory`
    )

  if (options.minification)
    log.details2(
      `all html files from the "${options.buildDir}" directory are minified`
    )

  log.lime(`  ✔ done`)
}
