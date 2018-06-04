<template lang="pug">
    v-flex(xs12, sm3, md3, lg2, xl2)
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
                    v-model='selectedBrightness',
                    prepend-icon='brightness_medium', :prepend-icon-cb='() => { this.enabled = !this.enabled }',
                    :readonly='enabled',
                )
</template>

<script>
export default {
    name: 'LedCard',
    props: {
        title: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            availableColors: [
                { id: 0, name: 'red',        color: { hue: 0,   saturation: 10 } },
                { id: 1, name: 'green',      color: { hue: 90,  saturation: 50 } },
                { id: 2, name: 'blue',       color: { hue: 180, saturation: 50 } },
                { id: 3, name: 'Smaragdine', color: { hue: 240, saturation: 50 } },
            ],
            enabled: false,
            selectedColorId: -1,
            brightness: 50
        };
    },
    computed: {
        selectedBrightness: {
            get: function () {
                return this.enabled ? this.brightness : 0;
            },
            set: function (value) {
                if (this.enabled && value === 0)
                    this.enabled = false;
                else if (!this.enabled)
                    this.enabled = true;
                this.brightness = value;
            }
        },
        selectedColor: function () {
            if (!this.enabled)
                return { hue:0, saturation: 0, lightness: 0 };
            if (!this.availableColors.map(c => c.id).includes(this.selectedColorId))
                return { hue:0, saturation: 50, lightness: 50 };
            let selectedColor = this.availableColors[this.selectedColorId];
            return {
                // clamping
                hue:        Math.min(Math.max(       selectedColor.color.hue,  0), 360),
                saturation: Math.min(Math.max(               this.brightness,  0), 100),
                lightness:  Math.min(Math.max(selectedColor.color.saturation, 50), 100),
            };
        }
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
        enabled: function (enabled) {
            // fixes when usr sets turns it off via setting brightness to 0 and then turns it on via icon toggle
            if (enabled && this.brightness === 0)
                this.brightness = 25;
        }
    },
};
</script>

<style lang="scss" scoped>
@import "../../assets/colors.scss";

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
