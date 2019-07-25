var express = require('express');
var router = express.Router();
var GetNoticia = require('../core/rss-get')
//caching to file
var moment = require('moment')
var cacheManager = require('cache-manager');
var fsStore = require('cache-manager-fs');
const ttl= 8*3600 //8 horas de caching
var memoryCache = cacheManager.caching({store: fsStore, options:{max: 100, ttl: ttl, path:'diskcache'}});
const key = "__RSS_RENDER_CACHING__RSS";
//===========================
//cache del servicio
//let key = "__RSS_RENDER_CACHING__RSS" + req.originalUrl || req.url;
//===========================
function cacheMiddleware (){
  return (req, res, next) => {
        memoryCache.get(key+req.query.tipo, function(err, result) {
          console.log(`key-render-caching: ${key}`)
          
          if(err){
            console.log('err', err)
            next()
          }
          
          if(result){
            console.log('key render expire: ',result.validez)
              if(req.query.modo){
                switch(req.query.modo){
                  case "vue":
                      let mydata= JSON.stringify(result.data)
                      res.render('noticias-vue', { title:'noticias-vue', tipo: req.query.tipo, listaFeed: result.listaFeed, data:mydata , validez:result.validez});
                      break;
                  case "rest":
                      res.json( result);
                    break;
                  case "ssr":
                      res.render('noticias', result);
                    break;
                  default:
                      res.json({error:true,data:"modo incorrecto"})
                }
              }
          }else{
            console.log(`caching middleware next`)
            next()
          }

        });
  }
}
router.get('/',cacheMiddleware(), async (req, res, next)=> {

  try{
      let contenido = require('../core/'+req.query.tipo)
      let gnoticia = new GetNoticia() 
      let {resumen,listaFeed }= await gnoticia.getNoticia(contenido,req.query.tipo)
      let ahora= moment()
      let fecha_caducidad=ahora.add(ttl,'seconds').format('YYYY-MM-DD | HH:mm:ss')
      
      memoryCache.set(key+req.query.tipo, {error:false,data:resumen,listaFeed:listaFeed, validez: fecha_caducidad}, {ttl: ttl}, function(err) {
        if (err) { throw err; }
        console.log("fecha caducidad caching ",fecha_caducidad)
      })
      if(req.query.modo){
        switch(req.query.modo){
          case "vue":
              let mydata= JSON.stringify(resumen)
              res.render('noticias-vue', { title:'noticias-vue', tipo: req.query.tipo, listaFeed: listaFeed, data:mydata , validez:'no-caching'});
              break;
          case "rest":
              let myrest={
                data: resumen,
                listaFeed: listaFeed
              }
              res.json( myrest);
              break;
          case "ssr":
              res.render('noticias', { "data":resumen,"listaFeed":listaFeed, "tipo":req.query.tipo });
                break;
          default:
              res.json({error:true,data:"modo incorrecto"})
        }
      }
     
  }catch(e){
    console.error('route get ',req.query, e)
    res.json({error:true, data:JSON.stringify(e)})
  }  
})
module.exports = router;
