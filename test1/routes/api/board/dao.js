const db = require('../../../config/db');
const conn = db.init();

exports.list = (req,res) =>{
    conn.query("select * from testboard", (err,row) => {
        if(err) throw err;
        res.send({
            success : true
            ,data : row
        }) 
    })   
}