<template lang="pug">
    v-content
        brand-header
            main-menu
                main-menu-item(prepend-icon='brightness_medium', @click='toggleTheme') Night mode
                    v-switch(slot='action', :input-value='theme', true-value='dark', false-value='light')
                main-menu-item(prepend-icon='widgets', @click='editMode = !editMode') Edit cards
                    v-switch(slot='action', :input-value='editMode')
        v-container(grid-list-md, :class='{ "edit-mode": editMode }')
            draggable(v-model='cards', :options='draggableOptions', @change='reorderCards', element='v-layout').wrap
                template(v-for='card in cards')
                    led-card(v-if='card.type === "led"', :parentNamespace='namespace', :id='card.id', :title='card.title')
                    sensor-card(v-else-if='card.type === "sensor"', :parentNamespace='namespace', :id='card.id', :title='card.title')
                    launch-calendar-card(v-else-if='card.type === "launch-calendar"', :parentNamespace='namespace')
</template>

<script>
import draggable from 'vuedraggable';
import { mapActions, mapGetters } from 'vuex';
import * as HeaderComponents from './header';
import * as CardComponents from './cards';

export default {
    name: 'Dashboard',
    components: {
        ...HeaderComponents,
        draggable,
        ...CardComponents,
    },
    data () {
        return {
            id: 'dashboard',
            editMode: false,
        };
    },
    computed: {
        namespace () { return this.id; },
        ...mapGetters(['theme']),
        cards: {
            get () { return this.$store.getters[`${this.namespace}/cards`]; },
            set () { }, // handled by reorderCards method
        },
        draggableOptions () {
            return {
                chosenClass: 'draggable-chosen',
                ghostClass: 'draggable-ghost',
                disabled: !this.editMode,
                handle: 'h1.card-title',
            };
        },
    },
    watch: {
        editMode (enabled) {
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
            toggleTheme: dispatch => dispatch('toggleTheme'),
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

.flex {
    will-change: transform;
    transition: transform $secondary-transition;
}

.edit-mode > .layout > .flex {
    transform: scale(0.98);
    & /deep/ .card {
        @include elevation(4)
    }
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
    @include elevation(16, true)
}

.draggable-ghost /deep/ .card {
    opacity: 0.666;
}
</style>
