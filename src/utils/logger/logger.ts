import fs from 'fs';
import { AutoQueue } from '../auto_queue/auto_queue.js';
import { toNormalDate, toNormalDateAndTime, toNormalTime } from './dates.js'

const aQueue = new AutoQueue()
interface LOG_LEVEL_DICTIONARY {
  [index: string]: number;
}
const LOG_LEVEL_DICTIONARY: LOG_LEVEL_DICTIONARY = {
  "debug": 1,
  "info": 2,
  "notice": 3,
  "warning": 4,
  "error": 5,
  "critical": 6,
  "alert": 7,
  "emergency": 8,
}
let loggerConfiguration = {
  logPath: 'logs',
  dailyRotationCombinedLogs: true
}

function __log(data: any) {
  if (data.level === 0 || data.level > 8) {
    console.error(`Undefined log level: ${data.level}`)
    return
  }

  let msg = `${data.time} ${data.level} ${data.message}\n`;
  let fullFileName: string[] = []

  if (data.level >= 5) {
    fullFileName.push(`${loggerConfiguration.logPath}/error.log`, `${loggerConfiguration.logPath}/${data.fileName}.log`)
  } else {
    fullFileName.push(`${loggerConfiguration.logPath}/${data.fileName}.log`)
  }

  fullFileName.forEach((file) => {
    fs.open(file, 'a', 0x1a4, function (error, file_handle) {
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
  })
}



function log(message: string, logLevel: string | number) {
  const date = new Date()
  let _ = ({ ...foo } = {}) => () => new Promise(resolve => setTimeout(resolve, 0, foo));
  aQueue.enqueue(_({ __log, data: { fileName: toNormalDate(date), time: toNormalTime(date), message, level: (typeof logLevel == 'string') ? LOG_LEVEL_DICTIONARY[logLevel] || 0 : logLevel } })).then(({ __log, data }: any | unknown) => __log(data));
}


/** Уровни логирования:
 * [1] debug — Подробная информация для отладки
 * [2] info — Интересные события
 * [3] notice — Существенные события, но не ошибки
 * [4] warning — Исключительные случаи, но не ошибки
 * [5] error — Ошибки исполнения, не требующие сиюминутного вмешательства
 * [6] critical — Критические состояния (компонент системы недоступен, неожиданное исключение)
 * [7] alert — Действие требует безотлагательного вмешательства
 * [8] emergency — Система не работает
 */
function debug(message: string) {
  log(message, 1)
}
function info(message: string) {
  log(message, 2)
}
function error(message: string) {
  log(message, 5)
}

/** TODO Необходима следующая обработка методов:
 * logger.config() -  конфигурирует сам логер, его поведение, уровни логирование, лимиты директории (по размеру), лимит файла error.log, 
 *                    лимит размера одного файла (по размеру, по занимаемой памяти)
 * logger.log() - записывает логи (конфигурация передаётся внутри метода - т.е. уровень логироавния и т.д.)
 * logger.error(), logger.info() ... - для каждого уровня логирования 
 */
export default {
  log,
  debug,
  info,
  error
}