<template>
    <div class="container" v-if="record">test
    <div v-if="record.id">id: {{record.id}}</div>
        <form @submit.prevent="SaveRecord" class="row">
            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                <label for="name" class="form-label">Product:</label>
                <select id="name" class="form-control" v-model="record.goods_id">
                    <option v-for="option in sprgoods" v-bind:value="option.id">
                        {{ option.name }}
                    </option>
                    <option value="5" text="Test"></option>
                </select>
            </div>
            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                <label class="form-label">Created:</label>
                <el-date-picker style="display: flex" v-model="record.dat"
                                type="date"
                                format="DD.MM.YYYY"
                                placeholder="Pick a day"
                >
                </el-date-picker>

            </div>

            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                <label for="qua" class="form-label">Quantity:</label>
                <input id="qua" class="form-control" type="text" :value="record.qua" required>
            </div>
            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                <label for="cost" class="form-label">Cost:</label>
                <input id="cost" class="form-control" type="number" :value="record.cost">
            </div>

            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                <label for="fba" class="form-label">Fba fee:</label>
                <input id="fba" class="form-control" type="number" step="any" :value="record.fba">
            </div>

            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                <label for="firstcost" class="form-label">First cost:</label>
                <input id="firstcost" class="form-control" type="number" :value="record.price" readonly>
            </div>

            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                <label for="profit" class="form-label">Profit:</label>
                <input id="profit" class="form-control" type="number" :value="record.profit" readonly>
            </div>
            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                <label for="roi" class="form-label">ROI%:</label>
                <input id="roi" class="form-control" type="number" :value="record.roi" readonly>
            </div>
            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                <label for="total" class="form-label">Total Profit:</label>
                <input id="total" class="form-control" type="number" :value="record.profit_total" readonly>
            </div>

            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                <label for="status" class="form-label">Status:</label>
                <select id="status" class="form-control" v-model="record.status_id">
                    <option v-for="option in sprstatus" v-bind:value="option.id">
                        {{ option.status }}
                    </option>
                    <option value="5" text="Test"></option>
                </select>
            </div>
            <div class="col mt-3">
                <button type="submit" class="btn btn-primary">Сохранить</button>
            </div>

        </form>
    </div>
</template>

<script>
    import { ElDatePicker } from 'element-plus'
    import 'element-plus/dist/index.css'

    const axios=require('axios')

    const inst=axios.create({
        baseURL: 'http://localhost:8080',
        headers: {
            accept: 'application/json'
        }
    })
    export default {
        name: "Supply",
        data() {
            return{
                record:null,
                sprgoods:null,
                sprstatus:null,
            }
        },
        components:
            {
                ElDatePicker,
            },
        async created(){
            var id=this.$route.params['id'];
            console.log();
            await inst.get('supplybyid/'+id).then((response) => {
                if (response.data.length>0)
                    this.record=response.data[0];
            });
            await inst.get('sprgoods').then((response) => {
                if (response.data.length > 0)
                    this.sprgoods = response.data;
            });
            await inst.get('sprstatus').then((response) => {
                if (response.data.length>0)
                    this.sprstatus = response.data;
            })

        },
        methods:{
            SaveRecord()
            {
                //debugger
                var values=JSON.stringify(this.record);

                inst.post('savesupply', values).then((response)=>
                {
                    this.$router.push('/');
                }).catch((res)=>console.log(res));
                //console.log(values);

            }
        },

    }


</script>

<style scoped>
    .form-label{
        display: flex;
    }
</style>