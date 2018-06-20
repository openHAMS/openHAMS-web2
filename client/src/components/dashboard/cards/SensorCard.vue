<template lang="pug">
    v-flex(xs12, sm6, md5, lg4, xl3)
        v-card
            v-card-media(height='200px')
                div(style='background: red; height: 100%; width:100%;')
            v-card-title
                div
                    h1.card-title {{ title }}
                    span.body-1 asd
</template>

<script>
export default {
    name: 'SensorCard',
    props: {
        title: {
            type: String,
            required: true
        }
    }
};
</script>

<style scoped>
</style>
