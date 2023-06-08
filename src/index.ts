import logger from "./utils/logger/logger.js";

let taskId: number = 0

// let start = performance.now()
// // for (let i = 0; i < 10000; i++) {
// logger.log(`TASK-${taskId} test log written №1`, 1)
// logger.log(`TASK-${taskId} test log written №2`, 2)
// taskId++
// logger.log(`TASK-${taskId} test log written №1`, 1)
// logger.log(`TASK-${taskId} test log written №2`, 2)
// taskId++
// logger.log(`TASK-${taskId} test log written №1`, 1)
// logger.log(`TASK-${taskId} test log written №2`, 2)
// taskId++
// logger.log(`TASK-${taskId} test log written №3`, 5)
// logger.log(`TASK-${taskId} test log written №4`, 0)
// logger.log(`TASK-${taskId} test log written №5`, 9)
// // }
// console.log('DONE %fms', performance.now() - start)

function print(message: string, task?: number): void {
  if (task !== undefined) {
    console.log(`TASK-${task} ${message}`)
  } else {
    console.log(message)
  }
}

print('log without task')
print('log with task', taskId)