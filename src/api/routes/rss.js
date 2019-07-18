var express = require('express');
var router = express.Router();
var GetNoticia = require('../core/rss-get')
//caching
var cacheManager = require('cache-manager');
var fsStore = require('cache-manager-fs');
var memoryCache = cacheManager.caching({store: fsStore, options:{max: 100, ttl: 10*3600, path:'diskcache'}});
const key = "__RSS_RENDER_CACHING__RSS";
//===========================
//cache del servicio
//let key = "__RSS_RENDER_CACHING__RSS" + req.originalUrl || req.url;
//===========================
function cacheMiddleware (){
  return (req, res, next) => {
        memoryCache.get(key+req.query.tipo, function(err, result) {
          console.log(`$$ key-render-caching busqueda: ${key}`)
          console.log(err)
          if(result){
              if(req.query.modo){
                switch(req.query.modo){
                  case "vue":
                      let mydata= JSON.stringify(result.data)
                      res.render('noticias-vue', { title:'noticias-vue', tipo: req.query.tipo, listaFeed: result.listaFeed, data:mydata });
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
      memoryCache.set(key+req.query.tipo, {error:false,data:resumen,listaFeed:listaFeed}, {ttl: ttl}, function(err) {
        if (err) { throw err; }
      })
      if(req.query.modo){
        switch(req.query.modo){
          case "vue":
              res.render('noticias-vue', { title:'noticias-vue', tipo: req.query.tipo, listaFeed: result.listaFeed, data:mydata });
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
    console.error(`index ${e}`)
    res.json({error:true,data:e.message})
  }  
})
module.exports = router;