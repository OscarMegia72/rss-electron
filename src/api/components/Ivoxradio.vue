<template >
<div>
    <aside class='banner'>
       
    </aside>
    
    <section class='seccion-ideas'>
      
        
        <div class='filtro-noticias'>
            <span class='titulo'>Radios IVOX - Order by last, caching: </span><span class='titulo' v-if='validez'>{{validez}}</span>
        </div>
        <div class='noticias' >
                <div class='noticia' v-for="item in data" v-bind:key="item._id">
                    <a class='origen-feed' :href=item.link target="_blank" :style="{ 'background-color': item.color_feed}"
                    @click.ctrl.exact='openNoticias(item.id)'
                     >
                     <span  ><span class='texto_origen_feed' >{{item.idfeed}}</span>  </span>
                     </a>
                        <span class='titulo'>{{item.title}}</span>
                         <div class='descripcion'>
                              <img class='icono-canal' :src="item.imagen" ></img>
                                 
                        <div class='texto-html' v-html="item.resumen"></div>
                        </div>
                        <span style="padding: 10px"></span>
                         <footer class='footer'>
                        <span class="fecha_noticia">{{item.horas}}</span>
                        <div class='reproductor'>
                                        <audio controls controlsList="nodownload">
                                          <source :src=item.enclosure.url type="audio/mpeg">
                                        </audio>

                        </div>
                         </footer>
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
            data:{type:Array, required:true},
            validez:{type:String}
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