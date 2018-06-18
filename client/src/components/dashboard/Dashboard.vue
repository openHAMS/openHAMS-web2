<template lang="pug">
v-container(grid-list-md)
    v-layout(wrap)
        template(v-for='card in cards')
            led-card(v-if='card.type === "led"', :id='card.id', :title='card.title')
            sensor-card(v-else-if='card.type === "sensor"', :title='card.title')
</template>

<script>
import { mapGetters } from 'vuex';
import LedCard from './cards/LedCard.vue';
import SensorCard from './cards/SensorCard.vue';

export default {
    name: 'Dashboard',
    components: {
        LedCard,
        SensorCard
    },
    data () {
        return {
        };
    },
    computed: {
        ...mapGetters('dashboard', ['cards'])
    },
    methods: {
    },
};
</script>

<style scoped>
</style>
