<template lang="pug">
    v-app
        v-content
            v-container
                v-layout
                    v-flex
                        h1.branding.accent--text openHAMS
            router-view
        v-footer(app)
</template>

<script>
export default {
    name: 'App'
};
</script>

<style lang="scss">
@import "../node_modules/vuetify/dist/vuetify.css";
@import "./assets/breakpoints.scss";

.branding {
    @include lg-and-up {
        font-size: 6rem;
    }
    @include md-and-down {
        font-size: 5rem;
        line-height: 1;
    }
    @include sm-and-down {
        font-size: 4rem;
        //margin: 0.3em;
    }
    @include xs-and-down {
        //line-height: 0.8;
    }
    font-weight: 300;
    //line-height: 1 !important;
    letter-spacing: -0.04em !important;
}
</style>
