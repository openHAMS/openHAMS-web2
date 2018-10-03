import theme from './theme';
import profile, { $INIT as INIT_PROFILE } from './profile';

export default {
    // TODO: make this non-namespaced
    namespaced: true,
    modules: {
        profile,
        theme,
    },
    actions: {
        $init ({ dispatch }) {
            dispatch('$initTheme');
            dispatch(INIT_PROFILE);
        },
    },
};
