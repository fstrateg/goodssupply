const axios=require('axios')

export const backend=axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        accept: 'application/json'
    }
})