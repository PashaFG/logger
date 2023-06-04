import fs from 'fs/promises';
import { toNormalDate, toNormalDateAndTime, toNormalTime } from './dates.js'
import { WriteStream } from 'fs';

async function openDir() {
  try {
    const dir = await fs.opendir('./logs');

    return dir
  } catch (err) {
    console.error(err);
  }
}

async function writeLogs(fileName: string, level: number | string, message: string) {
  let path: string = `${process.env.LOGGER_PATH_TO_DIRECTORY}/${fileName}.log`
  let errorPath: string = `${process.env.LOGGER_PATH_TO_DIRECTORY}/error.log`
  let finalMessage: string
  finalMessage = `${toNormalTime(new Date())}`
  switch (level) {
    case 1:
    case 'Emergency':
      finalMessage += ` 1 ${message}`
      fs.appendFile(path, `${finalMessage}\n`)
      return fs.appendFile(errorPath, `${finalMessage}\n`)

    case 2:
    case 'Alert':
      finalMessage += ` 2 ${message}`
      fs.appendFile(path, `${finalMessage}\n`)
      return fs.appendFile(errorPath, `${finalMessage}\n`)

    case 3:
    case 'Critical':
      finalMessage += ` 3 ${message}`
      fs.appendFile(path, `${finalMessage}\n`)
      return fs.appendFile(errorPath, `${finalMessage}\n`)

    case 4:
    case 'Error':
      finalMessage += ` 4 ${message}`
      fs.appendFile(path, `${finalMessage}\n`)
      return fs.appendFile(errorPath, `${finalMessage}\n`)

    case 5:
    case 'Warning':
      finalMessage += ` 5 ${message}`
      return fs.appendFile(path, `${finalMessage}\n`)

    case 6:
    case 'Notice':
      finalMessage += ` 6 ${message}`
      return fs.appendFile(path, `${finalMessage}\n`)

    case 7:
    case 'Informational':
    case 'Info':
      finalMessage += ` 7 ${message}`
      return fs.appendFile(path, `${finalMessage}\n`)

    case 8:
    case 'Debug':
      finalMessage += ` 1 ${message}`
      return fs.appendFile(path, `${finalMessage}\n`)

    default:
      return
  }
  // fs.appendFile(path, `${finalMessage}\n`)
}

async function print() {
  const dir = await openDir()
  console.log(dir)
  if (dir) {
    for await (const dirent of dir) {
      console.log(dirent)
    }
  }
  console.log('write start')
  for (let i = 0; i < 10 * 1000; i++) {
    console.log('write')
    writeLogs(toNormalDate(new Date()), 1, `test log ${toNormalDateAndTime(new Date())}`)
  }
  console.log('write end')
}

/** TODO Необходима следующая обработка методов:
 * logger.config() -  конфигурирует сам логер, его поведение, уровни логирование, лимиты директории (по размеру), лимит файла error.log, 
 *                    лимит размера одного файла (по размеру, по занимаемой памяти)
 * logger.log() - записывает логи (конфигурация передаётся внутри метода - т.е. уровень логироавния и т.д.)
 * logger.error(), logger.info() ... - для каждого уровня логирования 
 */
export default {
  openDir: print
}