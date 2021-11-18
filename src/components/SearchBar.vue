<template>
     <div>
          <div class="padding">
               <input v-model="userSearch" type="text" placeholder="Search...">
               <button @click="callApi" type="button">Start</button>
          </div>
          
          
          <div class="padding" v-for="movie in movies" :key="movie.id">
               {{movie.title}} <br>
               {{movie.original_title}} <br>
               {{movie.original_language}} <br>
               {{movie.vote_average}} <br>
          </div> 

     </div>
</template>

<script>

import axios from "axios"

export default{
    data(){
          return{   
               userSearch : "",
               movies : [],
               error : "",
          }
         
     },

     methods:{

          callApi(){
               axios
               .get("https://api.themoviedb.org/3/search/movie?api_key=30f94b70393e21156823d2636f7229b7&language=en-US&include_adult=false&query="+this.userSearch)
               .then(response=>{
                    console.log(response.data.results)
                    this.movies = response.data.results
                    console.log(this.movies)
                    console.log(this.userSearch)
                    this.userSearch = ""
               })

               
          }

     }
}
</script>

<style scoped lang="scss">
.padding{
     padding-bottom: 20px;
}
</style>