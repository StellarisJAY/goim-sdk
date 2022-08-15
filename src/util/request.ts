import axios from 'axios'

const service = axios.create({
    baseURL: 'localhost:8000'
})

service.interceptors.request.use(function(config){
    let token = localStorage.getItem("goim_sdk_token")
    if (token != null && token != '') {
        config.headers = config.headers == null ? {} : config.headers
        config.headers['Authorization'] = token
    }
}, function(err){
    console.info(err)
})

service.interceptors.response.use(function(response){
    console.info(response.status)
})

export default service