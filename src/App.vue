<template>
  <div id="app" class="weather">
      <div class="container">
          <h1 class="main-title text-center">World Weather</h1>
          <p class="text-desc text-center">Watch weather in your current location</p>

          <div class="row">
              <div v-for="(city, index) in cities" :key="city.name" :class="[index == 0 ? 'col-12' : 'col-3']">
                  <city-card
                      :index="index"
                      :city="city"
                      :removeCity="removeCity"
                      :addLocalStorage="addLocalStorage"
                  ></city-card>
              </div>
          <button class="btn-circle" @click="showModal({isShowModal:'true'})">+</button>
          </div>

          <CityModal
              v-if="isShowModal"
              :showModal="showModal"
              :addCity="addCity"
          ></CityModal>
      </div>

  </div>
</template>

<script>
import CityCard from "@/components/CityCard";
import CityModal from "@/components/CityModal";

export default {
  name: 'App',
  components: {
    CityCard,
    CityModal
  },
    data() {
      return {
          cities: [
            {
              name: 'Moscow', startTime: '2021-11-21T05:42:13.526Z'
            },
            {
              name: 'Perm', startTime: '2021-11-21T05:42:13.526Z'
            },
            {
              name: 'Penza', startTime: '2021-11-21T05:42:13.526Z'
            }
          ],
          isShowModal: false
      }
    },
    mounted() {
      if(localStorage.getItem("allCities")) {
          this.cities = JSON.parse(localStorage.getItem("allCities"))
      }
    },
    methods: {
        addCity (data) {
            this.cities.push(data)
            this.addLocalStorage()
            this.isShowModal = false
        },
        removeCity(data) {
            this.cities = this.cities.filter(c => c.name !== data.name)
            this.addLocalStorage()
        },
        showModal(data){
            this.isShowModal = data.isShowModal
            if(this.isShowModal) document.body.style.overflow = 'hidden'
            else document.body.style.overflow = 'auto'
        },
        addLocalStorage() {
            localStorage.setItem("allCities", JSON.stringify(this.cities));
        }
    },

}
</script>

<style lang="scss">
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Lato;
    }
    .container {
        max-width: 1520px;
        margin: 0 auto;
    }
    .row {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        margin-right: -20px;
        margin-left: -20px;
    }
    .col-12 {
        width: 100%;
        margin-right: 20px;
        margin-left: 20px;
        padding-left:20%;
        padding-right: 20%;

        .card {
            margin-bottom: 80px;
        }
    }
    .col-3 {
        -ms-flex: 0 0 25%;
        flex: 0 0 25%;
        max-width: 25%;
    }
    .text-center {
        text-align: center;
    }
    h2 {
        font-style: normal;
        font-weight: bold;
        font-size: 32px;
        line-height: 38px;
    }
    .btn {
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        line-height: 24px;
        color: rgba(155, 81, 224, 1);
        text-transform: uppercase;
        border:0;
        background: transparent;
        cursor: pointer;
        transition: all ease .5s;
        &:hover {
            transform: scale(0.95);
        }

        &:disabled {
            transform: scale(1);
            color:rgba(193, 193, 193, 1);
            background: transparent;
        }
        &-circle {
            width: 56px;
            height: 56px;
            border-radius: 50px;
            background: #9B51E0;
            box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.2);
            color: #fff;
            border: 0;
            font-size: 26px;
            position: fixed;
            bottom: 34px;
            right: 45px;
            cursor: pointer;
        }
    }
    .main-title {
        font-style: normal;
        font-weight: 300;
        font-size: 70px;
        line-height: 80px;
        color: #1B1B1B;
        padding: 24px 0 16px;
    }
    .text-desc {
        font-style: normal;
        font-weight: normal;
        font-size: 24px;
        line-height: 24px;
        color: #767676;
        padding: 16px 0;
    }
    .action-btns {
        position: absolute;
        bottom: 24px;
        left: 24px;
        right: 24px;
        display: flex;
        justify-content: space-between;
        &__right button:first-child{
            margin-right: 31px;
        }
    }

    @media (max-width: 1580px) {
        .container {
            max-width: 1140px;
        }
    }

    @media (max-width: 1199px) {
        .container {
            max-width: 960px;
        }
    }

    @media (max-width: 992px) {
        .container {
            max-width: 720px;
        }
        .col-3 {
            -ms-flex: 0 0 33%;
            flex: 0 0 33%;
            max-width: 33%;
        }
    }

    @media (max-width: 768px) {
        .container {
            max-width: 540px;
        }
        .col-3 {
            -ms-flex: 0 0 50%;
            flex: 0 0 50%;
            max-width: 50%;
        }
    }

    @media (max-width: 576px) {
        .container {
            width: 100%;
            padding-right: 15px;
            padding-left: 15px;
            margin-right: auto;
            margin-left: auto;
        }
        .col-12 {
            flex: 0 0 100%;
            max-width: 100%;
            padding: 0;
            margin: 0;
        }
        .col-12 .card, .col-3 .card{
            margin-bottom: 20px;
        }
        .col-3 {
            -ms-flex: 0 0 100%;
            flex: 0 0 100%;
            max-width: 100%;
        }
    }
</style>
