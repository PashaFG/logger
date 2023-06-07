import fs from 'fs';
import { AutoQueue } from '../auto_queue/auto_queue.js';
import { toNormalDate, toNormalDateAndTime, toNormalTime } from './dates.js'

const aQueue = new AutoQueue()
let filename: string

function __log(data: any) {
  let msg = `${data.time} ${JSON.stringify(data)}\n`;

  fs.open(`logs/${data.fileName}.log`, 'a', 0x1a4, function (error, file_handle) {
    if (!error) {
      fs.write(file_handle, msg, null, 'utf-8', function (err) {
        if (err) {
          console.log(`${data.fileName} ${err}`)
        }
        fs.close(file_handle, function () {
        })
      })
    } else {
      console.log(`${data.fileName} ${error}`)
    }
  })
}



function log(logPath: string, message: string) {
  const date = new Date()
  let _ = ({ ...foo } = {}) => () => new Promise(resolve => setTimeout(resolve, 0, foo));
  aQueue.enqueue(_({ __log, data: { logPath, fileName: toNormalDate(date), time: toNormalTime(date), message } })).then(({ __log, data }: any | unknown) => __log(data));
}

/** TODO Необходима следующая обработка методов:
 * logger.config() -  конфигурирует сам логер, его поведение, уровни логирование, лимиты директории (по размеру), лимит файла error.log, 
 *                    лимит размера одного файла (по размеру, по занимаемой памяти)
 * logger.log() - записывает логи (конфигурация передаётся внутри метода - т.е. уровень логироавния и т.д.)
 * logger.error(), logger.info() ... - для каждого уровня логирования 
 */
export default {
  log
}