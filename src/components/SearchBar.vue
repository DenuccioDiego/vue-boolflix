<template>
     <div>
          <div class="padding">
               <input v-model="userSearch" type="text" placeholder="Search...">
               <button @click="callApiMovies(); callApiSeries()" type="button">Start</button>
          </div>
          
          <h2>Film</h2>
          <div class="padding" v-for="movie in movies" :key="movie.id">

               {{movie.title}} <br>
               {{movie.original_title}} <br>
               <span v-if="movie.original_language=='en'">
                    <CountryFlag country="gb-eng" size='big'/>
               </span>

               <span v-else>
                    <CountryFlag :country="movie.original_language" size='big'/>
               </span>

               {{movie.vote_average}} <br>

               <img :src="'http://image.tmdb.org/t/p/w92/'+movie.poster_path" alt="">

          </div> 

          <h2>Series TV</h2>
          <div class="padding" v-for="oneSeries in series" :key="oneSeries.id">

               {{oneSeries.name}}
               {{oneSeries.original_name}}

               <span v-if="oneSeries.original_language == 'en'"> 
                    <CountryFlag country="gb-eng" size='big'/>
               </span>

               <span v-else>
                    <CountryFlag :country="oneSeries.original_language" size='big'/>
               </span>
               
               {{oneSeries.vote_average}}

               <img :src="'http://image.tmdb.org/t/p/w92/'+oneSeries.poster_path" alt="">
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
               series : [],
               error : "",
               
          }
         
     },

     methods:{

          callApiSeries(){
               axios
               .get("https://api.themoviedb.org/3/search/tv?api_key=30f94b70393e21156823d2636f7229b7&query="+this.userSearch)
               .then(response =>{
                    this.series = response.data.results
                    console.log(this.series)
               }).catch(e=>{
                    this.error = `Ops ${e}`
               })
          },

          callApiMovies(){
               axios
               .get("https://api.themoviedb.org/3/search/movie?api_key=30f94b70393e21156823d2636f7229b7&language=en-US&include_adult=false&query="+this.userSearch)
               .then(response=>{
                    this.movies = response.data.results
                    console.log(this.movies)
                    this.userSearch = ""
               }).catch(e=>{
                    this.error = `Ops ${e}`
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