import _ from 'lodash'
import * as A from 'fp-ts/Array'
import { Offset } from '../types/Offset'
import { Position } from '../types/Position'
import { globalCache } from './cache'
import { SourceRange } from '../types/Range'

export const locationCalculator =
  (fullSource: string) => (startIdx: number, endIdx: number) => {
    const _fullSource = fullSource

    class _Range {
      private startIdx: number
      private endIdx: number
      private startPos: Position | undefined
      private endPos: Position | undefined

      constructor(startIdx: number, endIdx: number) {
        this.startIdx = startIdx
        this.endIdx = endIdx
      }

      get offset(): Offset {
        return {
          start: this.startIdx,
          end: this.endIdx,
        }
      }

      get range(): SourceRange {
        const pos = [this.startPos, this.endPos]
        if (A.exists(_.isUndefined)(pos)) {
          const { start, end } = globalCache.computePosition(
            _fullSource,
            this.offset
          )
          this.startPos = start
          this.endPos = end
        }

        return {
          start: this.startPos as Position,
          end: this.endPos as Position,
        }
      }

      get pickSource() {
        return _fullSource.substring(this.startIdx, this.endIdx)
      }
    }

    return new _Range(startIdx, endIdx)
  }
