<template lang="pug">
    v-flex(xs12, sm6, md5, lg4, xl3)
        v-card
            v-card-media(height='2px')
                div(style='background: red; height: 100%; width:100%;')
            v-card-title
                div
                    h1.headline {{ title }}
                    span.body-1 asd
            v-card-actions
                v-spacer
                v-btn asd
                v-switch(label='asd')
</template>

<script>
export default {
    name: 'LedCard',
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
