const {config} =require('./config')

const axios=require('axios')

export const backend=axios.create({
    baseURL: config.Back_url+'api',
    headers: {
        accept: 'application/json'
    }
})