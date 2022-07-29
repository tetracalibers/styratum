import _ from 'lodash'

export class CacheEntry {
  private source: string
  private lines: number[]
  private lineSet: Set<number>

  constructor(source: string) {
    this.source = source
    this.lines = []
    this.lineSet = new Set()
  }

  private _buildIndexes(indexPoint: number) {
    const isNewline = (char: string) => char === '\n' || char === '\r'
    const startIndex = (_.last(this.lines) || -1) + 1
    const source = this.source

    for (let index = startIndex; index <= indexPoint; ++index) {
      const c = source.charAt(index)
      if (isNewline(c)) {
        if (c === '\r' && source.charAt(index + 1) === '\n') {
          index += 1
        }
        if (!this.lineSet.has(index)) {
          this.lines.push(index)
          this.lineSet.add(index)
        }
      }
    }
  }

  computePosition(indexPoint: number) {
    this._buildIndexes(indexPoint)
    type Accumulator = {
      count: number
      lastLine: number
    }
    const initialAccu: Accumulator = {
      count: 0,
      lastLine: 0,
    }
    const accu = this.lines.reduce((prev: Accumulator, line: number) => {
      if (line <= indexPoint) {
        prev.lastLine = line + 1
        prev.count += 1
      }
      return prev
    }, initialAccu)

    return {
      line: accu.count,
      column: Math.max(0, indexPoint - accu.lastLine),
    }
  }
}
