const redis = require("redis"), client = redis.createClient();

const bluebird = require('bluebird')
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
redis.debug = true;

client.on("error", function(err) {
	console.log("Error " + err);
});

client.on('connect', () => {
    console.log('connected');
})

///////////////////////////////////////

module.exports = {
	getQueryCache: getQueryCache,
	setQueryCache: setQueryCache
};

///////////////////////////////////////

function getQueryCache(key) {
	let data = ''
	client.get(key, (err, result) => {
		// console.log(err, result);
		if (err || !result)  console.log(err)
		data = JSON.parse(result);
	})
	console.log(data);
return data
	
}

function setQueryCache(key, ttl, data) {
	// console.log(key);
	client.setex(key, ttl,JSON.stringify(data), (err, result) => {
		if (err || !result) console.log(err)
		console.log(result);
	});
}