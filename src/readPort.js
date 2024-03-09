import fsp from 'node:fs/promises'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const readPort = async () => {
    const filePath = path.resolve(__dirname, '../dist', 'port.txt')

    try {
        await fsp.access(filePath)
        const content = await fsp.readFile(filePath, 'utf-8')
        console.log(content)
    } catch(e) {
        console.log(`Файл "${filePath}" не существует`)
    }
}

readPort()