<template>
    <h1>Moving of goods on Prep</h1>
    <el-button type="primary" icon="el-icon-plus" @click="addRecord">Add record</el-button>
    <div class="container">
    <el-table :data="rows">
        <el-table-column
                label="Picture"
                width="75"
        >
            <template v-slot="scope">
                <img class="goods-img" :src="'http://localhost:3000/images/products/'+scope.row.img_id+'.png'">
            </template>
        </el-table-column>
        <el-table-column
                label="Date"
                width="120"
        >
            <template v-slot="scope">
                <span style="margin-left: 10px">{{format_date(scope.row.dat)}}</span>
            </template>
        </el-table-column>
        <el-table-column
                prop="name"
                label="Name"
                width="180">
        </el-table-column>
        <el-table-column
                prop="qua"
                label="Quantity"
                width="50">
        </el-table-column>
        <el-table-column
                prop="note"
                label="Note"
                width="200">
        </el-table-column>
        <el-table-column
                label="Command"
                width="150"
        >
            <template v-slot="scope">
                <el-button-group>
                    <el-button type="primary" icon="el-icon-edit" @click="editRow(scope.row.id)" ></el-button>
                    <el-button type="primary" icon="el-icon-delete"></el-button>
                </el-button-group>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :page-size="pageSize"
            :total="total">
    </el-pagination>
    </div>
</template>

<script>
    import {backend} from "../backend";
    const moment=require('moment')

    export default {
        name: "MoveTable",
        data() {
            return{
                total:0,
                pageSize:10,
                curPage: 1,
                rows:[]
            }
        },
        methods:{
            format_date(value){
                if (value) {
                    return moment(String(value)).format('DD.MM.YYYY')
                }
            },
            async handleCurrentChange(cur){
                this.curPage=cur
                await this.loadData()
            },
            async loadData()
            {
                await backend.get('moving?size='+this.pageSize+'&cur='+this.curPage).then((response) => {
                    this.rows=response.data
                })
            },
            editRow(id){this.$router.push('/move/'+id)},
            addRecord(){this.$router.push('/move/-1')},
            deleteRecord(id){
                if (confirm("You really want delete this record?"))
                    backend.get('movedelete/'+id)
            }
        },
        async mounted() {
            await this.loadData()
            await backend.get('movingsize').then((response) => {
                this.total=parseInt(response.data[0].cnt)
            })

        }
    }
</script>

<style scoped>
    .container{
        width: 800px;
    }
    .goods-img{
        width: 60px; height: 60px;
    }
</style>