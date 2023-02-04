const mysql = require("mysql")

var client = mysql.createConnection({
    host: 'localhost', // 服务器地址
    port: '3306',
    user: 'root', // mysql用户名称

    password: 'se6912163', // mysql用户密码
    database: 'user', // 数据库名称
})


function sqlFuc(sql,arr,callback){
    client.query(sql,arr,function(error,result){
        if(error){
            console.log(new Error(error))
            return;
        }
        callback(result)
    })
}

module.exports = sqlFuc