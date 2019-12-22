const db = require('../db');
const crypto = require('crypto');


exports.loginGET = (req, res) => {
    if (req.session.user) {
      return res.redirect('/');
    }
    res.render('auth/login');
  };

exports.loginPOST = (req, res) => {
    const credentials = req.body;
  
    const passwordHash = crypto.createHash('sha256');
    passwordHash.update(credentials.password);
  
    db.get(`SELECT * FROM users WHERE username="${credentials.username}" AND password="${passwordHash.digest('hex')}"`, (err, user) => {
      if (err) {
        return next(err);
      }
  
      if (!user) {
        return res.redirect('/auth/login?error=invalid_credentials');
      }
      referer= req.header('Referer') || '/';
      console.log(referer);
      req.session.user = user;
      res.redirect(referer);
    });
  };

exports.logout = (req, res) => {
    delete req.session.user;
    referer= req.header('Referer') || '/';
    res.redirect(referer);
};

exports.registerGET = (req, res) => {
    if (req.session.user) {
      return res.redirect('/');
    }
    res.render('auth/register');
  };

exports.registerPOST = (req, res) => {
    const credentials = req.body;
  
    const passwordHash = crypto.createHash('sha256');
    passwordHash.update(credentials.password);
  
    const stmt = db.prepare('INSERT INTO users VALUES (null, ?, ?)');
    stmt.run([credentials.username, passwordHash.digest('hex')], (err) => {
      if(err) {
        console.log(err.message);
      }
      res.redirect('/auth/login');
    });
    stmt.finalize();
  };