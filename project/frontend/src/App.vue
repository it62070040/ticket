
<template>
  <div id="app">
    <NavBar/>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import NavBar from "./components/navbar";
import store from './vuex/store' // import the store we just created
export default {
  components: {
    NavBar,
  },
  store,
}
</script>
