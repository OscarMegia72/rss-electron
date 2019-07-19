require('./public/stylesheets/less/radios/ivox_vue.less')
// require('./public/stylesheets/less/noticias/noticias.less')
import Vue from 'vue';
import Ivoxradio from './components/Ivoxradio.vue'
import Noticias from './components/Noticias.vue'
console.log(`DESDE MAIN-VUE ${tipo}`)
switch(tipo){
    case 'feed-radios':
            new Vue({
                el:'#app',
                render: h => h(Ivoxradio, {props:{tipo:tipo,listaFeed: listaFeed, data:data}}) 
            })
        break;
    case 'feed-noticias':
            new Vue({
                el:'#app',
                render: h => h(Noticias, {props:{tipo:tipo,listaFeed: listaFeed, data:data}}) 
            
            })
    break;

}


