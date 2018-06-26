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
import ledCardModule from '../../../store/modules/cards/ledcard';

const mapFields = (fields) => {
    return fields.reduce((acc, field) => {
        acc[field] = {
            get () {
                return this.$store.getters[`${this.namespace}/${field}`];
            },
            set (value) {
                // ie. 'foo' => 'setFoo'
                const action = `set${field.replace(/^\w/, c => c.toUpperCase())}`;
                this.$store.dispatch(`${this.namespace}/${action}`, value);
            },
        };
        return acc;
    }, {});
};

export default {
    name: 'LedCard',
    props: {
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
            return `dashboard/${this.id}`;
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
        const store = this.$store;
        const isModuleRegistered = store && store.state && store.state[this.namespace];
        if (!isModuleRegistered) {
            store.registerModule(this.namespace, ledCardModule);
        }
        else if (process.env.NODE_ENV === 'development') {
            store.unregisterModule(this.namespace);
            store.registerModule(this.namespace, ledCardModule);
        }
        store.dispatch(`${this.namespace}/$init`);
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
