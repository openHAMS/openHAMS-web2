export default (http) => {
    return {
        fetchUser: () => http.authGet('/api/user'),
    };
};
