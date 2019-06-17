<template lang="pug">
    v-content
        v-layout(align-center).header-container
            brand-logo
            v-spacer
            dashboard-menu(:parentNamespace='namespace')
        v-container(grid-list-md, :class='{ "edit-mode": editMode }')
            draggable(v-model='cards', :options='draggableOptions', @change='reorderCards', element='v-layout').wrap
                component(
                    v-for='card in cards', :key='card.id',
                    :is='`${card.type}-card`',
                    :parentNamespace='namespace', v-bind='card'
                )
</template>

<script>
import draggable from 'vuedraggable';
import { mapActions, mapState } from 'vuex';
import DashboardMenu from './header/DashboardMenu';
import { BrandLogo } from './header';
import * as CardComponents from './cards';

export default {
    name: 'Dashboard',
    components: {
        DashboardMenu,
        BrandLogo,
        draggable,
        ...CardComponents,
    },
    data () {
        return {
            id: 'dashboard',
        };
    },
    computed: {
        namespace () { return this.id; },
        ...mapState({
            editMode (state) {
                return state[this.namespace].editMode;
            },
        }),
        cards: {
            get () { return this.$store.state[this.namespace].cards; },
            set () { }, // handled by reorderCards method
        },
        draggableOptions () {
            return {
                chosenClass: 'draggable-chosen',
                ghostClass: 'draggable-ghost',
                disabled: !this.editMode,
                handle: 'h1.card-title',
            };
        },
    },
    watch: {
        editMode (enabled) {
            // sets cursor on dragdrop handle to show whether it can be grabbed
            this.$el.querySelector('.container')
                .style
                .setProperty(
                    '--card-title-cursor',
                    enabled ? 'grab' : 'default',
                );
        },
    },
    created () {
        this.$store.dispatch(`${this.namespace}/$init`);
    },
    methods: {
        ...mapActions({
            reorderCards (dispatch, { moved }) {
                dispatch(`${this.namespace}/reorderCards`, moved);
            },
        }),
    },
};
</script>

<style lang="scss" scoped>
@import "assets/breakpoints";
@import "assets/elevations";
@import "assets/transitions";

/* header */
.header-container {
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

/* default value for card-title-cursor */
div.container {
    --card-title-cursor: default;
}

.edit-mode > .layout > .flex ::v-deep .card {
    transform: scale(0.98);
    @include elevation(6)
}

* ::v-deep .card-title {
/* vuetify headline class */
    font-size: 24px !important;
    font-weight: 400;
    line-height: 32px !important;
    letter-spacing: normal !important;
/* vuetify headline class end */
    cursor: var(--card-title-cursor);
    user-select: none;
}

* ::v-deep .card {
    transition: box-shadow 0.28s map-get($transitions, fast-out-slow-in), // from Vuetify(v1.0.19)/src/stylus/settings/_elevations.styl
                opacity $primary-transition,
                transform $secondary-transition;
}

.draggable-chosen ::v-deep .card {
    @include elevation(12, true)
}

.draggable-ghost ::v-deep .card {
    opacity: 0.666;
}
</style>
