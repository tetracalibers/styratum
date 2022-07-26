import * as ARRAY from 'fp-ts/Array'
import _ from 'lodash'

export class Context {
  constructor() {
    this._pendings = [] as string[]
  }

  private _pendings
  public get pendings() {
    return this._pendings
  }

  public set pendings(value) {
    this._pendings = value
  }

  get recent() {
    return _.last(this._pendings)
  }

  waitResolve = (id: string) => (this._pendings = [...this._pendings, id])
  resolve = () => ARRAY.dropRight(1)(this._pendings)
}
