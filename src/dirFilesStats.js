import path from 'node:path'
import fsp from 'fs/promises'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const getDirFilesStats = async (dirPath) => {
    try {
        const dirList = await fsp.readdir(dirPath)

        const promises = dirList.map(async (filePath) => {
            const absPath = path.resolve(dirPath, filePath)
            const fileData = await fsp.stat(absPath)
            return {filePath, fileData}
        })

        Promise.all(promises).then((res) => {
            let table = `имя файла | размер | дата создания\n`

            res.map(file => {
                table += `${file.filePath} | ${formatBytes(file.fileData.size)} | ${new Date(file.fileData.ctime).toLocaleDateString()}\n`
            })

            console.log(table, `totalSize: ${formatBytes(res.reduce((acc, item) => acc + item.fileData.size, 0))}`)
        })
    } catch(err) {
        console.log(err)
    }
}

getDirFilesStats(path.resolve(__dirname, '..', 'src'))


const formatBytes = (bytes, decimals = 3) => {
    if (!+bytes) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}