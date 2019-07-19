<template >
<div>
    <h1>tablon tipo : {{this.tipo}}</h1>
    <h1>lista tipo : {{this.listaFeed}}</h1>
    <p>{{this.data[0]}}</p>

</div>
</template>
<script>
export default {
        // PRUEBA BASICA SIN MAQUETAR
        props:{
            tipo:{type: String, required: true},
            listaFeed:{type:String,required:true},
            data:{type:String, required:true}
        },
        data(){
            return {    
              
            }
        },
        created(){
          
        }
}
</script>

