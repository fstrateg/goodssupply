<template>
  <div class="home" v-if="filters">
    <h1>Supplies</h1>




    <div class="mx-auto p-3 col-xl-10">
      <div class="row">
        <div class="text-start col-6">
          <el-button type="primary" icon="el-icon-plus" @click="AddSupply">Add supply</el-button>
        </div>
        <div class="col-2">
          <select id="good"  class="form-control col-6 me-2" v-model="filters.good">
            <option v-for="option in sprgoods" :value="option.id" :key="option.id">
              {{ option.name }}
            </option>
          </select>
          
        </div>
        <div class="col-2">
          <select id="type"  class="form-control col-6 me-2" v-model="filters.done">
            <option v-for="option in spractive" :value="option.id" :key="option.id">
              {{ option.name }}
            </option>
          </select>
          
        </div>
        <div class="text-end col-2">
          <!--el-select class="me-2"></el-select-->
          <el-button type="primary" icon="el-icon-refresh" @click="refresh">Refresh</el-button>
        </div>
      </div>
    </div>
    <div class="mx-auto p-3 col-xl-10">
      <el-table style="margin: auto" :data="supplys">
        <el-table-column
                label="Name"
                prop="good_name"
                width="200"
        ><template v-slot="scope"><img class="goods-img" :src="getImage(scope.row.img_id)"/>{{scope.row.good_name}}</template>
        </el-table-column>
        <el-table-column
                label="Created"
                prop="dat"
        >
          <template v-slot="scope">{{format_date(scope.row.dat)}}</template>
        </el-table-column>
        <el-table-column
            label="Quantity"
            prop="qua">

        </el-table-column>
        <el-table-column
                label="Cost"
                prop="cost">
        </el-table-column>
        <el-table-column
            label="First cost"
            prop="price">
          <template v-slot="scope"><b>{{scope.row.price}}</b></template>
        </el-table-column>
        <el-table-column
                label="Price"
                prop="salles_price">
        </el-table-column>
        <el-table-column
            label="FBA"
            prop="fba"></el-table-column>
        <el-table-column
            label="Profit"
            prop="profit"></el-table-column>
        <el-table-column
            label="ROI"
            prop="roi">
          <template v-slot="scope">{{scope.row.roi}}%</template>
        </el-table-column>
        <el-table-column
            label="Total profit"
            prop="profit_total"
          ><template v-slot="scope"><b>{{scope.row.profit_total}}$</b></template></el-table-column>
        <el-table-column
            label="Status">
          <template v-slot="scope"><span class="material-icons md-dark">{{scope.row.icon}}</span></template>
        </el-table-column>
        <el-table-column
            label="Command"
            width="120"
          >
          <template v-slot="scope">
              <el-button-group>
                  <el-button type="primary" icon="el-icon-edit" @click="editRow(scope.row.id)"></el-button>
                  <el-button type="primary" icon="el-icon-copy-document" @click="copyRow(scope.row.id)"></el-button>
                  <el-button type="primary" icon="el-icon-delete" @click="deleteRow(scope.row.id)"></el-button>
              </el-button-group>
          </template>

        </el-table-column>
      </el-table>
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
  const {config} =require('../config')

  export default {
    name: "Home",
    data() {
      return{
        supplys:[],
        good:'',
        filters:{
          done:'False',
          good: 0
        },
        sprgoods:[{id:0,name:'test'}],
        spractive:[ {id:'True',name:'(All)'},
                    {id:'False',name:'Active'}
                  ]
      }
    },


    methods: {
      AddSupply()
      {
        this.$router.push('/supply/id=-1')
      },
      editRow(id)
      {
        this.$router.push('/supply/'+id)
        },
        copyRow(id) {
            this.$router.push('/supply/'+id+'?oper=new')
        },
        async deleteRow(id) {
            if (confirm('Are you sure what you want delete record?')) {
                await backend.delete('supply/del/' + id).then((resp) => {
                    this.refresh()
                })
            }
        },
      getImage(image_id){
        return config.Image_url+'products/'+image_id+'.png'
      },
      refresh(){
        let param={params:{filter:this.filters}}
        backend.get('supply',param).then((response) => {
          this.supplys=response.data
        })
      },
      format_date(value){
        if (value) {
          return moment(String(value)).format('DD.MM.YYYY')
          //return new Date(value).toLocaleString()
        }
      },
    },
    async created() {
      await backend.get('sprgoods').then((response) => {
        if (response.data.length > 0)
          this.sprgoods = [{id:0, name:'(All)'}].concat(response.data)
      });
      this.refresh()
    }
  }
</script>
