const Queue = require('./queue')

const run = async () => {
    let queue = new Queue('test')
    await queue.push([1, 2, {test: 'object'}])
    queue.process(async (job) => {
        console.log(job);
    })
}
run()