<template lang="pug">
    v-app
        v-content
            brand-header
            router-view
</template>

<script>
import BrandHeader from './components/BrandHeader.vue';

export default {
    name: 'App',
    components: {
        BrandHeader
    }
};
</script>

<style lang="scss">
@import "../node_modules/vuetify/dist/vuetify.css";
</style>
