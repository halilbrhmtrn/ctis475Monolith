const authController = require('../controllers/authController');
const routes = (app) => {
    app.route('/auth/login')
        .get(authController.loginGET)
        .post(authController.loginPOST);
    app.route('/auth/logout')
        .get(authController.logout);
    app.route('/auth/register')
        .get(authController.registerGET)
        .post(authController.registerPOST);
}

module.exports = routes;