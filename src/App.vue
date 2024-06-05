<template>
  <div id="app">
    <BestCommentFormEver />
    <BestCommentList />
  </div>
</template>

<script>
import BestCommentFormEver from './components/BestCommentFormEver.vue';
import BestCommentList from './components/BestCommentList.vue';

export default {
  name: 'App',
  components: {
    BestCommentFormEver,
    BestCommentList,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  font-size: 2em;
  margin-bottom: 20px;
}
</style>
