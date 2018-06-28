<template lang="pug">
    v-flex(xs12, sm3, md3, lg3, xl2)
        v-card
            v-card-title
                .fw
                    h1.card-title {{ title }}
                    v-radio-group(hide-details, v-model='selectedColorId', :disabled='!enabled')
                        v-radio(
                            v-for='availableColor in availableColors', :key='availableColor.id',
                            :disabled='!enabled',
                            :label='availableColor.name',
                            :value='availableColor.id',
                        )
            v-card-actions
                v-slider(hide-details, dark, color='selected-color',
                    v-model='brightness',
                    prepend-icon='brightness_medium', :prepend-icon-cb='toggleEnabled',
                    :readonly='enabled',
                )
</template>

<script>
import { mapState } from 'vuex';
import { initVuexModule, mapFields } from 'Utils/vuexHelpers';
import ledCardModule from 'Store/modules/cards/ledcard';

export default {
    name: 'LedCard',
    props: {
        parentNamespace: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
    },
    computed: {
        namespace () {
            return `${this.parentNamespace}/${this.id}`;
        },
        ...mapState({
            availableColors (state) {
                return state[this.namespace].availableColors;
            },
            enabled (state) {
                return state[this.namespace].enabled;
            },
            selectedColor (_, getters) {
                return getters[`${this.namespace}/selectedColor`];
            },
        }),
        ...mapFields([
            'brightness',
            'selectedColorId',
        ]),
    },
    watch: {
        selectedColor (color) {
            // set css variables to current selected colors
            this.$el.style
                .setProperty(
                    '--selected-color',
                    `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`
                );
        },
    },
    created () {
        initVuexModule(this.$store, this.namespace, ledCardModule);
    },
    methods: {
        toggleEnabled () {
            this.$store.dispatch(`${this.namespace}/toggleEnabled`);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "Assets/colors.scss";

.fw {
    width: 100%;
}

// /deep/ fixes scoped class usage inside components
* /deep/ .selected-color {
    & {
        background-color: var(--selected-color) !important;
        border-color: var(--selected-color) !important;
    }

    &--text {
        color: var(--selected-color);
    }
}

.card__actions {
    background-color: m-color(grey, darken-4);
}
</style>
