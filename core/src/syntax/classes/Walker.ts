import { Context } from './Context'
import { Pointor } from './Pointor'

export class Walker {
  constructor(traceSeq: StylePatch.Sentence[]) {
    this._pointor = new Pointor(traceSeq)
    this._context = new Context()
  }

  private _pointor
  public get pointor() {
    return this._pointor
  }

  public set pointor(value) {
    this._pointor = value
  }

  private _context
  public get context() {
    return this._context
  }

  public set context(value) {
    this._context = value
  }
}
