
module.exports ={
    caching_file: function(req, res, next){
            if(!req.query.tipo){
                console.log("no req.query.tipo")
                return next()
            }
            global.config.memoryCache.get(global.config.keycaching+req.query.tipo, function(err, result) {
            console.log(`key-render-caching: ${global.config.keycaching}`)
            if(err){
              console.log('err', err)
              next()
            }
            if(result){
                req.caching=result
                console.log("=== CACHING RESULT ===========")
                console.log('key render expire: ',result.validez)
                console.log('modo: '+req.query.modo)
                if(result.data) console.log(result.data.length)
                console.log("==============================")
                return next()
            }else{
              console.log("=======CACHING PASS ==============")
              console.log(`caching middleware next`)
              console.log("==================================")
              return next()
            }
  
          });
    }
}