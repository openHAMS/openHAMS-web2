<template lang="pug">
    v-list-tile(:avatar='top', @click='$emit("click")')
        v-list-tile-avatar
            v-icon(v-if='prependIcon', medium) {{ prependIcon }}
        v-list-tile-content
            v-list-tile-title
                slot
        v-list-tile-action.justify-center(v-if='hasActionSlot')
            slot(name='action')
</template>

<script>
export default {
    name: 'MainMenuItem',
    props: {
        prependIcon: {
            type: String,
            default: null,
            required: false,
        },
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
    },
};
</script>
