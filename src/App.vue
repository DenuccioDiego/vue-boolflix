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

        <div class="row justify-content-center text-center m-0 g-3">
          <div class="card-superiore col-2 position-relative" v-for="movie in movies" :key="movie.id">

            <img class="h-100 w-100 rounded_5" v-if="movie.poster_path != null"  :src="'http://image.tmdb.org/t/p/w342/'+movie.poster_path" alt="">
            <img class="h-100 w-100 rounded_5" v-else src="https://upload.wikimedia.org/wikipedia/commons/9/95/No_immagine_disponibile.svg" alt="">

            <div class="rounded_5 card-nascosta position-absolute top-50 start-50 translate-middle opacity-0">
              <p>
                <span class="title">Titolo: </span> {{movie.title}} 
              </p>

              <p v-if="movie.original_title != movie.title ">
                <span class="title">Titolo originale: </span> {{movie.original_title}}
              </p>
              
              <p v-if="movie.original_language == 'en'"> 
                <span class="title">Lingua originale: </span> <CountryFlag country="gb-eng" size='big'/>
              </p>

              <p v-else>
                <span class="title">Lingua originale: </span><CountryFlag :country="movie.original_language" size='big'/>
              </p>
               
              <p>
                <span class="title">Valutazione: </span>
                <font-awesome-icon class="gold" :icon="['fas','star']" v-for="index in Math.ceil(movie.vote_average/2)" :key="index" />
                <font-awesome-icon :icon="['fa','star']" v-for="index in (5 - Math.ceil(movie.vote_average/2))" :key="index" />
              </p>

              <p v-if="movie.overview != ''">
                <span class="title">Overview: </span>
                {{movie.overview}}
              </p>

            </div>  
            
          </div>
        </div>
        
      </section>


      <!-- Serie tv -->
      <section class="">
        <h2 class="">Series TV</h2>

        <div class="row justify-content-center text-center m-0 g-3">
          <div class="card-superiore col-2 position-relative" v-for="oneSeries in series" :key="oneSeries.id">

            <img class="h-100 w-100 rounded_5" v-if="oneSeries.poster_path != null"  :src="'http://image.tmdb.org/t/p/w342/'+oneSeries.poster_path" alt="">
            <img class="h-100 w-100 rounded_5" v-else src="https://upload.wikimedia.org/wikipedia/commons/9/95/No_immagine_disponibile.svg" alt="">

            <div class="rounded_5 card-nascosta position-absolute top-50 start-50 translate-middle opacity-0">
              <p>
                <span class="title">Titolo: </span> {{oneSeries.name}} 
              </p>

              <p v-if="oneSeries.original_name != oneSeries.name ">
                <span class="title">Titolo originale: </span> {{oneSeries.original_name}}
              </p>
              
              <p v-if="oneSeries.original_language == 'en'"> 
                <span class="title">Lingua originale: </span> <CountryFlag country="gb-eng" size='big'/>
              </p>

              <p v-else>
                <span class="title">Lingua originale: </span><CountryFlag :country="oneSeries.original_language" size='big'/>
              </p>
               
              <p>
                <span class="title">Valutazione: </span>
                <font-awesome-icon class="gold" :icon="['fas','star']" v-for="index in Math.ceil(oneSeries.vote_average/2)" :key="index" />
                <font-awesome-icon :icon="['fa','star']" v-for="index in (5 - Math.ceil(oneSeries.vote_average/2))" :key="index" />
              </p>

              <p v-if="oneSeries.overview != ''">
                <span class="title">Overview: </span>
                {{oneSeries.overview}}
              </p>
                  
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
  padding: 0 20px 0 20px;

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

.title{
  font-weight: 600;
}

.card-nascosta{
  background-color: black;
  overflow-y: hidden;
  height: 100%;
  width: 100%;
  color: white;
}

.card-superiore:hover .card-nascosta{
  opacity: 0.97 !important;

}

.object-fit-cover{
  object-fit: cover;
}

.rounded_5{
  border-radius: 10px;
}

</style>
