<template>
    <h1>Moving of goods on Prep</h1>
    <div class="mx-auto p-3 col-xl-6">
        <button class="btn btn-primary" @click="AddRecord">Add record</button>
        <table class="table table-striped table-hover">
            <thead>
            <tr>
                <th>Picture</th>
                <th>Date</th>
                <th class="text-start">Name</th>
                <th>Quantity</th>
                <th>Note</th>
                <th>Command</th>
            </tr>

            </thead>
            <tbody>
            <tr v-for="rw in rows">
                <td><img class="goods-img" :src="getImage(rw.img_id)"></td>
                <td>{{format_date(rw.dat)}}</td>
                <td class="text-start">{{rw.name}}</td>
                <td>{{rw.qua}}</td>
                <td>{{rw.note}}</td>
                <td><div class="btn-group">
                    <router-link class="btn btn-sm" tag="button" :to="'/move/'+rw.id">
                        <span class="btn material-icons">edit</span></router-link>
                    <span class="btn material-icons" v-on:click="DeleteRecord(rw.id)">delete</span></div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import {backend} from "../backend";
    const moment=require('moment')
    const {config} =require('../config')

    export default {
        name: "Moving",
        data() {
            return{
                rows:[]
            }
        },
        methods:{
            format_date(value){
                if (value) {
                    return moment(String(value)).format('DD.MM.YYYY')
                    //return new Date(value).toLocaleString()
                }
            },
            AddRecord(){this.$router.push('/move/-1')},
            DeleteRecord(id){
                if (confirm("You really want delete this record?"))
                    backend.get('movedelete/'+id)
            },
            getImage(image_id){
                debugger
                return config.Image_url+'products/'+image_id+'.png'
            }
        },
        async mounted() {

            await backend.get('moving').then((response) => {
                this.rows=response.data
            })
        }
    }
</script>