import dashboardStore from '@/components/dashboard/DashboardStoreModule';

describe('Dashboard store Vuex module', () => {

    it('returns vuex module object', () => {
        const ds = dashboardStore;
        expect(ds).toEqual(expect.objectContaining({
            state: expect.any(Function), // fn instead obj to ensure it is reusable
            mutations: expect.any(Object),
            actions: expect.any(Object),
        }));
    });
});
