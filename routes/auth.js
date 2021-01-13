import {sequelize} from "../Config/db";
import {UserModel} from "../Models/User";
import {JWT} from "../Config/jwt";

var express = require('express');
var router = express.Router();

router.get('/login',function (req,res,next){
  res.render('auth/login/index', { title: 'Login' });
})

/* GET home page. */
router.post('/login', async function(req, res, next) {
    try{
      const body = req.body;
      const {username,password}= body
      const user= await UserModel.findOne({where:{username:username}})
        if(user){
          console.log('user::',user)
          const {id,username}=user
          const token= JWT.generateToken(res,id,username)
          res.cookie('token',token)
          res.send({
            ... user?.dataValues,token:token
          })
        }else {
          res.sendStatus(404)
        }
    }catch (e){
      console.log('user::e::',e)
      res.sendStatus(500)
    }
});

module.exports = router;
