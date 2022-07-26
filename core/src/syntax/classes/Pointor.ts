export class Pointor {
  constructor(traceSeq: StylePatch.Sentence[], pos = 0) {
    this._pos = pos
    this._traceSeq = traceSeq
  }

  private _pos
  public get pos() {
    return this._pos
  }

  public set pos(value) {
    this._pos = value
  }

  private _traceSeq
  public get traceSeq() {
    return this._traceSeq
  }

  public set traceSeq(value) {
    this._traceSeq = value
  }

  peek = (pos: number) => this._traceSeq[pos]
  traced = (_: void) => this.peek(this._pos)
  seek = (p: number) => new Pointor(this._traceSeq, p)
  next = (_: void) => this.seek(this._pos + 1)
}
