exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
};

exports.outroMiddleware = (req, res, next) => {
    next();
};

// Utilizando middleware para checar a csrf
exports.checkCsrfError = (err, req, res, next) => {
    if(err) {
        return res.render('404');
    }
    next();
};

// CSRF Token
exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};

// Exigindo que o usuário esteja logado
exports.loginRequired = (req, res, next) => {
    if(!req.session.user) {
        // Retornando mensagem de erro caso não entrar
        req.flash('errors', 'Você precisa fazer login.');
        // Salva o estado atual da sessão e manda o usuário de volta para a home
        req.session.save(() => res.redirect('/'));
        return;
    }
    next();
};