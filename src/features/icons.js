import { existsSync } from 'node:fs'
import { mkdir, rm } from 'node:fs/promises'
import { log } from '../utils'
import sharp from 'sharp'
import { createHash } from '../utils'

let iconExists, rmOutDir, name, ext, hash

function generateHeadLink(options, size) {
  const { icons } = options

  let outDir = icons.outDir
  let rel = `rel="icon"`
  let type = `type="image/${ext}" `
  let sizes = `sizes="${size}x${size}"`
  let href = `href="/${outDir}/${name}-${size}${hash}.${ext}"`
  let aSizes = [57, 60, 72, 76, 114, 120, 144, 152, 180]

  if (aSizes.includes(size)) {
    rel = `rel="apple-touch-icon"`
    type = ''
  }

  return `<link ${rel} ${type}${sizes} ${href}>`
}

function generateManifestLink(options, size) {
  const { icons, manifest } = options

  if (manifest) {
    let outDir = icons.outDir
    let sizes = [64, 192, 512]

    if (sizes.includes(size)) {
      let icon = {
        src: `/${outDir}/${name}-${size}${hash}.${ext}`,
        sizes: `${size}x${size}`,
        type: `image/${ext}`
      }

      return manifest.rules.icons.push(icon)
    }
  }
}

export function IconsLinks(options) {
  const { icons } = options

  let links = ''
  iconExists = existsSync(icons.src)

  if (icons && iconExists) {
    let sizes = icons.sizes
    let outDir = icons.outDir
    let parseSrc = icons.src.split(/\.(?=[^.]+$)/)
    name = parseSrc[0].substring(parseSrc[0].lastIndexOf('/') + 1)
    ext = parseSrc[1]
    hash = icons.hash ? `-${createHash()}` : ''

    if (!outDir || outDir.includes('../') || outDir.startsWith('/')) {
      let err = `icons > "outDir" option cannot be empty or specify a path outside a directory.`
      log.error(err)

      return process.exit()
    }

    if (icons.links) {
      for (let size of sizes) {
        links += generateHeadLink(options, size)

        generateManifestLink(options, size)
      }
    }
  }

  return links
}

export async function Icons(options) {
  const { root, icons, staticDir } = options

  try {
    if (icons && iconExists) {
      let sizes = icons.sizes
      let outDir = icons.outDir
      rmOutDir = icons.outDir.split('/')

      await mkdir(`${staticDir}/${outDir}`, { recursive: true })

      for (let size of sizes) {
        await sharp(`${root}/${icons.src}`)
          .resize(size)
          .toFormat(ext, icons.quality[ext])
          .toFile(`${staticDir}/${outDir}/${name}-${size}${hash}.${ext}`)
      }
    }
  } catch (err) {
    throw new Error(err)
  }
}

export async function IconsUnlink(options) {
  const { buildDir, staticDir, icons } = options

  try {
    let status, message

    if (icons && iconExists) {
      status = 'success'
      message = `icons are created in the "${buildDir}/${icons.outDir}" directory`

      await rm(`${staticDir}/${rmOutDir[0]}`, {
        recursive: true,
        force: true
      })
    }

    if (icons && !iconExists) {
      status = 'warn'
      message = `automatic icon generation is skipped because "icon.png" not found`
    }

    return {
      status,
      message
    }
  } catch (err) {
    throw new Error(err)
  }
}
