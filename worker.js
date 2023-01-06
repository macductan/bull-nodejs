const Queue = require('./queue')

const run = async () => {
    let queue = new Queue('test')
    queue.process(async (message) => {
        console.log(message);
    })
}
run()