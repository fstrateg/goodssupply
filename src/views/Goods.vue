<template>
    <div class="goods">
        <h1>This is an goods directory</h1>
    </div>
    <el-button type="primary" icon="el-icon-plus" @click="addProduct">Add record</el-button>
    <div class="container mx-auto p-3 col-xl-6">
    <el-table style="margin: auto" :data="page">
        <el-table-column
                label="Picture"
                width="75"
        >
            <template v-slot="scope">
                <img class="goods-img" :src="'http://localhost:3000/images/products/'+scope.row.img_id+'.png'">
            </template>
        </el-table-column>
        <el-table-column
                prop="name"
                label="Name"
                width="200">
        </el-table-column>
        <el-table-column
                prop="prep_defs"
                label="Prep"
                width="120">
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

    export default {
        name: "Goods",
        data() {
            return{
                goods:[],
                page:[],
                pageSize: 10,
                curPage:1,
                total: 0

            }
        },
        methods:{
            addProduct()
            {
                this.$router.push('/good/-1')
            },
            editRow(id){this.$router.push('/good/'+id)},
            handleCurrentChange(cpage){this.curPage=cpage;this.getPage()},
            getPage()
            {
                let start=this.pageSize*(this.curPage-1);
                let cnt=start+this.pageSize
                this.page=this.goods.slice(start,cnt)
            }
        },
        async mounted() {

            await backend.get('goods').then((response) => {
                this.goods=response.data
            })
            this.total=this.goods.length
            this.getPage()
        },
    }


</script>

<style scoped>
    .goods-img{
        width: 60px; height: 60px;
    }
    .container{
        width: 600px;
    }

</style>