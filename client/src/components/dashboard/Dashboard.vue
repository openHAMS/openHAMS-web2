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
        SensorCard,
    },
    data () {
        return {
            namespace: 'dashboard',
            optionsMode: false,
        };
    },
    computed: {
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
            this.$el.style
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

@import "Assets/elevations.scss";

* /deep/ .card {
    will-change: box-shadow, opacity;
    transition: box-shadow 280ms cubic-bezier(.4, 0, .2, 1),
                opacity 0.2s cubic-bezier(.25,.8,.50,1);
}

.draggable-chosen /deep/ .card {
    @include elevation(10);
}

.draggable-ghost /deep/ .card {
    opacity: 0.666;
}
</style>
