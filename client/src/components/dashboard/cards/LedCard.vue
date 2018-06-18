<template lang="pug">
    v-flex(xs12, sm3, md3, lg3, xl2)
        v-card
            v-card-title
                .fw
                    .headline {{ title }}
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
        let get = function () {
            return this.$store.getters[`${this.namespace}/${field}`];
        };
        let set = function (value) {
            // ie. 'foo' => 'setFoo'
            let mutation = `set${field.replace(/^\w/, c => c.toUpperCase())}`;
            this.$store.commit(`${this.namespace}/${mutation}`, value);
        };
        acc[field] = { get, set };
        return acc;
    }, {});
}

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
        namespace: function () {
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
        selectedColor: function (color) {
            // set css variables to current selected colors
            this.$el.style
                .setProperty(
                    '--selected-color',
                    `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`
                );
        },
    },
    created: function () {
        let store = this.$store;
        let isModuleRegistered = store && store.state && store.state[this.namespace]
        if (!isModuleRegistered) {
            store.registerModule(this.namespace, ledCardModule);
        }
        else if (process.env.NODE_ENV === 'development') {
            store.unregisterModule(this.namespace);
            store.registerModule(this.namespace, ledCardModule);
        }

    },
    methods: {
        toggleEnabled () {
            this.$store.commit(`${this.namespace}/toggleEnabled`);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/colors.scss";

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
