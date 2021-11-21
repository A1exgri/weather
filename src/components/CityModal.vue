<template>
    <div class="city-modal__wrapper" @click="cancelModal">
        <div class="city-modal" @click.stop>
            <h2>Choose a city</h2>
            <p class="text-desc">To find city start typing and pick one from the suggestions</p>
            <input type="text"
                   :class="{ 'search-error': $v.searchValue.$error }"
                   :value="searchValue"
                   class="city-modal__search"
                   @input="inputValue($event.target.value)"
                   placeholder="Search city"
                   @keyup.enter="onEnter"
            >
            <div class="error" v-if="!$v.searchValue.required">Field is required</div>
            <div class="error" v-if="!$v.searchValue.minLength">City name must have at least {{$v.searchValue.$params.minLength.min}} letters.</div>
            <div class="error" v-if="!$v.searchValue.alpha">City name must contain letters only.</div>
            <div class="error" v-if="isErrorName">There is no such city.</div>
            <div class="action-btns">
                <button class="btn" :disabled="searchValue==''" @click="clearInput">clear</button>
                <div class="action-btns__right">
                    <button class="btn" @click="cancelModal">cancel</button>
                    <button class="btn" :disabled="isDisabled" @click="cityAdd">add</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { required, minLength, alpha } from 'vuelidate/lib/validators'
import weatherApi from "@/api/weather";
export default {
    name: "CityForm",
    props: ['addCity', 'showModal'],
    data() {
        return {
            searchValue: '',
            isErrorName: false
        }
    },
    validations: {
        searchValue: {
            required,
            minLength: minLength(2),
            alpha
        },
    },
    methods: {
        inputValue(value) {
            this.searchValue = value
            this.$v.searchValue.$touch()
            this.isErrorName = false
        },
        cancelModal(){
            this.showModal({
                isShowModal: false
            })
        },
        cityAdd() {
            let name = this.searchValue
            weatherApi.getCityWeather({name}).then(() => {
                this.isErrorName = false
                this.addCity({
                    name: this.searchValue,
                    startTime: new Date()
                })
            })
            .catch(()=>{
                this.isErrorName = true
            })
        },
        onEnter() {
            this.cityAdd()
        },
        clearInput() {
            this.searchValue = ''
        },

    },
    computed: {
        isDisabled() {
            return (!this.$v.searchValue.required || !this.$v.searchValue.minLength)
        }
    }
}
</script>

<style lang="scss">
    .city-modal {
        background: #fff;
        box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.14), 0px 6px 30px rgba(0, 0, 0, 0.12), 0px 8px 10px rgba(0, 0, 0, 0.2);
        border-radius: 4px;
        padding: 24px;
        height: 397px;
        width: 751px;
        position: relative;

        &__wrapper {
            background: rgba(11, 11, 11, 0.5);
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &__search {
            margin-top: 50px;
            width: 100%;
            outline: 0;
            border: 0;
            padding: 16px 0;
            border-bottom: 1px solid #C4C4C4;
            font-style: normal;
            font-weight: 500;
            font-size: 24px;
            line-height: 24px;
            &.search-error {
                border-bottom: 1px solid red;
            }
        }
        .error {
            padding-top: 5px;
            color: red;
        }
    }
</style>