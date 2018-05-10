<template lang="pug">
    v-app
        v-navigation-drawer(app)
        v-toolbar(app)
        v-content
            v-container(fluid)
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
