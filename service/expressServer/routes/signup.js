var express = require('express');
var router = express.Router();

const uuid = require('uuid');
const isEmpty = require("lodash/isEmpty")
const validator = require("validator")
const sqlFn = require("../mysql/index")
const validatorInput = (data) =>{
    let error = {};
    if(validator.isEmpty(data.username)){
        error.username = "请填写用户名"
    }
    if(validator.isEmpty(data.password)){
        error.password = "请填写密码"
    }
    //TODO: 密码确认

    return{
        error,
        isValid : isEmpty(error)
    }
    
}

/* GET users listing. */
router.get('/', function(req, res) {
    res.send({
    msg : "hello"
    });
});

/* POST users listing. */
router.post('/', function(req, res, next) {
    const { error, isValid } = validatorInput(req.body);
    const userId = uuid.v4();
    //sql query
    var query = "insert into userinfo values (?, ?, ?)";
    var arr = [userId, req.body.username, req.body.password];


    if(!isValid){
        res.status(400).json(error) // bug
    }else{
        sqlFn(query,arr,function(data){
            if(data.affectedRows){
                res.send({ success: true }) // success
            }else{
                res.status(400).json({error: "register fail!!!"}) // bug
            }
        })
        
    }

});

router.get("/:username", (req,res) =>{
    
    var sql = "select * from userinfo where `username` = ? "
    var arr = [req.params.username]
    sqlFn(sql,arr,function(data){
        if(data){
            res.send(data)
        }else{
            res.send({})
        }
    })
})

module.exports = router;
