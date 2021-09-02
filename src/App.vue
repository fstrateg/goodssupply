<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/goods">Goods</router-link>
  </div>
  <router-view/>
</template>

<style>

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  padding: 5px 10px;
  color: #2c3e50;
}
</style>
