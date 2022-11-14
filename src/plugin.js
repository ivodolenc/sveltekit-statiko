import { merge } from 'merge-kit'
import { defaults } from './defaults.js'
import { run } from './features/index.js'

export function Statiko(pluginOptions) {
  let options, viteOptions

  return {
    name: 'sveltekit-statiko',
    enforce: 'post',

    apply(config, { command }) {
      return command === 'build' && !config.build.ssr
    },

    configResolved(config) {
      viteOptions = {
        root: config.root,
        staticDir: config.publicDir,
        outDir: config.build.outDir
      }
      options = merge([defaults, pluginOptions, viteOptions])
    },

    buildStart: () => run.start(options),
    closeBundle: () => run.close(options)
  }
}
