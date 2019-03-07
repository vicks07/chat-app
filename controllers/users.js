const user = require('../models/users.js');
const {ObjectId} = require('mongodb');


let RegisterUser = (req,res)=>{   
    GenerateSalt().then((result)=>{
        //console.log(result);
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


const Login = (req,res)=>{
    user.GetSaltKey({email:req.body.email}).then((result)=>{
        //console.log(result);
        if(result.length === 0)
        {
            return res.json({
                data:result,
                status:'INVALID'
            });
        }
        return user.Login({email:req.body.email,password:req.body.password,salt:result[0].salt});
    }).then((result)=>{
        if(result.length !== 0){
            return res.json({
                data:result,
                status:'OK'
            });
        }
        else{
            return res.json({
                data:result,
                status:'INVALID'
            });
        }
       
    }).catch(err=> res.end(err));
}

const UserDetails = (req,res)=>{
    if(typeof(req.body.userIds) == 'Array'){
        let userId = req.body.userIds.forEach((doc)=>{
            userId.push(ObjectId(doc));
        })
        user.UserDetails({userId:userId}).then((result)=>{
            if(result.length > 0){
                return res.json({
                    data:result,
                    status:'OK'
                });
            }
            return res.json({
                data:result,
                status:'EMPTY'
            });
        });
    }
    else{
        user.UserDetails({userId:ObjectId(req.body.userIds)}).then((result)=>{
            if(result.length > 0){
                return res.json({
                    data:result,
                    status:'OK'
                });
            }
            return res.json({
                data:result,
                status:'EMPTY'
            });
        });
    }
}

const AddContact = (req,res)=>{
    const addUser = user.AddToContact({userId:req.body.userId,friend:req.body.friend});
    const addUser1 = user.AddToContact({userId:req.body.friend,friend:req.body.userId});

    Promise.all([addUser,addUser1]).then((result)=>{
        return res.json({
            data:result,
            status:'ERROR'
        });
    }).catch((err)=>{
        return res.json({
            data:result,
            status:'ERROR'
        });
    })
}

const SendRequest = (req,res)=>{
        user.SendRequest({userId:req.body.userId,friend:req.body.request}).then((result)=>{
            if(result.length == 0){
                return res.json({
                    data:result,
                    status:'EMPTY'
                });
            }
            return res.json({
                data:result,
                status:'OK'
            });
        }).catch((err)=>{
            return res.json({
                data:err,
                status:'ERROR'
            })
        });
}

const DisplayRequest = (req,res)=>{
    user.DisplayRequest({userId:req.params.userId}).then((result)=>{
        if(result.length > 0){
            let userList = [];
            //console.log( 'Request',result[0].requests);
            result[0].requests.forEach((doc)=>{
                //console.log('doc',doc);
                userList.push(ObjectId(doc));
            })
            console.log('userlist',userList);
            return user.UserDetails({userId:userList})
        }
        return res.json({
            data:result,
            status:'EMPTY'
        });
    }).then((result)=>{
        return res.json({
            data:result,
            status:'OK'
        });
    }).catch((err)=>{
        return res.json({
            data:err,
            status:'INVALID'
        });
    })
}


module.exports ={
    RegisterUser,
    Login,
    AddContact,
    SendRequest,
    DisplayRequest
}