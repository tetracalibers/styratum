import _ from 'lodash'
import * as A from 'fp-ts/Array'
import { Offset } from './Offset'
import { Position } from './Position'
import { globalCache } from './cache'

export class Region {
  private fullSource: string
  private startIdx: number
  private endIdx: number
  private startPos?: Position
  private endPos?: Position

  constructor(source: string, startIdx: number, endIdx: number) {
    this.fullSource = source
    this.startIdx = startIdx
    this.endIdx = endIdx
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

  //get source() {
  //  return this.fullSource.substring(this.startIdx, this.endIdx)
  //}
}
