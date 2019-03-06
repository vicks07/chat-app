const user = require('../models/users.js');


let RegisterUser = (req,res)=>{   
    GenerateSalt().then((result)=>{
        console.log(result);
        return user.RegisterUser({name:req.body.name,email:req.body.email,password:req.body.password,salt:result});
    }).then((result)=>{ 
        return res.send(result);
     }).catch(err=> res.send(err));
}

const GenerateSalt = ()=>{
    return new Promise((resolve,reject)=>{
        try
        {
            let saltKey = "";
            let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 8; i++)
                saltKey += possible.charAt(Math.floor(Math.random() * possible.length));

            resolve(saltKey);
        }
        catch(err){
            reject(err);
        }
    });
}


module.exports ={
    RegisterUser
}