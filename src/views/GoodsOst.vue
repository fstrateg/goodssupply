<template>
    <h1>Remains of goods on Prep</h1>
    <div class="container mx-auto p-3 col-xl-6">
        <el-table style="margin: auto" show-summary :data="remains">
            <el-table-column
                    label="Picture"
                    width="75"
            >
                <template v-slot="scope">
                    <img class="goods-img" :src="getImage(scope.row.img_id)">
                </template>
            </el-table-column>
            <el-table-column
                    label="Name"
                    prop="name"
                    width="400"
            ></el-table-column>
                <el-table-column
                        label="Remains"
                        prop="ost"
                        width="90"
                ></el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {backend} from "../backend";
    const {config} =require('../config')

    export default {
        name: "GoodsOst",
        data() {
            return{
                remains:[],
                total:10
            }
        },
        methods:{
            getImage(image_id){
                return config.Image_url+'products/'+image_id+'.png'
            }
        },
        async mounted() {

            await backend.get('remains').then((response) => {
                this.remains=response.data
            })
            this.total=0
            for (let i = 0; i < this.remains.length; i++) {
                this.total += this.remains[i].ost;
            }
            console.log(this.total)
        }
    }
</script>

<style scoped>
    .container{
        width: 600px;
    }
</style>