<template lang="pug">
v-container(grid-list-md, text-xs-center)
    v-layout(wrap)
        v-flex(xs)
            v-card
                v-card-title asdasd
        v-flex(xs)
            v-card
                v-card-title dsadsadsa
</template>

<script>
export default {
    name: 'Dashboard',
    data () {
        return {
            cards: [
                { title: 'asdasd' },
                { title: 'asdasd' },
                { title: 'asdasd' },
            ]
        };
    }
};
</script>

<style scoped>
</style>
