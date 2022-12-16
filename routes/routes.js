var employeeRoute = require('../routes/employee');
var employmentDetails = require('../routes/employmentDetails');

exports.routing = (app) => {
    
    app.get('/employee/register', (req, res) => {
        res.render('registration')
    })
    app.get('/employee/login', (req, res) => {
        res.render('login')
    })
    app.get('/employee/profile', (req, res) => {
        res.render('profile')
    })
    app.get('/employee/products', (req, res) => {
        res.render('products')
    })
    app.use('/employee', employeeRoute);
    app.use('/employmentDetails', employmentDetails);
    
}