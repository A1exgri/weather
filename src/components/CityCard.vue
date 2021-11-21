<template>
    <div class="card" v-if="weather">
        <h2 v-if="index == 0">{{ capitalizeFirstLetter(city.name) }}, {{ weather.country }}</h2>
        <h2 v-else>{{ capitalizeFirstLetter(city.name) }}</h2>
        <p v-if="index == 0" class="card__city">Your current location</p>
        <p v-else class="card__city">{{ weather.country }}</p>
        <div class="card__table-item">
            <span>Weather</span>
            <span>{{ weather.weather }}</span>
        </div>
        <div class="card__table-item">
            <span>Temperature</span>
            <span>{{ weather.temp }} &deg;C</span>
        </div>
        <div class="card__table-item">
            <span>Humidity</span>
            <span>{{ weather.humidity }} %</span>
        </div>
        <div class="action-btns">
            <button class="btn" @click="cityRemove(city.name)">remove</button>
            <button class="btn" @click="getWeather(city.name)">reload</button>
        </div>
        <div class="card__time">{{ ago }}</div>
    </div>
</template>

<script>

import weatherApi from "@/api/weather";
import moment from "moment";

export default {
    name: 'CityCard',
    props: {
        index: {
            type: Number
        },
        city: {
            type: Object,
            required: true
        },
        removeCity: {
            type: Function
        },
    },
    data() {
        return {
            weather: null,
            ago: null
        }
    },
    mounted() {
        this.getWeather(this.city.name)
        setInterval(() => {
            this.ago = moment(this.city.startTime).fromNow();
        }, 1000)
    },
    methods: {
        cityRemove(name) {
            this.removeCity({name})
        },
        getWeather(name) {
            weatherApi.getCityWeather({name})
                .then(res => {
                    this.weather = {
                        name: res.data.name,
                        country: res.data.sys.country,
                        temp: res.data.main.temp,
                        weather: res.data.weather[0].main,
                        humidity: res.data.main.humidity
                    }
                })
        },
        capitalizeFirstLetter(name) {
            return name.charAt(0).toUpperCase() + name.slice(1);
        },
    },
}
</script>

<style lang="scss">
.card {
    position: relative;
    background: #fff;
    box-shadow: 0px 2px 10px rgba(10, 10, 10, 0.25);
    border-radius: 6px;
    padding: 24px;
    height: 393px;
    margin-right: 20px;
    margin-left: 20px;
    margin-bottom: 40px;

    &__city {
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 24px;
        color: #1B1B1B;
        padding-bottom: 24px;
    }

    &__table-item {
        display: flex;
        justify-content: space-between;
        padding: 16px 0 12px;
        border-bottom: 1px solid rgba(196, 196, 196, 1);
    }

    &__time {
        width: 100%;
        padding-top: 8px;
        text-align: right;
        color: #A8A8A8;
    }
}
</style>

