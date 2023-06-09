import logger from "./utils/logger/logger.js";

let taskId: number = 0

let start = performance.now()
for (let i = 0; i < 100000; i++) {
  logger.log('[log] message with task', 1, taskId)
  taskId++
}
console.log('DONE %fms', performance.now() - start)

// function print(message: string, task?: number): void {
//   if (task !== undefined) {
//     console.log(`TASK-${task} ${message}`)
//   } else {
//     console.log(message)
//   }
// }

// print('log without task')
// print('log with task', taskId)