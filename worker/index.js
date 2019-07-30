const keys = require('./keys');
const redis = require('redis');

function fib(index) {
  if (index < 2) {
    return 1;
  }
  return fib(index - 1) + fib(index - 2);
}

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});

// Create a subscription to redis
const sub = redisClient.duplicate();

/*
 Set a callback that computes the fibonacci value for the received index.
 and stores it into Redis
*/
sub.on('message', (channel, message) => {
  redisClient.hset('values', message, fib(parseInt(message)));
});
sub.subscribe('insert');
