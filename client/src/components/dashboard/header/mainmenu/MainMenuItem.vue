<template lang="pug">
    v-list-tile(:avatar='top', v-bind='tileOptions' @click='$emit("click")')
        v-list-tile-avatar
            v-icon(v-if='prependIcon', medium) {{ prependIcon }}
        v-list-tile-content
            v-list-tile-title
                slot
        v-list-tile-action.justify-center(v-if='hasActionSlot || top')
            slot(v-if='!top', name='action')
</template>

<script>
export default {
    name: 'MainMenuItem',
    props: {
        // v-list-tile options
        href: {
            type: String,
            default: undefined,
            required: false,
        },
        to: {
            type: String,
            default: undefined,
            required: false,
        },
        // v-icon
        prependIcon: {
            type: String,
            default: null,
            required: false,
        },
        // custom
        top: {
            type: Boolean,
            default: false,
            required: false,
        },
    },
    computed: {
        hasActionSlot () {
            return !!this.$slots.action;
        },
        tileOptions () {
            return {
                href: this.href,
                to: this.to,
            };
        },
    },
};
</script>
