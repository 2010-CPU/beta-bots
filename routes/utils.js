const requireUser = (req, res, next) => {
    if (!req.user) {
        next({message: 'You must be logged in to do this!'});
    } else {
        next();
    }
}

const requireAdmin = (req, res, next) => {
    if(!req.user) {
        next({message: 'You must be logged in to do this!'});
    } else if (!req.user.isAdmin) {
        next({message: 'You must be an Admin to do this!'});
    } else {
        next();
    }
}

module.exports = {
    requireUser,
    requireAdmin
};