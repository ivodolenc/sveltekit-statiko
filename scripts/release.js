import { readFileSync } from 'fs'
import { execSync } from 'child_process'
import { inc } from 'semver'
import prompts from 'prompts'
import { log } from '../src/utils/index.js'

const pkg = JSON.parse(readFileSync('./package.json'))
const onCancel = () => process.exit()

async function updatePackageVersion() {
  log.info(`Current package version: ${pkg.version}`)

  const patchVer = inc(pkg.version, 'patch')
  const minorVer = inc(pkg.version, 'minor')
  const majorVer = inc(pkg.version, 'major')

  const question = {
    type: 'select',
    name: 'version',
    message: 'Select new package version:',
    choices: [
      { title: `Patch (${patchVer})`, value: 'patch' },
      { title: `Minor (${minorVer})`, value: 'minor' },
      { title: `Major (${majorVer})`, value: 'major' }
    ],
    hint: ' '
  }

  const { version } = await prompts(question, { onCancel })
  const newVersion = inc(pkg.version, version)

  execSync(`npm version --no-git-tag-version ${version}`)

  return commitChanges(newVersion)
}

async function commitChanges(nv) {
  let files = `package.json package-lock.json`
  let command = `git add ${files} && git commit --no-verify -m 'chore(release): ${nv}' && git push --no-verify && npm publish`

  const question = {
    type: 'select',
    name: 'answer',
    message: 'Do you want to commit changes to the GitHub repo?',
    choices: [
      { title: 'Yes', value: true },
      { title: 'No', value: false }
    ],
    hint: ' '
  }

  const { answer } = await prompts(question, { onCancel })

  if (answer) {
    execSync(command)

    log.info('Package version updated and pushed to the Github repository!')
    log('lime', `✔ New package version: ${nv}`)
  }
}

updatePackageVersion()
