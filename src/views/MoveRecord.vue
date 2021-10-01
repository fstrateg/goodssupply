<template>
    <h3>{{getCaption()}}</h3>
    <div class="container cnt" v-if="record">
    <form @submit.prevent="SaveRecord">
        <fieldset>
            <div class="row">
            <div class="mb-3 col">
                <label class="form-label">Date:</label>
                <el-date-picker style="display: flex" v-model="record.dat"
                                type="date"
                                format="DD.MM.YYYY"
                                value-format="YYYY-MM-DD"
                                placeholder="Pick a day"
                >
                </el-date-picker>
            </div>
            </div>
            <div class="row">
            <div class="mb-3 col">
                <label for="name" class="form-label">Product:</label>
                <select id="name" class="form-control" v-model="record.goods_id">
                    <option v-for="option in sprgoods" :value="option.id">
                        {{ option.name }}
                    </option>
                </select>
            </div>
            </div>
            <div class="row">
                <div class="mb-3 col">
                    <label for="qua" class="form-label">Quantity:</label>
                    <input id="qua" style="text-align: right" class="form-control" type="number" v-model="record.qua" required>
                </div>
            </div>
            <div class="row">
            <div class="mb-3 col">
                <label for="note" class="form-label">Remark:</label>
                <textarea id="note" maxlength="50" class="form-control" v-model="record.note" />
            </div>
            </div>
        </fieldset>
        <div class="row">
            <div class="col-12 mt-3">
                <button type="submit" class="btn btn-primary">
                    <span class="material-icons b-img">save</span>
                    <span> Save</span>
                </button>
            </div>
        </div>
    </form>
    </div>
</template>

<script>
    import {backend} from "../backend";
    import { ElDatePicker } from 'element-plus'
    import 'element-plus/dist/index.css'
    import moment from "moment";

    export default {
        name: "MoveRecord",
        data()
        {
            return{
                record:{
                    id:NaN,
                    goods_id:0,
                    qua:0,
                    note:'',
                },
                sprgoods:[],
            }
        },
        components:
            {
                ElDatePicker,
            },
        methods:
            {
                getCaption()
                {
                    this.record.id=parseInt(this.$route.params['id'])
                    if (!isNaN(this.record.id))
                        if (this.record.id>=0) return "Edit record"
                    this.record.dat=moment().format()
                    return 'Add record'
                },
                SaveRecord()
                {
                    backend.post('savemoving', this.record).then(()=>
                    {
                        this.$router.push('/moving');
                    }).catch((res)=>console.log(res));
                }

            },
        async created() {
            let id = this.$route.params['id'];
            await backend.get('move/'+id).then((response) => {
                if (response.data.length>0)
                    this.record=response.data[0];
            });
            await backend.get('sprgoods').then((response) => {
                if (response.data.length > 0)
                    this.sprgoods = response.data;
            });
        }
    }
</script>

<style scoped>
    .btn{vertical-align: middle}
    .cnt{max-width: 300px;}
</style>