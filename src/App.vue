<template>
    <div id="app">
        <WorkCalendar />
    </div>
</template>

<script>
    import WorkCalendar from './components/WorkCalendar.vue';

    export default {
        name: 'App',
        components: {
            WorkCalendar
        },
        data() {
            return {
            };
        },
        methods: {

        }
    };
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        text-align: center;
        margin-top: 60px;
    }
</style>
