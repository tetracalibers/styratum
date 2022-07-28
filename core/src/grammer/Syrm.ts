import ohm from 'ohm-js'
import * as fs from 'fs'
import * as path from 'path'

const CascadeOhm = fs.readFileSync(
  path.join(__dirname, 'def/SyrmCascade.ohm'),
  'utf-8'
)
const CollectionOhm = fs.readFileSync(
  path.join(__dirname, 'def/Collection.ohm'),
  'utf-8'
)
