<template>
    <div class="container" v-if="record">
    <div v-if="record.id">id: {{record.id}}</div>
        <form @submit.prevent="SaveRecord">
            <fieldset class="row">
            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                <label for="name" class="form-label">Product:</label>
                <select id="name" class="form-control" v-model="record.goods_id">
                    <option v-for="option in sprgoods" :value="option.id">
                        {{ option.name }}
                    </option>
                </select>
            </div>
            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                <label class="form-label">Created:</label>
                <el-date-picker style="display: flex" v-model="record.dat"
                                type="date"
                                format="DD.MM.YYYY"
                                value-format="YYYY-MM-DD"
                                placeholder="Pick a day"
                >
                </el-date-picker>

            </div>

            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                <label for="qua" class="form-label">Quantity:</label>
                <input id="qua" class="form-control" type="text" @change="calculate" v-model="record.qua" required>
            </div>
            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                <label for="cost" class="form-label">Cost:</label>
                <input id="cost" class="form-control" type="number" @change="calculate" v-model="record.cost">
            </div>
                <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                    <label for="prep" class="form-label">Prep:</label>
                    <input id="prep" class="form-control" type="number" @change="calculate" step="any" v-model="record.prep">
                </div>
                <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                    <label for="ship" class="form-label">Ship to Amazon:</label>
                    <input id="ship" class="form-control" type="number" @change="calculate" v-model="record.ship">
                </div>
            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                <label for="fba" class="form-label">Fba fee:</label>
                <input id="fba" class="form-control" type="number" @change="calculate" step="any" v-model="record.fba">
            </div>

            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                <label for="firstcost" class="form-label">First cost:</label>
                <input id="firstcost" class="form-control" type="number" step="any"  v-model="record.price" readonly>
            </div>

                <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                    <label for="salles_price" class="form-label">Selling price:</label>
                    <input id="salles_price" class="form-control" type="number" @change="calculate" step="any"  v-model="record.salles_price">
                </div>

            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                <label for="profit" class="form-label">Profit:</label>
                <input id="profit" class="form-control" type="number" v-model="record.profit" readonly>
            </div>
            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                <label for="roi" class="form-label">ROI%:</label>
                <input id="roi" class="form-control" type="number" v-model="record.roi" readonly>
            </div>
            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                <label for="total" class="form-label">Total Profit:</label>
                <input id="total" class="form-control" type="number" v-model="record.profit_total" readonly>
            </div>

            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                <label for="status" class="form-label">Status:</label>
                <select id="status" class="form-control" v-model="record.status_id">
                    <option v-for="option in sprstatus" :value="option.id">
                        {{ option.status }}
                    </option>
                </select>
            </div>
            </fieldset>
            <div class="row">
                <div class="col mt-3">
                    <button type="submit" class="btn btn-primary">Сохранить</button>
                </div>
            </div>

        </form>
    </div>
</template>

<script>
    import { ElDatePicker } from 'element-plus'
    import 'element-plus/dist/index.css'
    import {backend} from "../backend";
    import moment from 'moment'

    export default {
        name: "Supply",
        data() {
            return{
                record: {
                    id: undefined,
                    dat: '',
                    qua: 0,
                    cost: 0,
                    fba: 0,
                    price: 0,
                    roi: 0,
                    profit_total: 0,
                    status_id: 0,
                    prep: 0,
                    ship: 0,
                    salles_price: 0,
                    profit: 0,
                },
                sprgoods:null,
                sprstatus:null,
            }
        },
        components:
            {
                ElDatePicker,
            },
        async created(){
            let id = this.$route.params['id']
            let oper = this.$route.query.oper;
            console.log(oper)
            await backend.get('supplybyid/'+id).then((response) => {
                if (response.data.length>0) {
                    this.record = response.data[0];
                    this.record.dat = moment(this.record.dat).format('YYYY-MM-DD')
                    if (oper == 'new') {
                        this.record.id = NaN
                        this.record.dat = this.record.dat = moment(moment.now()).format('YYYY-MM-DD');

                    }
                }
                else
                {
                    this.record.dat=moment(moment.now()).format('YYYY-MM-DD');
                }
            });
            await backend.get('sprgoods').then((response) => {
                if (response.data.length > 0)
                    this.sprgoods = response.data;
            });
            await backend.get('sprstatus').then((response) => {
                if (response.data.length>0)
                    this.sprstatus = response.data;
            })

        },
        methods:{
            SaveRecord()
            {
                //debugger
                var values=this.record;

                backend.post('savesupply', values).then(()=>
                {
                    this.$router.push('/');
                }).catch((res)=>console.log(res));
                //console.log(values);

            },
            calculate: function() {

                let rw=this.record
                rw.price=rw.qua===0?0:Math.round((rw.cost/rw.qua+rw.prep+(rw.ship/rw.qua))*100)/100
                rw.profit=rw.salles_price-rw.fba-rw.price
                rw.profit_total=Math.round(rw.profit*rw.qua)
                rw.roi = rw.profit/rw.price
                rw.profit=Math.round(rw.profit*100)/100
                rw.roi=Math.round(rw.roi*10000)/100
            }
        },
        computed: {

            }
    }


</script>

<style scoped>
    .form-label{
        display: flex;
    }
</style>