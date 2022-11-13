import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'

let appContent

export async function AppTransformStart(options, transform) {
  const { appTemplate, icons, manifest } = options

  try {
    if (icons.links || manifest.link) {
      appContent = await readFile(appTemplate, 'utf8')

      let sveltekitDir = '.svelte-kit'
      let statikoDir = 'statiko'
      let outDir = `${sveltekitDir}/${statikoDir}`

      if (existsSync(sveltekitDir)) {
        await mkdir(outDir, { recursive: true })
        writeFile(`${outDir}/app.html`, appContent)
      }

      let transformed = appContent.replace(/<\/head>/, `${transform}</head>`)
      writeFile(appTemplate, transformed)
    }
  } catch (err) {
    throw new Error(err)
  }
}

export async function AppTransformClose(options) {
  const { appTemplate, icons, manifest } = options

  try {
    if (icons.links || manifest.link) await writeFile(appTemplate, appContent)
  } catch (err) {
    throw new Error(err)
  }
}
