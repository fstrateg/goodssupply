module.exports = {
    devServer: {
        proxy: 'http://localhost:5000/api',
        https: false
    }
}