import { readFile, writeFile, unlink } from 'node:fs/promises'
import { createHash } from '../utils'

let name, ext, hash, fileName

export function ManifestLink(options) {
  const { manifest } = options

  let link = ''

  if (manifest) {
    let parseName = manifest.fileName.split(/\.(?=[^.]+$)/)
    hash = manifest.hash ? `-${createHash()}` : ''
    name = parseName[0]
    ext = parseName[1]
    fileName = `${name}${hash}.${ext}`

    if (manifest.link) link = `<link rel="manifest" href="/${fileName}" />`
  }

  return link
}

export async function Manifest(options) {
  const { staticDir, manifest } = options

  try {
    if (manifest) {
      let { name, description } = JSON.parse(await readFile(`./package.json`))

      let file = `${staticDir}/${fileName}`
      let rules = {
        name,
        short_name: name,
        description,
        ...manifest.rules
      }
      let content = JSON.stringify(rules, null, 2)

      writeFile(file, content)
    }
  } catch (err) {
    throw new Error(err)
  }
}

export async function ManifestUnlink(options) {
  const { buildDir, staticDir, manifest } = options

  try {
    let status, message

    if (manifest) {
      status = 'success'
      message = `${manifest.fileName} is created in the "${buildDir}" directory`

      await unlink(`${staticDir}/${fileName}`)
    }

    return {
      status,
      message
    }
  } catch (err) {
    throw new Error(err)
  }
}
