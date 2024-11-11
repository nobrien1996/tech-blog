//DIRECT TO LOGIN ROUTES IF NOT LOGGED IN

const withGuard = (req, res, next) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        next();
    }
};


//PREVENT USE WITHOUT LOGIN

const apiGuard = (req, res, next) => {
    if (!req.res.logged_in) {
        res.status(403).json({ msg: 'You can`t do this without logging in' });
    } else {
        next();
    }
};


//REDIRECT

const withoutGuard = (req, res, next) => {
    if (!req.session.logged_in) {
        next();
    } else {
        res.redirect('/');
    }
};



module.exports = { withGuard, apiGuard, withoutGuard };