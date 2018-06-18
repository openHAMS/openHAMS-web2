<template lang="pug">
    div.brand-container
        h1.branding.accent--text openHAMS
</template>

<script>
export default {
    name: 'Header'
};
</script>

<style lang="scss" scoped>
@import "../assets/breakpoints.scss";

.brand-container {
    margin: auto;
    padding: 16px;
    width: 100%;
    @include sm-only {
        padding-left: 24px;
    }
    @include md-only {
        max-width: 900px;
    }
    @include lg-only {
        max-width: 1185px;
    }
    @include xl-and-up {
        max-width: 1785px;
    }
}

.branding {
    font-weight: 300;
    letter-spacing: -0.04em !important;
    user-select: none;
    @include lg-and-up {
        font-size: 6rem;
    }
    @include lg-only {
        line-height: 1.2;
    }
    @include md-and-down {
        font-size: 5.5rem;
        line-height: 1;
    }
    @include sm-only {
        line-height: 1.2;
    }
    @include xs-and-down {
        font-size: 4rem;
    }
}
</style>
