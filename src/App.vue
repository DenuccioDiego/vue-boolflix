<template>

  <div id="app">

    <header class="d-flex justify-content-between align-items-center"> 
      <div>
        <img src="./assets/boolflix.png" alt="" >
      </div>
      <div class="">
        <input class="rounded-3" v-model="userSearch" type="text" placeholder="Search...">
        <button class="rounded-3" @click="callApiMovies(); callApiSeries();" type="button">Start</button>
      </div>

    </header>
    
    <main class="">

      <!-- Film -->
      <section class="">
        
        <h2 class="">Film</h2>
        
        <div class="row justify-content-center gx-0 text-center">
          <div class="col-2" v-for="movie in movies" :key="movie.id">

        {{movie.title}} <br>
        {{movie.original_title}} <br>
        <span v-if="movie.original_language=='en'">
          <CountryFlag country="gb-eng" size='big'/>
        </span>

        <span v-else>
          <CountryFlag :country="movie.original_language" size='big'/>
        </span>

        {{movie.vote_average}} <br>

        <font-awesome-icon class="gold" :icon="['fas','star']" v-for="index in Math.ceil(movie.vote_average/2)" :key="index" />
                      
        <font-awesome-icon :icon="['fa','star']" v-for="index in (5 - Math.ceil(movie.vote_average/2))" :key="index" />

        <img :src="'http://image.tmdb.org/t/p/w92/'+movie.poster_path" alt="">

          </div> 
        </div>
        
      </section> 

      <!-- Serie tv -->
      <section class="">
        <h2 class="">Series TV</h2>

        <div class="row justify-content-center gx-0 text-center">
          <div class="card-superiore col-3 position-relative" v-for="oneSeries in series" :key="oneSeries.id">

            <img v-if="oneSeries.poster_path != null"  :src="'http://image.tmdb.org/t/p/w342/'+oneSeries.poster_path" alt="">
            <img v-else src="https://upload.wikimedia.org/wikipedia/commons/9/95/No_immagine_disponibile.svg" alt="">

            <div class="card-nascosta position-absolute top-50 start-50 translate-middle opacity-0">
              {{oneSeries.name}}
              {{oneSeries.original_name}}

              <span v-if="oneSeries.original_language == 'en'"> 
                <CountryFlag country="gb-eng" size='big'/>
              </span>

              <span v-else>
                <CountryFlag :country="oneSeries.original_language" size='big'/>
              </span>
               
               
              <font-awesome-icon class="gold" :icon="['fas','star']" v-for="index in Math.ceil(oneSeries.vote_average/2)" :key="index" />
                    
              <font-awesome-icon :icon="['fa','star']" v-for="index in (5 - Math.ceil(oneSeries.vote_average/2))" :key="index" />

            </div>

           
               
            
            
          </div>
        </div>
        
      </section>

    </main>
    
    <footer>

    </footer>
    
  </div>

</template>

<script>

import CountryFlag from '../node_modules/vue-country-flag'
import axios from "axios"



export default {

  components: {

    CountryFlag,      
     
  },

  data(){
    return{   
      userSearch : "",
      movies : [],
      series : [],
      error : "",
      showHover : false ,
      
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
      .get("https://api.themoviedb.org/3/search/movie?api_key=30f94b70393e21156823d2636f7229b7&query="+this.userSearch)
      .then(response=>{
      this.movies = response.data.results
      console.log(this.movies)
      this.userSearch = ""
      }).catch(e=>{
      this.error = `Ops ${e}`
      })          
    },

    
  }

}
</script>

<style lang="scss">

@import "../node_modules/bootstrap/scss/bootstrap.scss";


header{
  background-color: black;

  & img{
    height: 5rem  ;
  }
}

main{
  background-color: #141414;
  

}

h2{
  display: block;
  text-align: center;
  color: white;
  border-bottom: solid 1px red;
  max-width: 50rem;
  margin:0 auto;
  padding-top: 2rem;
  margin-bottom: 1rem;
}

.gold{
  color: gold;
}

.card-nascosta{
  background-color: black;
  overflow-y: hidden;
  height: 100%;
  width: 100%;
}

.card-superiore:hover .card-nascosta{
  opacity: 1 !important;

}



</style>
