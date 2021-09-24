<template>
  <div class="home">
    <h1>Supplies</h1>
    <button class="btn btn-primary" @click="AddSupply">Add supply</button>
    <div class="mx-auto p-3">
      <table  class="table table-striped table-hover">
        <thead>
        <tr>
          <th>Name</th>
          <th>Created</th>
          <th>Quantity</th>
          <th>Cost</th>
          <th>First cost</th>
          <th>FBA</th>
          <th>Profit</th>
          <th>ROI</th>
          <th>Total profit</th>
          <th>Status</th>
          <th>Command</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="rw in supplys">
          <td class="cl-nam"><img class="goods-img" :src="'http://localhost:3000/images/products/'+rw.img_id+'.png'"/>{{rw.good_name}}</td>
          <td>{{format_date(rw.dat)}}</td>
          <td>{{rw.qua}}</td>
          <td>{{rw.cost}}</td>
          <td><b>{{rw.price}}</b></td>
          <td>{{rw.fba}}</td>
          <td>{{rw.profit}}</td>
          <td>{{rw.roi}}%</td>
          <td><b>{{rw.profit_total}}$</b></td>
          <td><span class="material-icons md-dark">{{rw.icon}}</span></td>
          <td><div class="btn-group">
            <router-link class="btn btn-sm" tag="button" :to="'/supply/'+rw.id">
            <span class="material-icons">edit</span></router-link>
            <span class="btn material-icons">delete</span></div>
          </td>
        </tr>
        </tbody>
      </table>
  </div>
  </div>
</template>

<style type="text/css" scoped>
  .cl-nam{
    text-align: left;
  }
  .goods-img{
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
</style>

<script>

  const {backend} =require('../backend')
  const moment=require('moment')

  export default {
    name: "Home",
    data() {
      return{
        supplys:[]
      }
    },


    methods: {
      AddSupply()
      {
        this.$router.push('/supply/id=-1');
      },
      format_date(value){
        if (value) {
          return moment(String(value)).format('DD.MM.YYYY')
          //return new Date(value).toLocaleString()
        }
      },
    },
    async mounted() {
      await backend.get('supply').then((response) => {
        this.supplys=response.data
      })
    }
  }
</script>
