import fsp from 'node:fs/promises'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const makeDistDir = async () => {
    const dirPath = path.resolve(__dirname, '../dist')
    try {
        await fsp.access(dirPath)
        console.log(`Директория "${dirPath}" уже существует`)
    } catch(e) {
        await fsp.mkdir(dirPath)
        console.log(`Директория "${dirPath}" создана`)
    }
}

makeDistDir()