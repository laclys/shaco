import chalk from 'chalk'
import execa from 'execa'
import { prompt } from 'enquirer'
import semver from 'semver'
import minimist from 'minimist'
import { createRequire } from 'module'
import fs from 'fs-extra'
import path from 'path'

// packag.json 声明了 `type: "module"`, 而 esm 环境下没有 require 方法.所以使用createRequire
const require = createRequire(import.meta.url)

const args = minimist(process.argv.slice(2))
//是否是 dry 模式
const isDry = args.dry
// 版本级别
const versionIncrements = ['patch', 'minor', 'major'] as const

const pkg = require('../package.json')
const currentVersion = pkg.version

const directRun = (bin: string, args: string[]) => {
  return execa(bin, args, { stdio: 'inherit' })
}

const dryRun = (bin: string, args: string[]) => {
  console.log(chalk.blue(`[dryrun] ${bin} ${args.join(' ')}`))
  return
}

const step = (msg) => console.log(chalk.cyan(msg))

const run = isDry ? dryRun : directRun

const updateVersion = (version: string) => {
  pkg.version = version
  fs.writeFileSync(
    path.resolve(__dirname, '../package.json'),
    JSON.stringify(pkg, null, 2)
  )
}

async function main() {
  // Select release type(semver)
  const { release } = await prompt<{ release: string }>({
    type: 'select',
    name: 'release',
    message: 'Select release type',
    choices: versionIncrements.map(
      (i) => `${i} (${semver.inc(currentVersion, i)})`
    )
  })

  const targetVersion = release.match(/\((.*)\)/)![1]

  const { confirm } = await prompt<{ confirm: boolean }>({
    type: 'confirm',
    name: 'confirm',
    message: `Releasing ${targetVersion}. Confirm?`
  })

  if (!confirm) {
    return
  }

  // Run test(e2e/unit)
  step('\nRunning tests...')
  await run('pnpm', ['test:unit'])
  await run('pnpm', ['test:e2e'])

  if (!isDry) {
    step('\nUpdate version...')
    updateVersion(targetVersion)
  }

  step('\nBuilding package...')
  await run('pnpm', ['build'])

  step('\nGenerating changelog...')
  await run('pnpm', ['changelog'])

  step('\nCommitting changes...')
  await run('git', ['add', '-A'])
  await run('git', ['commit', '-m', `'release: v${targetVersion}'`])

  step('\nPublishing packages...')
  await run('pnpm', ['publish', '--access', 'public'])

  step('\nPushing to GitHub...')
  await run('git', ['tag', `v${targetVersion}`])
  await run('git', ['push', 'origin', `refs/tags/v${targetVersion}`])
  await run('git', ['push'])
}

main().catch((err) => {
  console.log(err)
  updateVersion(currentVersion)
})
