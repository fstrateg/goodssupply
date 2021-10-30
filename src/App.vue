<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/moving">Moving</router-link> |
    <router-link to="/goods">Goods</router-link> |
    <router-link to="/goodsremainig">Remaining</router-link>
  </div>
  <router-view/>
</template>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#app .el-table, #app .el-table .el-button{
  font-size: 12px;
}
.cell .el-button-group>.el-button{
  padding: 0 10px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  padding: 5px 10px;
  color: #2c3e50;
}
.goods-img{
  width: 40px;
  height: 40px;
}
</style>
