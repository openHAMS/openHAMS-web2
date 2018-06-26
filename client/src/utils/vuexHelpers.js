export function initVuexModule(store, namespace, vuexModule) {
    const isModuleRegistered = store && store.state && store.state[namespace];
    if (!isModuleRegistered) {
        store.registerModule(namespace, vuexModule);
    }
    else if (process.env.NODE_ENV === 'development') {
        store.unregisterModule(namespace);
        store.registerModule(namespace, vuexModule);
    }
    store.dispatch(`${namespace}/$init`);
}
