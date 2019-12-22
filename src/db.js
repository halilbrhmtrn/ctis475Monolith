const sqlite = require('sqlite3');

const db = new sqlite.Database('../data/db.sqlite3');

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS blogs (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, body TEXT, image TEXT, createdAt TEXT, createdBy INTEGER)');
  db.get('SELECT COUNT(*) AS CNT FROM blogs', (err, row) => {
    if (row.CNT > 0) {
      return;
    }

    const createdAt = new Date().toString();
    const stmt = db.prepare('INSERT INTO blogs VALUES (null, ?, ?, ?, ?, ?)');

    const posts = [
      ['iPhone 11', 'this is a silly blog post', 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone11-select-2019-family_GEO_EMEA?wid=882&amp;hei=1058&amp;fmt=jpeg&amp;qlt=80&amp;op_usm=0.5,0.5&amp;.v=1567022219953', createdAt, 2],
      ['iPhone 11 Pro', 'this is a silly blog post', 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-11-pro-select-2019_GEO_EMEA?wid=882&hei=1058&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1567812929247', createdAt, 3],
    ];
    for (let post of posts) {
      stmt.run(post);
    }
    stmt.finalize();
  });

  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(255), password VARCHAR(255))');
});

module.exports = db;
