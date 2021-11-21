import axios from 'axios'
import {APPID, SERVER_URI} from '@/config/dev.env'

const getCityWeather = city => {
    return axios.get(`${SERVER_URI}?units=metric&lang=en&APPID=${APPID}&q=${city.name}`)
}

export default {
    getCityWeather
}