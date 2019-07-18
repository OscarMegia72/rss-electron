let Parser = require('rss-parser')
let parser = new Parser();
const moment = require('moment')
const arraySort = require('array-sort')
const hash = require("md5")
const prettyMilliseconds = require('pretty-ms');

class GetNoticia{
    getByValue(map, searchValue) {
        for (let [key, value] of map.entries()) {
          if (value === searchValue)
            return key;
        }
      }
    async getResumenPrensa(){
        let alias = mapa_feeds.get('abc')
        let final_url = alias ? alias : url
        let tempLista = await this.getNoticia(final_url)
        return tempLista
        console.info("getResumenPrensa")
        let resumen = []
        for (const feed of mapa_feeds.values()) {
            console.info("feed: "+feed)
            let tempLista = await this.getNoticia(feed)
            tempLista.forEach(noticia=>{
                resumen.push(noticia)
            })
        }
        console.log(`Resumen Noticias ${resumen.length}`)
        return resumen
    }
    async getNoticia(mapa_feeds, tipo){
        try{         
            let resumen = []
            // let alias = mapa_feeds.get(url)
            // let final_url = alias ? alias : url
            this.maxNoticias=50
            let maxchar=300
            let pos=1
            let listaFeed=[]
            //console.log('GetNoticia.getNoticia: '+final_url)
            for (const feed_url of mapa_feeds.values()) {
                console.info(">>>>   WWW "+feed_url    )
                    var feed = await parser.parseURL(feed_url)
                    
                    if(feed){
                        listaFeed.push(`${this.getByValue(mapa_feeds,feed_url)}`)
                        for(var i in feed.items){
                            
                            if(feed.items[i].content){
                                feed.items[i].resumen=feed.items[i].contentSnippet.substring(0,maxchar)
                                feed.items[i].resSize=feed.items[i].resumen.length
                                if(feed.items[i].content.length>maxchar){
                                    feed.items[i].resumen+= " {...}"
                                }
                                feed.items[i].resumen=feed.items[i].resumen.replace('&nbsp;','')
                            }
                            if(tipo==='feed-radios' && feed.image){
                                feed.items[i].imagen=feed.image.url
                            }
                            //add hash _id & feed source for mongodb
                            let idtemp=hash(JSON.stringify(feed.items[i].title))
                            feed.items[i]._id=idtemp
                            feed.items[i].idfeed=`${this.getByValue(mapa_feeds,feed_url)}`
                            feed.items[i].ordinal=pos.toString().padStart(3,'0')
                            pos++
                            //console.info(typeof feed.items[i].categories)
                            if(feed.items[i].categories && !Array.isArray(feed.items[i].categories) ){
                                feed.items[i].categories=null
                            }
                            if(feed.items[i].categories && typeof feed.items[i].categories[0]==='object'){
                                feed.items[i].categories=null
                            }
                            feed.items[i].horaEmision=moment(feed.items[i].isoDate).format('YYYY-MM-DD | HH:mm:ss')
                            feed.items[i].horas=prettyMilliseconds(Date.now()-Date.parse(feed.items[i].isoDate))
                            //feed.items[i].horas=moment.duration(moment().diff(feed.items[i].horaEmision,'h'))
                            //
                            if(tipo!='feed-radios'){
                                feed.items[i].enclosure=null
                            }
                            resumen.push(feed.items[i])
                            this.maxNoticias--
                        } 
                        //return resumen  
                    }
                }
                arraySort(resumen, 'isoDate',{reverse: true})
                let pos_filtro=1
                resumen.forEach(data=>{
                    data.pos_filtro=pos_filtro.toString().padStart(3,'0')
                    pos_filtro++;
                })
                return {resumen:resumen.slice(0,100) , listaFeed:listaFeed}
        }catch(e){
            let error = e.name + ": " + e.message
            let mensaje  = e.message.includes('404') ? 'url incorrecta' : e.message
            console.log("$ "+mensaje)
            throw Error(mensaje)
        }    
        
    }
    
}

module.exports= GetNoticia
if(!module.parent){
   (async function (){
        var rm = new GetNoticia()
        await rm.getNoticia('https://www.abc.es/rss/feeds/abcPortada.xml')
    })()
    
}
