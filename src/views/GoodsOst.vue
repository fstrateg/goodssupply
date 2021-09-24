<template>
    <h1>Remains of goods on Prep</h1>
    <div class="mx-auto p-3 col-xl-6">
    <table class="table table-striped table-hover">
        <thead>
        <tr>
            <th>
                Picture
            </th>
            <th class="text-start">
                Name
            </th>
            <th>
                Quantity
            </th>
        </tr>

        </thead>
        <tbody>
        <tr v-for="rw in remains">
            <td><img class="goods-img" :src="'http://localhost:3000/images/products/'+rw.img_id+'.png'"></td>
            <td class="text-start">{{rw.name}}</td>
            <td>{{rw.ost}}</td>
        </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="2" class="text-start"><b>Total:</b></td>
                <td><b>{{total}}</b></td>
            </tr>
        </tfoot>
    </table>
    </div>
</template>

<script>
    import {backend} from "../backend";

    export default {
        name: "GoodsOst",
        data() {
            return{
                remains:[],
                total:10
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
    .goods-img{
        width: 60px; height: 60px;
    }
</style>