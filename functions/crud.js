var sqlconnection = require('../config/db');

exports.insertOrUpdateQuery = (query, data) => {
    return new Promise((resolve, reject) => {
        sqlconnection.query(query, [data], (err, result) => {
            if (err) throw err;
            else resolve({ success: true, data: result });
        })
    })
}

exports.selectOrDeleteQuery = (query) => {
    return new Promise((resolve, reject) => {
        sqlconnection.query(query, (err, result) => {
            if (err) throw err;
            else resolve({ success: true, data: result });
        })
    })
}