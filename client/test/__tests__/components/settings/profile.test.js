import profileSettings from '@/components/settings/profile';

describe('Profile settings Vuex module', () => {

    it('returns vuex module object', () => {
        const ps = profileSettings;
        expect(ps).toEqual(expect.objectContaining({
            state: expect.any(Object),
            getters: expect.any(Object),
            mutations: expect.any(Object),
            actions: expect.any(Object),
        }));
    });

    // TODO: more profile tests
});
