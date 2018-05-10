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
}
</script>

<style>
@import "../node_modules/vuetify/dist/vuetify.css";
</style>
