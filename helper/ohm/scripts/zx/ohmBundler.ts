import 'zx/globals'

const isRejected = (
  input: PromiseSettledResult<unknown>
): input is PromiseRejectedResult => input.status === 'rejected'

const isFulfilled = <T>(
  input: PromiseSettledResult<T>
): input is PromiseFulfilledResult<T> => input.status === 'fulfilled'

;(async () => {
  const thisFilePath = process.argv[1]
  const configFilePath = path.resolve(
    thisFilePath,
    '../../../config/syrmOhmFiles.json'
  )

  const config = await fs.readJson(configFilePath, 'utf8')
  cd(`../../${config.dir}`)

  const syrmOhmTree = config.files

  const fileContents = await Promise.allSettled(
    syrmOhmTree.map(async (fileName: string) => {
      let isExist = true

      try {
        await $`test -e ${fileName}.ohm`
      } catch (error) {
        isExist = false
        console.log(`[ERROR] ${fileName}.ohmは存在しません。`)
      }

      if (!isExist) return Promise.reject(false)

      const def = await fs.readFile(`${fileName}.ohm`, 'utf8')

      return Promise.resolve(def)
    })
  )

  const storage: string[] = []

  const merge = (array: PromiseSettledResult<string>[]): boolean => {
    const [first, ...rest] = array
    if (isFulfilled(first)) {
      storage.push(first.value)
      return rest.length === 0 ? true : merge(rest)
    }
    console.log(`[FIXME] ${configFilePath}`)
    return false
  }

  if (!merge(fileContents)) return

  const bundleFilePath = 'build/Syrm.ohm'
  await fs.outputFile(bundleFilePath, storage.join('\n\n'))
  await $`ohm generateBundles --withTypes ${bundleFilePath}`
})()
