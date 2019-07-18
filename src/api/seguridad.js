var jwt = require('jsonwebtoken')
import dotenv from 'dotenv'
import { resolve } from 'dns';
dotenv.config()
async function tokenizado_admin(req,res,next){
    var token = req.headers['authorization']
    if(!token){
      res.status(401).send({
        error: "Es necesario el token de autenticación"
      })
      return
    }
    token = token.replace('Bearer ', '')
        let dataToken = verificoToken(token,process.env.KEY_ADMIN)
        dataToken.then((data=>{
            next()
        })).catch((e=>{
            //console.error(e)
             res.status(401).send({
                error:true, msg: 'Token inválido'
            })

        }))
}
async function tokenizado_user(req,res,next){
    var token = req.headers['authorization']
    if(!token){
      res.status(401).send({
        error: "Es necesario el token de autenticación"
      })
      return
    }
    token = token.replace('Bearer ', '')
        let dataToken = verificoToken(token,process.env.KEY_USER)
        dataToken.then((data=>{
            next()
        })).catch((e=>{
            //console.error(e)
             res.status(401).send({
              error:true, msg: 'Token inválido'
            })

        }))
}
async function tokenizado_anonimo(req,res,next){
    var token = req.headers['authorization']
    if(!token){
      res.status(401).send({
        error: "Es necesario el token de autenticación"
      })
      return
    }
    token = token.replace('Bearer ', '')
    //validacion como admin
        let dataToken = verificoToken(token,process.env.KEY_ADMIN)
        dataToken.then((data=>{
            next()
        })).catch((e=>{
            //validacion como USER
            console.info('VALIDO ERROR ADMIN , TRY COMO USER')
            let dataTokenUser = verificoToken(token,process.env.KEY_USER)
            dataTokenUser.then((data=>{
                next()
            })).catch((e=>{
                res.status(401).send({
                  error:true, msg: 'Token inválido'
                })
            }))
        }))
}
           
        



  function verificoToken(token, key_token) {
      return new Promise(
          (resolve,reject)=>{
            jwt.verify(token, key_token, function(err, user) {
                if (err) {
                  throw new Error()
                } else {
                  console.info("$ TOKEN AUTORIZADO")
                  resolve(true)
                }
              })
        }
      )
}
module.exports= {tokenizado_admin,tokenizado_user, tokenizado_anonimo}
if(!module.parent){
    (function (){
        let tokenData={
          name:'Oscar',
          lasteName:'Megia'
        }
        let token=jwt.sign(tokenData, 'RSS$2019', {
               expiresIn: 60*60*24*365 // expires in 1 year
            })
        console.log('===============================')
        console.log(token)
        console.log('===============================')
      })()
}
