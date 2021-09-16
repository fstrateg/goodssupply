<template>
    <div v-if="record">id: {{record.id}}</div>
    <p>test</p>
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
        name: "Good",
        data() {
            return {
                record: {
                    id: -1
                }
            }
        },
        async created() {
            var id = this.$route.params['id'];
            this.record.id=id
            debugger
            await inst.get('good/'+id).then((response) => {
                if (response.data.length>0)
                    this.record=response.data[0];
                else
                {
                    this.record.id=-1
                }
            });
            console.log(this.record)
        }
    }

</script>

<style scoped>

</style>