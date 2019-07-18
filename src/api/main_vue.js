import Vue from 'vue';
import tablon from './components/tablon'
new Vue({
    el:'#tablon',
    render: h => h(tablon, {props:{tipo:tipo,listaFeed: listaFeed, data:data}}) 

})

