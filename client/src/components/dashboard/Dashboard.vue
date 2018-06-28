<template lang="pug">
    v-content
        brand-header
        v-container(grid-list-md)
            draggable(v-model='cards', :options='draggableOptions', @change='reorderCards', element='v-layout').wrap
                template(v-for='card in cards')
                    led-card(v-if='card.type === "led"', :parentNamespace='namespace', :id='card.id', :title='card.title')
                    sensor-card(v-else-if='card.type === "sensor"', :parentNamespace='namespace', :id='card.id', :title='card.title')
</template>

<script>
import draggable from 'vuedraggable';
import { mapActions } from 'vuex';
import BrandHeader from './header/BrandHeader.vue';
import { LedCard, SensorCard } from './cards';

export default {
    name: 'Dashboard',
    components: {
        BrandHeader,
        draggable,
        LedCard,
        SensorCard,
    },
    data () {
        return {
            optionsMode: false,
            id: 'dashboard',
        };
    },
    computed: {
        namespace () { return this.id; },
        cards: {
            get () { return this.$store.getters[`${this.namespace}/cards`]; },
            set () { }, // handled by reorderCards method
        },
        draggableOptions () {
            return {
                chosenClass: 'draggable-chosen',
                ghostClass: 'draggable-ghost',
                disabled: !this.optionsMode,
                handle: 'h1.card-title',
            };
        },
    },
    watch: {
        optionsMode (enabled) {
            // sets cursor on dragdrop handle to show whether it can be grabbed
            this.$el.querySelector('.container')
                .style
                .setProperty(
                    '--card-title-cursor',
                    enabled ? 'grab' : 'default'
                );
        },
    },
    created () {
        this.$store.dispatch(`${this.namespace}/$init`);
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
@import "Assets/elevations.scss";
@import "Assets/transitions.scss";

/* default value for card-title-cursor */
div.container {
    --card-title-cursor: default;
}

* /deep/ .card-title {
/* vuetify headline class */
    font-size: 24px !important;
    font-weight: 400;
    line-height: 32px !important;
    letter-spacing: normal !important;
/* vuetify headline class end */
    cursor: var(--card-title-cursor);
    user-select: none;
}

* /deep/ .card {
    will-change: box-shadow, opacity;
    transition: box-shadow 0.28s map-get($transitions, fast-out-slow-in), // from Vuetify(v1.0.19)/src/stylus/settings/_elevations.styl
                opacity $primary-transition;
}

.draggable-chosen /deep/ .card {
    @include elevation(10);
}

.draggable-ghost /deep/ .card {
    opacity: 0.666;
}
</style>
