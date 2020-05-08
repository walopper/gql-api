// import cacheManager from 'cache-manager';
// import redisStore from 'cache-manager-redis-store';

// class RedisService {
//     private client;

//     constructor() {
//         const redisCache = cacheManager.caching({
//             store: redisStore,
//             // db: 0, // if multiple dbs
//         });

//         this.client = redisCache.store.getClient();

//         this.client.on('error', (error) => {
//             // TODO handle error here
//             console.log(error);
//         });
//     }

//     public getKey(key) {
//         this.client.get(key);
//     }

//     public setKey(key) {
//         this.client.set(key);
//     }
// }

// export default new RedisService;


