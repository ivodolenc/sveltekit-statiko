import { readFile, writeFile } from 'node:fs/promises'
import fg from 'fast-glob'
import swcHtml from '@swc/html'

async function minify(file, rules) {
  let input, transform

  try {
    input = await readFile(file, 'utf8')
    transform = await swcHtml.minify(Buffer.from(input), rules)
    writeFile(file, transform.code)
  } catch (err) {
    if (err) throw new Error(err)
  }
}

export async function Minification(options) {
  const { buildDir, minification } = options

  try {
    if (minification) {
      let status = 'success'
      let message = `all html files from the "${buildDir}" directory are minified`
      let exclude = [`${buildDir}/_app/**`, ...minification.exclude]
      let rules = minification.rules
      let files = await fg([`${buildDir}/**/*.html`], {
        ignore: exclude
      })

      let promises = []
      for (let file of files) promises.push(minify(file, rules))

      return Promise.all(promises).then(() => {
        return {
          status,
          message
        }
      })
    }
  } catch (err) {
    if (err) throw new Error(err)
  }
}
