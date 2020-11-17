#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import path from 'path';
import fs from 'fs-extra';

const argv = yargs(hideBin(process.argv))
    .option('template', {
        alias: 't',
        type: 'string',
        description: 'Template to use: "app" (default) | "library" | "app-standalone"',
        default: 'app',
        choices: ['app', 'library', 'app-standalone']
    })
    .usage('Usage: $0 <package-name> --template <template-name>')
    .argv

async function init() {
    const targetDir = argv._[0] || '.'
    const cwd = process.cwd()
    const root = path.join(cwd, targetDir)

    if (!root.includes('thoughtspot/js/')) {
        console.log('Error: You can only create packages/apps within the thoughtspot/js/<type> directory')
        process.exit(1)
    }

    const renameFiles = {
        _gitignore: '.gitignore',
    }
    console.log(`Creating project in ${root}...`)

    await fs.ensureDir(root)
    const existing = await fs.readdir(root)
    if (existing.length) {
        console.error(`Error: target directory is not empty.`)
        process.exit(1)
    }

    const templateDir = path.join(
        __dirname,
        `template-${argv.t || argv.template || 'app'}`
    )
    const write = async (file, content) => {
        const targetPath = renameFiles[file]
            ? path.join(root, renameFiles[file])
            : path.join(root, file)
        if (content) {
            await fs.writeFile(targetPath, content)
        } else {
            await fs.copy(path.join(templateDir, file), targetPath)
        }
    }

    const files = await fs.readdir(templateDir)
    for (const file of files.filter((f) => f !== 'package.json')) {
        await write(file)
    }

    const pkg = require(path.join(templateDir, `package.json`))
    pkg.name = `@thoughtspot/${path.basename(root)}`
    await write('package.json', JSON.stringify(pkg, null, 2))

    console.log(`\nDone. Now run: \n`)
    console.log(`  ./install.sh from blink or blink-v2 directory. And commit the package-lock changes.`)
    console.log()
}

init().catch((e) => {
    console.error(e)
})