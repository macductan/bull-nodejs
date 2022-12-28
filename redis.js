const IoRedis = require("ioredis");
const ioredis = new IoRedis();

// ioredis.lpush("queue", 0)
let d = 0
setInterval(async () => {
    const index = await ioredis.blpop('queue', 100000).then(index => parseInt(index[1]));
    const len = await ioredis.llen('mylist')
    if(index !== null && len <= index){
        d++;
        console.log(await ioredis.lindex("mylist", index));
        await ioredis.lpush("queue", index + 1)
    }
    else{
        console.log(d);
        process.exit(0)
    }
}, 10);

const run = async () => {
    while(true){
        await ioredis.lpush("mylist", 'test')
    }
    // const index = await ioredis.blpop('queue', 100000).then(index => index ? parseInt(index[1]) : null);
    // if(index !== null){
    //     console.log(123);
    // }
    // console.log(await ioredis.llen('mylist'));
}

run()