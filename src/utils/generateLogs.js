import { log } from './log.js'

const generateLogs = options => {
  log.n()
  log.info('Using plugin sveltekit-statiko')

  if (options.sitemap.logs)
    log.details2(
      `${options.sitemap.fileName} created in the "${options.sitemap.outDir}" directory`
    )

  if (options.robots.logs)
    log.details2(
      `${options.robots.fileName} created in the "${options.robots.outDir}" directory`
    )

  if (options.manifest.logs)
    log.details2(
      `${options.manifest.fileName} created in the "${options.manifest.outDir}" directory`
    )

  if (options.minification.logs)
    log.details2(
      `all html files from the "${options.minification.outDir}" directory are minified`
    )

  log.lime(`  ✔ done`)
}

export { generateLogs }
