<template>
     <div>
          <div class="padding">
               <input v-model="userSearch" type="text" placeholder="Search...">
               <button @click="callApi" type="button">Start</button>
          </div>
          
          
          <div class="padding" v-for="movie in movies" :key="movie.id">
               {{movie.title}} <br>
               {{movie.original_title}} <br>
               <span v-if="movie.original_language=='en'">
                    <CountryFlag country="gb-eng" size='big'/>
               </span>
               <span v-else-if="movie.original_language=='undefined'">
                    Bandiera non disponibile
               </span>
               <span v-else>
                         <CountryFlag country="eng" size='big'/>
               </span>

               {{movie.vote_average}} <br>
          </div> 
             
     </div>

     
</template>
          

<script>
import CountryFlag from '../../node_modules/vue-country-flag'



import axios from "axios"

export default{
     components:{
          CountryFlag,
     },

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