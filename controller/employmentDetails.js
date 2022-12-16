var crud = require('../functions/crud');

exports.viewDetails = (req,res)=>{
    let query = `select * from employment_details where EMPLOYEE_ID = ${req.params.id}`;
    crud.selectOrDeleteQuery(query).then(resultdata=>{
        console.log(resultdata);
        res.json({result:resultdata.data[0]})
    })
}