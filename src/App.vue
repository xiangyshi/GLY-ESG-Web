<!-- src/App.vue -->
<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
    </nav>
    <!-- This is where the matched route's component will be rendered -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>
