const db = require('../db');

exports.newBlogGET = (req, res) => {
    if (typeof req.session.user === 'undefined') {
      return res.render('error/unauthorized');
    }
    return res.render('blogs/add');
 };

exports.newBlogPOST = (req, res) => {
    if (typeof req.session.user === 'undefined') {
        return res.render('error/unauthorized');
      }
      const body = req.body;
      
      body.blog.createdAt = new Date().toString();
      body.blog.createdBy = 2; //hard coded should retrieve from db
      console.log(body.blog);
      console.log(Object.values(body.blog));
      const stmt = db.prepare('INSERT INTO blogs VALUES (null, ?, ?, ?, ?, ?)');
      stmt.run(Object.values(body.blog), (err) => {
        if(err) {
          console.log(err.message);
        }
        referer= req.header('Referer') || '/';
        res.redirect('/');
      });
      stmt.finalize();
 };

exports.blogDetail = (req, res, next) => {
  db.get('SELECT * FROM blogs WHERE id=' + req.params.id, (err, blog) => {
    if (err) {
      return next(err);
    }
    if (!blog) {
      return res.render('error/404');
    }
    return res.render('blogs/detail', { blog });
  });
};

exports.getAllBlogs = (req, res, next) => {
  db.all('SELECT * FROM blogs', (err, blogs) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.render('index', { blogs });
    });
};

exports.blogEdit = (req, res, next) => {
  if (typeof req.session.user === 'undefined') {
    return res.render('error/unauthorized');
  }
  db.get('SELECT * FROM blogs WHERE id=' + req.params.id, (err, blog) => {
      if (err) {
        return next(err);
      }
      if (!blog) {
        return res.render('error/404');
      }
      res.render('blogs/edit', { blog });
    });
};

exports.blogUpdate = (req, res, next) => {
  //
  if (typeof req.session.user === 'undefined') {
    return res.render('error/unauthorized');
  }
  const blog = req.body.blog;
  blog.id = req.params.id;
  let updateSql = `UPDATE blogs
                    SET title = ?, body = ?, image = ? 
                    WHERE id = ?`;
  db.run(updateSql,Object.values(blog),(err) => {
    if(err) {
      console.log(err.message);
    }
    referer= req.header('Referer') || '/';
    res.redirect('/');
  });

};


exports.blogDelete = (req, res, next) => {
  if (typeof req.session.user === 'undefined') {
    return res.render('error/unauthorized');
  }
  let deleteSql = `DELETE FROM blogs
                   WHERE id = ?`;
  const id = req.params.id;
  db.run(deleteSql,id,(err) => {
    if(err) {
      console.log(err.message);
    }
    referer= req.header('Referer') || '/';
    res.redirect('/');
  });
};