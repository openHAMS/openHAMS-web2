import dashboardStore from '@/components/dashboard/DashboardStoreModule';

describe('Dashboard store Vuex module', () => {

    it('returns vuex module object', () => {
        const ds = dashboardStore;
        expect(ds).toEqual(expect.objectContaining({
            state: expect.any(Function),
            // getters: expect.any(Object),
            mutations: expect.any(Object),
            actions: expect.any(Object),
        }));
    });
});
