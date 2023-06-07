import logger from "./utils/logger/logger.js";

let start = performance.now()
for (let i = 0; i < 10000; i++) {
  logger.log('logs', `test log written №${i}`)
}
console.log('DONE %fms', performance.now() - start)
