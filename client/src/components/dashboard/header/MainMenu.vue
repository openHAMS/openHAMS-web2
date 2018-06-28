<template lang="pug">
    v-menu(bottom, left, nudge-top='8', nudge-right='16').mr-2
        v-avatar.profile(slot='activator', size='40')
            slot(name='avatar')
                v-icon(dark, color='accent', size='48') account_circle
        v-list.pt-0
            slot(name='top')
                v-list-tile(avatar)
            v-divider
            slot
</template>

<script>
export default {
    name: 'MainMenu',
};
</script>

<style lang="scss" scoped>
.profile {
    /* Above v-menu (z-index of 8) */
    z-index: 10;
}
</style>
