<template>

  <div id="app">
    <Header />
    <MainSection />
    <Footer />  
  </div>

</template>

<script>
import Header from "./components/Header.vue"
import MainSection from "./components/MainSection.vue"
import Footer from "./components/Footer.vue"

export default {
  components: {
    Header,
    MainSection,
    Footer,
  }
}
</script>

<style lang="scss">

</style>
