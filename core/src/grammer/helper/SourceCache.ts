import { CacheEntry } from './CacheEntry'
import { Offset } from './Offset'

export class SourceCache {
  private cache: Map<string, CacheEntry>

  constructor() {
    this.cache = new Map()
  }

  private _generateCache(source: string) {
    const cache = new CacheEntry(source)
    this.cache.set(source, cache)
    return cache
  }

  computePosition(source: string, offset: Offset) {
    const cache = this.cache.get(source) ?? this._generateCache(source)

    return {
      start: cache.computePosition(offset.start),
      end: cache.computePosition(offset.end),
    }
  }
}
