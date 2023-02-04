var express = require("express"); // express
var router = express.Router(); // express router

const isEmpty = require("lodash/isEmpty") // 验证是否为空
const validator = require("validator") //数据验证
const jwt = require("jsonwebtoken") //token 验证

//自定包
const sqlFn = require("../mysql/index") // sql 指令
const config = require("../config")

/**
 * 
 * 判断输入的数据是否为空
 * 
 * @param  { username, password } data 
 * @returns error message, isValid(bool)
 */
const validatorInput = (data) =>{
    let error = {};
    if(validator.isEmpty(data.username))
        error.username = "请填写用户名"
    if(validator.isEmpty(data.password))
        error.password = "请填写密码"

    return{ error,isValid : isEmpty(error)}
}


/**
 *  post require
 *  
 *  
 */
router.post("/",(req,res) =>{
    
    const { error, isValid } = validatorInput(req.body);
    if(!isValid){ // 如果数据为空，返回错误
        res.status(400).json(error)
    }else{
        sqlCommand(req,res, error)
    }
})

/**
 * 判断输入的数据是否在数据库有对应数据
 * @param { Request } req 
 * @param { Response } res 
 * @param { String[] } error 
 */
const sqlCommand = (req, res,error) =>{
    const { username, password } = req.body;
    const query = "select * from userinfo where `username` = ? AND `password` = ? " //sql query
    const arr = [username,password]
    sqlFn(query,arr,function(data){
        if(data.length > 0) {
            const token = jwt.sign({
                id : data[0].id,
                username : data[0].username
            }, config.jwtSecret)
            let data2 = { "token" : token }
            res.send(data2)
            // res.json({success : true})
        }else{
            error.form = " 用户名或者密码错误 "
            res.status(400).json(error)
        }
    })
}


module.exports = router;