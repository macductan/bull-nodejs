const Bluebird = require('bluebird')
const Redis = require("ioredis");
const redis = new Redis();

class Queue {
    constructor(nameQueue) {
        this.nameQueue = nameQueue
    }

    async push(list) {
        for (let i = 0; i < list.length; ++i) {
            const index = await redis.get(this.nameQueue + ':#index').then(res => +res)
            await Bluebird.all([
                redis.set(this.nameQueue + ':#index', index + 1),
                redis.set(this.nameQueue + ':' + index, JSON.stringify(list[i])),
                redis.rpush(this.nameQueue + ':#wait', index),
            ])
        }
    }

    async process(handle) {
        while (true) {
            if (typeof handle !== 'function') {
                throw new Error('Handle must be a function')
            }

            const index = await redis.blpop(this.nameQueue + ':#wait', 1).then(index => index && index[1])
            const job = JSON.parse(await redis.get(this.nameQueue + ':' + index))
            if (index) {
                try {
                    await handle(job)
                    await redis.rpush(this.nameQueue + ':#completed', index)
                } catch (error) {
                    console.log(error);
                    await redis.rpush(this.nameQueue + ':#failed', JSON.stringify(error.message))
                }
            }
        }
    }
}

module.exports = Queue