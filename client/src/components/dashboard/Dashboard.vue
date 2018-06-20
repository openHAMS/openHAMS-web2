<template lang="pug">
v-container(grid-list-md)
    draggable(v-model='cards', :options='draggableOptions', @change='reorderCards', element='v-layout').wrap
        template(v-for='card in cards')
            led-card(v-if='card.type === "led"', :id='card.id', :title='card.title')
            sensor-card(v-else-if='card.type === "sensor"', :title='card.title')
</template>

<script>
import draggable from 'vuedraggable';
import { mapActions } from 'vuex';
import LedCard from './cards/LedCard.vue';
import SensorCard from './cards/SensorCard.vue';

export default {
    name: 'Dashboard',
    components: {
        draggable,
        LedCard,
        SensorCard
    },
    data () {
        return {
            namespace: 'dashboard',
        };
    },
    computed: {
        cards: {
            get () { return this.$store.getters[`${this.namespace}/cards`]; },
            set () { } // handled by reorderCards method
        },
        draggableOptions () {
            return {
                handle: 'h1.card-title',
            };
        },
    },
    created () {
        this.$store.dispatch(`${this.namespace}/init`);
    },
    methods: {
        ...mapActions({
            reorderCards (dispatch, { moved }) {
                dispatch(`${this.namespace}/reorderCards`, moved);
            },
        }),
    },
};
</script>

<style lang="scss" scoped>

* /deep/ .card-title {
/* vuetify headline class*/
    font-size: 24px !important;
    font-weight: 400;
    line-height: 32px !important;
    letter-spacing: normal !important;
/* vuetify headline class end */
    user-select: none;
}
</style>
