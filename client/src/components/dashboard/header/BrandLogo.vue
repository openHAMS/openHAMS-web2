<template lang="pug">
    h1.branding.accent--text openHAMS
</template>

<script>
export default {
    name: 'BrandLogo',
};
</script>

<style lang="scss" scoped>
@import "Assets/breakpoints.scss";

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
