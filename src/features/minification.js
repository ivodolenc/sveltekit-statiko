import { readFile, writeFile } from 'node:fs/promises'
import fg from 'fast-glob'
import swcHtml from '@swc/html'

async function minify(file, rules) {
  try {
    let input = await readFile(file, 'utf8')
    let transform = await swcHtml.minify(Buffer.from(input), rules)
    writeFile(file, transform.code)
  } catch (err) {
    throw new Error(err)
  }
}

export async function Minification(options) {
  const { buildDir, minification } = options

  try {
    let status, message

    if (minification) {
      status = 'success'
      message = `all html files from the "${buildDir}" directory are minified`

      let exclude = [`${buildDir}/_app/**`, ...minification.exclude]
      let rules = minification.rules
      let files = await fg([`${buildDir}/**/*.html`], {
        ignore: exclude
      })

      let promises = []
      for (let file of files) promises.push(minify(file, rules))

      const result = { status, message }

      return Promise.all(promises).then(() => result)
    }

    return {
      status,
      message
    }
  } catch (err) {
    throw new Error(err)
  }
}
