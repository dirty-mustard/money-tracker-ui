<template>
    <div id="app">

        <div v-if="$auth.ready()">
            <navbar-component name="Money Tracker"></navbar-component>

            <b-container class="mt-3">

                <router-view></router-view>

            </b-container>
        </div>

        <div v-if="!$auth.ready()">
            <div style="text-align:center; padding-top:50px;">
                Loading site...
            </div>
        </div>

    </div>
</template>

<script>

    import NavbarComponent from './layout/navbar-component.vue';
    import Dashboard from './modules/dashboard/dashboard';

    export default {
        name: 'app',
        components: {
            NavbarComponent,
            Dashboard
        },
        data() {
            return {
                name: "Jeroen"
            }
        }
    }
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Lato:300,400,700');
    @import url('https://fonts.googleapis.com/css?family=Dosis:300');
    @import "~vue-multiselect/dist/vue-multiselect.min.css";

    #app {
        font-family: 'Lato', sans-serif;
        font-weight: 300;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        border-radius: 2px;
    }

    h1, h2, h3 {
        font-family: 'Dosis', sans-serif;
        font-weight: 300;
    }

    .card {
        background-color: rgb(255, 255, 255);
        border: 1px solid rgb(222, 224, 225)
    }

    input.form-control {
        padding: 8px;
    }
</style>
