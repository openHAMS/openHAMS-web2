import profile, { $INIT as INIT_PROFILE } from './profile';
import theme, { $INIT as INIT_THEME } from './theme';

export default {
    // TODO: make this non-namespaced
    namespaced: true,
    modules: {
        profile,
        theme,
    },
    actions: {
        $init ({ dispatch }) {
            dispatch(INIT_PROFILE);
            dispatch(INIT_THEME);
        },
    },
};
