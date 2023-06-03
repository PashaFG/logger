import * as fs from 'node:fs/promises';

async function openDir() {
  try {
    const dir = await fs.opendir('./logs');

    return dir
  } catch (err) {
    console.error(err);
  }
}

async function writeLogs(fileName: string, level: number | string, message: string) {
  let path: string = `${process.env.LOGGER_PATH_TO_DIRECTORY}/${fileName}`
  let errorPath: string = `${process.env.LOGGER_PATH_TO_DIRECTORY}/error.log`
  let finalMessage: string
  finalMessage = `${message}`
  switch (level) {
    case 1:
    case 'Emergency':
      fs.appendFile(path, `${finalMessage}\n`)
      fs.appendFile(errorPath, `${finalMessage}\n`)
      break

    case 2:
    case 'Alert':
      fs.appendFile(path, `${finalMessage}\n`)
      fs.appendFile(errorPath, `${finalMessage}\n`)
      break

    case 3:
    case 'Critical':
      fs.appendFile(path, `${finalMessage}\n`)
      fs.appendFile(errorPath, `${finalMessage}\n`)
      break

    case 4:
    case 'Error':
      fs.appendFile(path, `${finalMessage}\n`)
      fs.appendFile(errorPath, `${finalMessage}\n`)
      break

    case 5:
    case 'Warning':
      fs.appendFile(path, `${finalMessage}\n`)
      break

    case 6:
    case 'Notice':
      fs.appendFile(path, `${finalMessage}\n`)
      break

    case 7:
    case 'Informational':
    case 'Info':
      fs.appendFile(path, `${finalMessage}\n`)
      break

    case 8:
    case 'Debug':
      fs.appendFile(path, `${finalMessage}\n`)
      break

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
  writeLogs(`2023-06-03.log`, 1, `${Date.now()}`)
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