<template >
<div>
    <aside class='banner'>
       
    </aside>
    
    <section class='seccion-ideas'>
      
        
        <div class='filtro-noticias'>
             <span class='titulo'>NOTICIAS</span>
            <!-- <span class='boton-orden-fecha' v-on:click="ordenaNoticias('fecha')" >Por Fecha</span>
             <span class='boton-orden-fecha' v-on:click="ordenaNoticias('feed')">Por Feed</span>
              <span class='boton-orden-fecha' v-on:click="ordenaNoticias('altura')">Por Altura</span> -->
        </div>
        <div class='noticias' >
                <div class='noticia' v-for="noticia_origen in data" v-bind:key="noticia_origen._id">
                    <a class='origen-feed' :href=noticia_origen.link target="_blank" :style="{ 'background-color': noticia_origen.color_feed}"
                    @click.ctrl.exact='openNoticias(noticia_origen.id)'
                     >
                     <span  ><span class='texto_origen_feed' >{{noticia_origen.idfeed}}</span>  </span>
                     </a>
                        <span class='titulo'>{{noticia_origen.title}}</span>
                        <div class='texto-html' v-html="noticia_origen.resumen"></div>
                        <span style="padding: 10px"></span>
                        <span class="fecha_noticia">{{noticia_origen.fecha}}</span>
                 </div>
               
        </div>

    </section> 
  </div>
</template>
<script>

    import arraySort from 'array-sort';
    Array.prototype.clear = function() {
    this.splice(0, this.length);
    };
    export default {
 
        //components:{Noticia},
         props:{
            tipo:{type: String, required: true},
            listaFeed:{type:String,required:true},
            data:{type:Array, required:true}
        },

        data(){
            return {
                lista_noticias:[],
                altura_orden:true,
                fecha_orden:true,
                feed_orden:false
            }
        },
        created(){
            console.log(this.data.count) 
        },
        mounted() {
           
        },
        methods:{
           
            async ordenaNoticias(orden){
                console.info(`order by ${orden}`)
                switch(orden){
                    case "altura":
                        arraySort(this.data, 'resSize',{reverse: this.altura_orden})
                        this.altura_orden = !this.altura_orden
                        break
                    case "fecha":
                        arraySort(this.data, 'isoDate',{reverse: this.fecha_orden})
                        this.fecha_orden=!this.fecha_orden
                        break
                    case "feed":
                        arraySort(this.data, 'idfeed',{reverse: this.feed_orden})
                        this.feed_orden=!this.feed_orden
                        break
                }
                
            }
        }
}
</script>