<template>
     <div>
          <input type="text" placeholder="Search...">
          <button @click="callApi" type="button">Start</button>
     </div>
</template>

<script>

import axios from "axios"

export default{
    data(){
         return{
               movies : [],
               error : "",
          }
         
     },

     methods:{

          callApi(){
               axios
               .get("https://api.themoviedb.org/3/search/movie?api_key=30f94b70393e21156823d2636f7229b7&language=en-US&include_adult=false&query=ritorno")
               .then(response=>{
                    console.log(response.data.results)
               })

               
          }

     }
}
</script>

<style scoped lang="scss">

</style>