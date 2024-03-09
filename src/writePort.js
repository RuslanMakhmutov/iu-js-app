import fsp from 'node:fs/promises'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const writePort = async () => {
    const filePath = path.resolve(__dirname, '../dist', 'port.txt')
    const content = `environment variable PORT = ${process.env.PORT}`;

    try {
        await fsp.writeFile(filePath, content, 'utf-8')
        console.log(`Файл "${filePath}" записан`)
    } catch(e) {
        console.log(`Не могу записать файл "${filePath}". Возможно, не существует директория ${path.resolve(__dirname, '../dist')}`)
    }
}

writePort()