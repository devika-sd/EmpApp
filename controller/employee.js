// const { insertQuery, updateQuery, deleteQuery, selectQuery } = require('../functions/crud');
const crud = require('../functions/crud');
const sendemail = require('../config/sendEmail');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const fs = require("fs");
const { default: axios } = require('axios');

exports.registerUser = (req, res) => {
    let response = { FIRST_NAME: req.body.Firstname, LAST_NAME: req.body.Lastname, EMAIL: req.body.Email, PHONE_NUMBER: req.body.Phonenumber, PASSWORD: req.body.Newpassword };
    var attribute = Object.keys(response);
    var query = `insert into employee(${attribute}) values (?)`;
    var checkquery = `select FIRST_NAME from employee where Email = "${req.body.Email}"`;
    crud.selectOrDeleteQuery(checkquery).then(result => {
        if (result.data.length > 0) res.json({ message: "user already exist" });
        else {
            if (req.body.Newpassword === req.body.Confirmpassword) {
                const hash = bcrypt.hashSync(req.body.Newpassword, saltRounds);
                response.PASSWORD = hash;
                var data = Object.values(response);
                crud.insertOrUpdateQuery(query, data)
                    .then(result => {
                        if (result.success) {
                            console.log(result)
                            sendemail(req.body.Email, req.body.Newpassword);
                            res.render('profile', {
                                firstname: req.body.Firstname,
                                lastname: req.body.Lastname,
                                email: req.body.Email,
                                mobile: req.body.Phonenumber
                            });
                            // res.json({ success: true, data: result.data })
                        }
                        else { res.json({ success: false }) }
                    })
            }
        }
    })
}

exports.login = (req, res) => {
    console.log(req.body.Email + " " + req.body.Password);
    var checkquery = `select * from employee where Email = "${req.body.Email}"`;
    crud.selectOrDeleteQuery(checkquery).then(resultdata => {
        bcrypt.compare(req.body.Password, resultdata.data[0].PASSWORD, function (err, result) {
            // result == true
            if (result) {
                res.render('profile', {
                    firstname: resultdata.data[0].FIRST_NAME,
                    lastname: resultdata.data[0].LAST_NAME,
                    email: resultdata.data[0].EMAIL,
                    mobile: resultdata.data[0].PHONE_NUMBER,
                    profileimage: resultdata.data[0].RESUME,
                    id:resultdata.data[0].EMPLOYEE_ID
                })
            }
            else {
                res.json({ message: "invalid email and password" });
            }
        });
    })
}

exports.profile = (req, res) => {
    console.log("works")
    var checkquery = `select * from employee where Email = "${req.params.email}"`;
    crud.selectOrDeleteQuery(checkquery).then(resultdata => {
        res.render('profile', {
            firstname: resultdata.data[0].FIRST_NAME,
            lastname: resultdata.data[0].LAST_NAME,
            email: resultdata.data[0].EMAIL,
            mobile: resultdata.data[0].PHONE_NUMBER,
            profileimage: resultdata.data[0].RESUME,
            id:resultdata.data[0].EMPLOYEE_ID
        })
    })
}

exports.uploadresume = (req, res) => {
    const file = req.files.resume;
    var buffer = Buffer.from(req.files.resume.data);
    var bufferBase64 = buffer.toString('base64');
    // console.log(bufferBase64)
    var filename1 = file.name.split('.');
    filename1.splice(-1, 1);
    var filename = filename1.join("") + "_" + new Date().getTime() + "." + file.name.split(".").pop();
    const path = "./public/resume/" + filename;
    fs.mkdir("./public/resume", { recursive: true }, function (err) {
        if (err) {
            return res.status(500).send(err);
        } else {
            if (req.files.resume.mimetype == "image/jpeg" || req.files.resume.mimetype == "image/png" || req.files.resume.mimetype == "image/gif") {
                file.mv(path, (err) => {
                    if (err) throw err;
                    var query = `update employee set ? where EMAIL = "${req.params.email}"`;
                    console.log(query);
                    crud.insertOrUpdateQuery(query, { RESUME: filename,RESUME_DETAILS:bufferBase64 })
                        .then(result => {
                            console.log(result)
                            if (result.data.affectedRows > 0) res.json({ success: true, data: result.data })
                            else res.json({ success: false, data: result.data })
                        })
                });
            }
            else {
                res.json({ message: "format not supported" })
            }
        }
    })
    // res.json({ message: "folder created" })
}

exports.closeconnection = (req, res) => {
    sqlconnection.end(function (err) {
        res.send("connection closed");
        console.log("db connection closed");
    });
}

exports.employeeProductById = (req,res) =>{
    axios.get("http://localhost:3001/product/11")
    .then(data=>{
        console.log(data)
    })
    res.render('products', {
        id:req.params.id,
        name:"aws",
        price:500,
        created_at:"sunday",
        email:"testuser@gmail.com"
    })
}

// exports.joinTables = (req, res) => {
//     // var query1 = `select * from employee inner join employment_details where employee.EMPLOYEE_ID = employment_details.EMPLOYEE_ID and employment_details.EMPLOYEE_ID=${req.params.id};`
//     var query2 = `select * from employee left join employment_details on employee.EMPLOYEE_ID = employment_details.EMPLOYEE_ID where employee.EMPLOYEE_ID=${req.params.id};`
//     crud.selectOrDeleteQuery(query2)
//         .then(result => {
//             res.json({ success: true, data: result.data })
//         })
// }

// exports.getallemployee = (req, res) => {
//     var query = "select * from employee";
//     crud.selectOrDeleteQuery(query)
//         .then(result => {
//             if (result.success) res.json({ success: true, data: result.data })
//         })
// }

// exports.postrecord = (req, res) => {
//     var attribute = Object.keys(req.body.data[0]);
//     var query = `insert into employee(${attribute}) values ?`;
//     var data = req.body.data.map(obj => { return Object.values(obj) })
//     crud.insertOrUpdateQuery(query, data)
//         .then(result => {
//             if (result.success) res.json({ success: true, data: result.data })
//         })
// }

// exports.updaterecord = (req, res) => {
//     var query = `update employee set ? where EMPLOYEE_ID = ${req.params.id}`;
//     crud.insertOrUpdateQuery(query, req.body)
//         .then(result => {
//             if (result.data.affectedRows > 0) res.json({ success: true, data: result.data })
//             else res.json({ success: false, data: result.data })
//         })
// }

// exports.deleterecord = (req, res) => {
//     var query = `delete from employee where EMPLOYEE_ID = ${req.params.id}`;
//     crud.selectOrDeleteQuery(query)
//         .then(result => {
//             if (result.data.affectedRows > 0) res.json({ success: true, data: result.data })
//             else res.json({ success: false, data: result.data })
//         })
// }