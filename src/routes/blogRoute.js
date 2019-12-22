const blogController = require('../controllers/blogPostsController');
const routes = (app) => {
    app.route('/blogs')
        .get(blogController.getAllBlogs);
    app.route('/blogs/add')
        .get(blogController.newBlogGET)
        .post(blogController.newBlogPOST);
    app.route('/blogs/:id')
        .get(blogController.blogDetail);
    app.route('/blogs/:id/edit')
        .get(blogController.blogEdit)
        .post(blogController.blogUpdate)
    app.route('/blogs/:id/delete')
        .post(blogController.blogDelete);
}
module.exports = routes;