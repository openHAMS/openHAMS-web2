<template lang="pug">
    v-app(:dark='isDarkTheme')
        router-view
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'App',
    computed: {
        ...mapGetters('settings', ['isDarkTheme']),
    },
};
</script>

<style lang="scss">

.input-group.input-group--slider {
    &.input-group--prepend-icon .slider {
        // too much margin between prepended icon and slider (was 40px)
        margin-left: 20px;
    }
}

.theme--dark {
    &.input-group.input-group--focused {
        & .input-group__prepend-icon, & .input-group__append-icon {
            // fixes slider icon black on black background when sliding the slider
            color: #fff !important;
        }
    }
}

.card__actions {
    .input-group {
        // too much padding at the top (was 16px)
        padding-top: 0;
        // too close on the left side (was 0px)
        padding-left: 8px;
    }
}

.justify-center {
    // does not work most of the times without !important
    -webkit-box-pack: center !important;
    -ms-flex-pack: center !important;
    justify-content: center !important;
}
</style>
