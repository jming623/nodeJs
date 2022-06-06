const mysql = require('mysql');

const dbinfo ={
      host:'localhost'
      ,user:'root'
      ,password:'1234'
      ,database:'exer_vue'
}

let dbcon = {
    init: function(){
        return mysql.createConnection(dbinfo);
    }
    ,conn: function(con){
        con.connect(function(err){
            if(err){
                console.log('mysql connection error:'+err);
                setTimeout(this.init,2000);
            }else{
                console.log('mysql connection successfully');
            }
        })
    }
}

module.exports = dbcon;