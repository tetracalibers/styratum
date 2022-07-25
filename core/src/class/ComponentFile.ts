import { A } from 'ts-toolbelt'
import _ from 'lodash'
import shell from 'shelljs'
import * as path from 'path'
import date from 'date-and-time'
const { cat, ShellString, test } = shell
const { extname, basename } = path

interface AbstComponentFile {
  path: string
  name: string
  extension: string
  subExtension?: string
  isStyled?: A.Equals<Pick<AbstComponentFile, 'subExtension'>, 'styled'>
}

class ComponentFile implements AbstComponentFile {
  constructor(path: string) {
    this.path = path
    this.extension = extname(this.path)
    this.name = basename(this.path)
  }

  path: string
  name: string
  extension: string

  isStyled?: 0 | undefined
  get src(): string {
    if (test('-e', this.path)) {
      return cat(this.path).toString().replace(/\r?\n/g, '')
    } else {
      return ''
    }
  }

  set subExtension(__: string | undefined) {
    this.subExtension = _.chain(_.split(this.name, '.'))
      .dropRight()
      .last()
      .value()
  }

  // prettier-ignore
  get jsx(): string {
    const regexp = /(?<jsx><StylePatch>.*?<\/StylePatch>)/
    const jsx = regexp.exec(this.src)?.groups?.jsx
    return jsx ? jsx.trim() : ''
  }

  get stylingFilePath(): string {
    return this.path.replace(
      this.name,
      `styp/${this.name.replace(this.extension, '')}_${date.format(
        new Date(),
        'YYYYMMDD-HHmmss'
      )}.styp.jsx`
    )
  }

  initStylingFile(): void {
    new ShellString(this.jsx).to(this.stylingFilePath)
  }
}

export default ComponentFile
