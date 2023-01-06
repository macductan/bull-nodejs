const Redis = require("ioredis");
const redis = new Redis();

const run = async () => {
    console.log(await redis.get('test2wwww').then(res => +res));
}
run()