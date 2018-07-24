<template lang="pug">
    v-flex(xs12, sm5, md4, lg3, xl3)
        v-card
            v-card-title
                h1.card-title Rocket launch calendar
            v-data-table(disable-initial-sort,
                :headers='headers',
                :items='displayedLaunches', item-key='id',
                :loading='loading',
                :no-data-text='dataTableMessage',
                :no-results-text='dataTableMessage',
                :pagination.sync='pagination',
                :rowsPerPageItems='[3]',
                :totalItems='totalLaunches',
            )
                template(slot='items', slot-scope='props')
                    td
                        .body-1 {{ props.item.rocket.name }}
                    td
                        v-tooltip(v-if='props.item.netstamp', bottom)
                            .body-1(slot='activator') {{ props.item.netstamp | formatDateTimeDistance }}
                            span {{ props.item.netstamp | formatDateTime }}
                        template(v-else)
                            span.grey--text n/a
</template>

<script>
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import format from 'date-fns/format';
import pick from 'lodash-es/pick';

export default {
    name: 'LaunchCalendarCard',
    filters: {
        formatDateTime (unixSeconds) {
            const date = new Date(unixSeconds * 1000);
            return format(date, 'ddd, MMM DD, HH:mm');
        },
        formatDateTimeDistance (unixSeconds) {
            const date = new Date(unixSeconds * 1000);
            return distanceInWordsToNow(date, { addSuffix: true });
        },
    },
    props: {
        parentNamespace: {
            type: String,
            required: true,
        },
    },
    static () {
        return {
            LAUNCH_FIELDS: ['id', 'name', 'netstamp', 'vidURLs', 'rocket', 'missions'],
            headers: [
                { value: 'name', sortable: false },
                { value: 'netstamp', sortable: false, width: '135px' },
            ],
        };
    },
    data () {
        return {
            loading: true,
            pagination: {},
            displayedLaunches: [],
            totalLaunches: 0,
        };
    },
    computed: {
        dataTableMessage () {
            if (this.loading) {
                return 'Loading...';
            }
        },
    },
    watch: {
        pagination: {
            handler (val) {
                if (!this.loading) {
                    this.loadLaunches(val);
                }
            },
            deep: true,
        },
    },
    created () {
        this.loadTotal();
    },
    methods: {
        async fetchLaunches ({ n, page = 1, fields = [] }) {
            const offset = (page - 1) * n;
            const res = await fetch(`https://launchlibrary.net/1.4/launch/?next=${n}&offset=${offset}&fields=${fields.join(',')}`);
            if (res.status !== 200) {
                // error
            }
            const data = res.json();
            if (data.status === 'error') {
                // error
            }
            return data;
        },
        async loadTotal () {
            this.loading = true;
            const { total } = await this.fetchLaunches({ n: 1 });
            this.totalLaunches = total;
            this.loading = false;
        },
        async loadLaunches ({ page, rowsPerPage }) {
            this.loading = true;
            const { launches, total } = await this.fetchLaunches({
                n: rowsPerPage,
                page,
                fields: this.LAUNCH_FIELDS,
            });
            // filter launches so they only contains relevant fields
            const pickedLaunches = launches.map(launch => pick(launch, this.LAUNCH_FIELDS));
            this.displayedLaunches = pickedLaunches;
            this.totalLaunches = total;
            this.loading = false;
        },
    },
};
</script>

<style lang="scss" scoped>
$spacer: 4px;

table.datatable {
    /deep/ & > thead > tr > th,
    & > tbody > tr > td {
        padding-left: 2 * $spacer;
        padding-right: 2 * $spacer;

        &:first-child {
            padding-left: 4 * $spacer;
        }

        &:last-child {
            padding-right: 4 * $spacer;
        }
    }

    /deep/ & > thead {
        & > tr:not(.datatable__progress) {
            height: 2px;
        }
    }
}
</style>
