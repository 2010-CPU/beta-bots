const requireUser = (req, res, next) => {
    if (!req.user) {
        next({message: 'You must be logged in to do this!'});
    } else {
        next();
    }
}

module.exports = {
    requireUser
};