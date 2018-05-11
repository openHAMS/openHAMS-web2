<template lang="pug">
v-container(grid-list-md)
    v-layout(wrap)
        template(v-for='card in cards')
            led-card(        v-if='card.type === "led"',    :title='card.title')
            sensor-card(v-else-if='card.type === "sensor"', :title='card.title')
</template>

<script>
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
            cards: [
                { type: 'sensor', title: 'Temperature' },
                { type: 'sensor', title: 'Pressure' },
                { type: 'led',    title: 'asdasd' },
            ]
        };
    }
};
</script>

<style scoped>
</style>
