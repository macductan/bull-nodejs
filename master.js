const Bluebird = require('bluebird')
const Queue = require('./queue')

const run = async () => {
    let i = 0
    Bluebird.delay(1000)
    let queue = new Queue('test')
    for(i; i<i+5; ++i)
    queue.push(i)
}
run()