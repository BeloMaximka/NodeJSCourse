import redis from  "redis";

const client = redis.createClient({
    url: "redis://127.0.0.1:6379",
});

async function init() {
    await client.connect();
    await client.set("fruit", "orange")
    const fruit = await client.get("fruit");
    console.log(fruit);
}

init();