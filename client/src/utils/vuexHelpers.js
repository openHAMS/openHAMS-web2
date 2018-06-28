function normalizeInitVuexModuleParams(fn) {
    return (...params) => {
        const [store, namespace, vuexModule] =
            typeof params[1] === 'string'
                ? [...params]
                : [params[0], '', ...params];
        return fn(store, namespace, vuexModule);
    };
}

export const initVuexModule = normalizeInitVuexModuleParams((store, namespace, vuexModule) => {
    const isModuleRegistered = store && store.state && store.state[namespace];
    if (!isModuleRegistered) {
        store.registerModule(namespace, vuexModule);
    }
    else if (process.env.NODE_ENV === 'development') {
        store.unregisterModule(namespace);
        store.registerModule(namespace, vuexModule);
    }
    store.dispatch(`${namespace}/$init`);
});

export const mapFields = (fields) => {
    return fields.reduce((acc, field) => {
        acc[field] = {
            get () {
                return this.$store.getters[`${this.namespace}/${field}`];
            },
            set (value) {
                // ie. 'foo' => 'setFoo'
                const action = `set${field.replace(/^\w/, c => c.toUpperCase())}`;
                this.$store.dispatch(`${this.namespace}/${action}`, value);
            },
        };
        return acc;
    }, {});
};
