export function isAuthenticated(req) {
    return req.session && req.session.user;
}