<template>
<div>
    <div class="navbar">
        <div class="navbar-brand">
            Smart Home
        </div>
    </div>
    <MainPage/>
 
    
</div>

</template>

<script>
import MainPage from './components/mainPage.vue'

export default {
  name: 'App',
  components: {
    MainPage
  }
  
}
</script>

<style>
.navbar{
  background-color: #fff;
  padding-left: 5rem;
  border-bottom:1px solid black;
}
html{
  background-color:#F3F7FB;
}
.sidebar{
  width: 10%;
  height: 100%;
}
</style>
