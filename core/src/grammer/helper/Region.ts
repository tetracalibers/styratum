import _ from 'lodash'
import A from 'fp-ts/Array'
import { Offset } from './Offset'
import { Position } from './Position'
import { globalCache } from './cache'

export class Region {
  private fullSource: string
  private startIdx: number
  private endIdx: number
  private startPos: Position | undefined
  private endPos: Position | undefined
  private uri: string | undefined

  constructor(
    data: { source: string; startIdx: number; endIdx: number },
    uri: string | undefined
  ) {
    this.fullSource = data.source
    this.startIdx = data.startIdx
    this.endIdx = data.endIdx
    this.uri = uri
  }

  get offset(): Offset {
    return {
      start: this.startIdx,
      end: this.endIdx,
    }
  }

  get position() {
    const pos = [this.startPos, this.endPos]
    if (A.exists(_.isUndefined)(pos)) {
      const { start, end } = globalCache.computePosition(
        this.fullSource,
        this.offset
      )
      this.startPos = start
      this.endPos = end
    }

    return {
      start: this.startPos,
      end: this.endPos,
    }
  }

  get source() {
    return this.fullSource.slice(this.startIdx, this.endIdx)
  }
}