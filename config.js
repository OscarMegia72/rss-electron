const fsStore = require('cache-manager-fs');
const cacheManager = require('cache-manager');
var config = {
    memoryCache :cache(),
    keycaching :"__RSS_RENDER_CACHING__RSS_",
    develop: {
        ttl:30,
    },
    pro:{
        ttl:3600*8,
    }
}
function cache(){
    return cacheManager.caching({store: fsStore, options:{max: 100, ttl: 30, path:__dirname+"/cache"}})
}
module.exports = config