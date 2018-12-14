export default (http) => {
    return {
        postDarkTheme: (darkTheme) => http.authPostJson('/api/settings/darktheme', { darkTheme }),
    };
};
