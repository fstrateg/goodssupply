<template>
    <div class="goods">
        <h1>This is an goods directory</h1>
    </div>
    <button class="btn btn-primary" @click="AddProduct">Add product</button>
    <div class="mx-auto p-3">
        <table  class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Prep</th>
                    <th>Command</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in goods">
                    <td><img class="goods-img" :src="'http://localhost:3000/images/products/'+item.img_id+'.png'" alt="http://localhost:3000/images/products/0.png"></td>
                    <td>{{item.name}}</td>
                    <td>{{item.prep_defs}}</td>
                    <td><div class="btn-group">
                        <router-link class="btn btn-sm" tag="button" :to="'/good/'+item.id">
                            <span class="btn material-icons">edit</span></router-link>
                        <span class="btn material-icons">delete</span></div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>


</template>

<script>
    const axios=require('axios')
    const inst=axios.create({
        baseURL: 'http://localhost:8080',
        headers: {
            accept: 'application/json'
        }
    })

    export default {
        name: "Goods",
        data() {
            return{
                goods:[]
            }
        },
        methods:{
            AddProduct()
            {
                this.$router.push('/good/-1')
            }
        },
        async mounted() {

            await inst.get('goods').then((response) => {
                this.goods=response.data
                //console.log(response.data)
            })
        }
    }


</script>

<style scoped>
    .goods-img{
        width: 60px; height: 60px;
    }

    .material-icons{
        color: #3b6c9d;
    }

    .material-icons {
        font-family: 'Material Icons';
        font-weight: normal;
        font-style: normal;
        font-size: 24px;  /* Preferred icon size */
        display: inline-block;
        line-height: 1;
        text-transform: none;
        letter-spacing: normal;
        word-wrap: normal;
        white-space: nowrap;
        direction: ltr;

        /* Support for all WebKit browsers. */
        -webkit-font-smoothing: antialiased;
        /* Support for Safari and Chrome. */
        text-rendering: optimizeLegibility;

        /* Support for Firefox. */
        -moz-osx-font-smoothing: grayscale;

        /* Support for IE. */
        font-feature-settings: 'liga';
    }
</style>