<template>
    <h3>{{getCaption()}}</h3>
    {{record}}
    <div class="container" v-if="record">
    <form @submit.prevent="SaveRecord">
        <fieldset>
            <div class="row">
            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                <label class="form-label">Date:</label>
                <el-date-picker style="display: flex" v-model="record.dat"
                                type="date"
                                format="DD.MM.YYYY"
                                placeholder="Pick a day"
                >
                </el-date-picker>
            </div>
            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                <label for="name" class="form-label">Product:</label>
                <select id="name" class="form-control" v-model="record.goods_id">
                    <option v-for="option in sprgoods" :value="option.id">
                        {{ option.name }}
                    </option>
                </select>
            </div>
            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                <label for="qua" class="form-label">Quantity:</label>
                <input id="qua" class="form-control" type="number" v-model="record.qua" required>
            </div>
            </div>
            <div class="row">
            <div class="mb-3 col-lg-8 col-md-12">
                <label for="note" class="form-label">Image index:</label>
                <textarea id="note" class="form-control" v-model="record.note" />
            </div>
            </div>
        </fieldset>
        <div class="row">
            <div class="col-12 mt-3">
                <button type="submit" class="btn btn-primary"><span class="material-icons b-img">save</span><span> Save</span></button>
            </div>
        </div>
    </form>
    </div>
</template>

<script>
    import {backend} from "../backend";
    import { ElDatePicker } from 'element-plus'
    import 'element-plus/dist/index.css'

    export default {
        name: "MoveRecord",
        data()
        {
            return{
                record:{
                    id:NaN,
                    name:'',
                }
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
                    if (this.record.id!=NaN)
                        if (this.record.id>=0) return "Edit record"
                    return 'Add record'
                }
            },
        async created() {
            let id = this.$route.params['id'];
            await backend.get('move/'+id).then((response) => {
                if (response.data.length>0)
                    this.record=response.data[0];
            });
        }
    }
</script>

<style scoped>

</style>