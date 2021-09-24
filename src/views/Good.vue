<template>
    <div v-if="record.id">id: {{record.id}}</div>
    <div class="mx-auto p-3 cnt">
        <div v-if="errMsg" class="alert alert-warning" role="alert">{{errMsg}}</div>
            <form @submit.prevent="SaveRecord">
                <fieldset class="row">
                    <div class="mb-3 col-12">
                        <label for="name" class="form-label">Product:</label>
                        <input id="name" class="form-control" v-model="record.name" required>
                    </div>

                    <div class="mb-3 col-12">
                        <label for="qua" class="form-label">Prep def:</label>
                        <input id="qua" class="form-control" type="number" step="any" v-model="record.prep_defs" required>
                    </div>

                    <div class="mb-3 col-12">
                        <label for="img" class="form-label">Image index:</label>
                        <input id="img" class="form-control" type="number" v-model="record.img_id" required>
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



    export default {
        name: "Good",
        data() {
            return {
                record: {
                    id: undefined,
                    name: '',
                    prep_defs: 0,
                    img_id: 0,
                },
                hasError: '',
                errMsg: '',
            }
        },
        methods:{
            async SaveRecord()
            {
                var values=this.record;
                var err
                await backend.post('savegoods', values)
                    .then(() => {
                    this.$router.push('/goods');
                    })
                    .catch((res) => { err = res });
                if (err && err.response.status==400) this.errMsg = err.response.data.message
                
            },
        },
        async created() {
            var id = this.$route.params['id'];
            await backend.get('good/'+id).then((response) => {
                if (response.data.length>0)
                    this.record=response.data[0];
            });
        }
    }

</script>

<style scoped>
    .cnt {
        max-width: 300px;
    }
    .b-img{position: relative;
        top: 5px;}
</style>