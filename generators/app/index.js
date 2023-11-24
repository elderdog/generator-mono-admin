// ～/generators/app/index.js
'use strict'
const pkg = require('../../package.json')
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const path = require('path')
const fs = require('fs-extra')
// 5.0.0版本需要动态引入install
const _ = require('lodash')
_.extend(Generator.prototype, require('yeoman-generator/lib/actions/install'))

module.exports = class extends Generator {
  // 向用户展示交互式问题收集关键参数
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the stunning ${chalk.red('mono-admin@' + pkg.version)} generator!`))

    const nameQuestions = [
      {
        type: 'input',
        name: 'name',
        message: 'Your project name:',
        default: 'my-app',
        validate: name => {
          if (!name) {
            return 'Project name cannot be empty'
          }
          if (!/\w+/.test(name)) {
            return 'Project name should only consist of 0~9, a~z, A~Z, _, .'
          }
          return true
        }
      },
      {
        type: 'confirm',
        name: 'force',
        message: 'Project already exists, wanna override?',
        when: answers => {
          const dir = this.destinationPath(answers.name)
          return fs.existsSync(dir) && fs.statSync(dir).isDirectory()
        }
      }
    ]

    const namePrompts = this.prompt(nameQuestions)
    return namePrompts.then(({ name, force }) => {
      if (force === false) {
        process.exit()
      }
      const propQuestions = [
        {
          type: 'input',
          name: 'description',
          message: 'Please input project description:',
          default: 'a monorepo project'
        },
        {
          type: 'input',
          name: 'author',
          message: "Author's Name:",
          default: ''
        },
        {
          type: 'input',
          name: 'email',
          message: "Author's Email:",
          default: ''
        },
        {
          type: 'list',
          name: 'license',
          message: 'License:',
          choices: ['MIT', 'GPL', 'ISC']
        }
      ]
      return this.prompt(propQuestions).then(answers => {
        this.answer = {
          answers: {
            ...answers,
            name,
            force,
            year: new Date().getFullYear()
          }
        }
        return this.answer
      })
    })
  }

  configuring() {
    const { name } = this.answer.answers
    const targetDir = path.join(this.destinationRoot(), name)
    this.log('\nPreparing...\n')
    fs.emptyDirSync(targetDir)
    this.destinationRoot(targetDir)
  }

  // 依据模板进行新项目结构的写操作
  writing() {
    this.log('\nWriting...\n')
    // 拷贝文件
    // 命名.开头的文件在npm pack时可能会被忽略，所以在模板中把文件名的.去掉，拷贝时重命名
    this.fs.copy(this.templatePath('editorconfig'), this.destinationPath('.editorconfig'))
    this.fs.copy(this.templatePath('eslintrc.js'), this.destinationPath('.eslintrc.js'))
    this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'))
    this.fs.copy(this.templatePath('umirc.ts'), this.destinationPath('.umirc.ts'))
    this.fs.copy(this.templatePath('pnpm-workspace.yaml'), this.destinationPath('pnpm-workspace.yaml'))
    this.fs.copy(this.templatePath('tsconfig.json'), this.destinationPath('tsconfig.json'))
    this.fs.copyTpl(this.templatePath('package.json.vm'), this.destinationPath('package.json'), this.answer)
    this.fs.copyTpl(this.templatePath('README.md'), this.destinationPath('README.md'), this.answer)
    // 拷贝目录
    this.fs.copy(this.templatePath('vscode'), this.destinationPath('.vscode'))
    this.fs.copy(this.templatePath('components'), this.destinationPath('components'))
    this.fs.copy(this.templatePath('hooks'), this.destinationPath('hooks'))
    this.fs.copy(this.templatePath('utils'), this.destinationPath('utils'))
    this.fs.copy(this.templatePath('packages'), this.destinationPath('packages'))
    // packages下命名.开头的文件重命名
    this.fs.move(this.destinationPath('packages/admin/env'), this.destinationPath('packages/admin/.env'))
    this.fs.move(this.destinationPath('packages/admin/eslintignore'), this.destinationPath('packages/admin/.eslintignore'))
    this.fs.move(this.destinationPath('packages/admin/eslintrc.js'), this.destinationPath('packages/admin/.eslintrc.js'))
    this.fs.move(this.destinationPath('packages/admin/gitignore'), this.destinationPath('packages/admin/.gitignore'))
  }

  end() {
    const { answers } = this.answer

    this.log.writeln()
    this.log.info(`Make sure you have ${chalk.yellow('pnpm')} installed`)
    this.log.info(`cd ${chalk.yellow(answers.name)}`)
    this.log.info(`pnpm install`)
    this.log.writeln()

    this.log.ok(`Project 🛠 ${chalk.yellow(answers.name)} generated!!!`)
  }
}
