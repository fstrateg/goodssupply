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
        </tr>
        </thead>
        <tbody>
        <tr v-for="rw in supplys">
          <td>{{rw.good_name}}</td>
          <td>{{format_date(rw.dat)}}</td>
          <td>{{rw.qua}}</td>
          <td>{{rw.cost}}</td>
          <td><b>{{rw.price}}</b></td>
          <td>{{rw.fba}}</td>
          <td>{{rw.profit}}</td>
          <td>{{rw.roi}}%</td>
          <td><b>{{rw.profit_total}}$</b></td>
          <td><span class="material-icons md-dark">{{rw.icon}}</span></td>
        </tr>
        </tbody>
      </table>
  </div>
  </div>
</template>

<script>
  const axios=require('axios')
  const moment=require('moment')


  const inst=axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      accept: 'application/json'
    }
  })

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
        alert('test AddSupply')
      },
      format_date(value){
        if (value) {
          return moment(String(value)).format('DD.MM.YYYY')
        }
      },
    },
    async mounted() {

      await inst.get('supply').then((response) => {
        this.supplys=response.data
        console.log(response.data)
      })
    }
  }
</script>
