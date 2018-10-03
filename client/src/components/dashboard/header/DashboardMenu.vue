<template lang="pug">
    main-menu
        template(v-if='profile !== null')
            template(v-if='profile === false')
                v-icon(dark, slot='avatar', color='primary', size='48') account_circle
                main-menu-item(slot='top', top, href='/auth/google', prepend-icon='person') Log in
            template(v-else)
                img(slot='avatar', :src='profile.photoUrl')
                main-menu-item(top, slot='top', prepend-icon='person') {{ profile.name.givenName }}
        main-menu-item(prepend-icon='brightness_medium', @click='toggleTheme') Night mode
            v-switch(slot='action', :input-value='theme', true-value='dark', false-value='light')
        main-menu-item(prepend-icon='widgets', @click='editMode = !editMode') Edit cards
            v-switch(slot='action', :input-value='editMode')
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { MainMenu, MainMenuItem } from './mainmenu';

export default {
    name: 'DashboardMenu',
    components: {
        MainMenu,
        MainMenuItem,
    },
    props: {
        parentNamespace: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapGetters('settings', ['theme', 'profile']),
        editMode: {
            get () { return this.$store.state[this.parentNamespace].editMode; },
            set (value) { this.$store.commit(`${this.parentNamespace}/setEditMode`, value); },
        },
    },
    methods: {
        ...mapActions({
            toggleTheme: dispatch => dispatch('settings/toggleTheme'),
        }),
    },
};
</script>
