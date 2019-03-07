const {MongoClient,ObjectId} = require('mongodb');
const crypto = require('crypto');

const mongoUri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

const RegisterUser = (userDetails)=>{
    //console.log('Here');
    return new Promise((resolve,reject)=>{
        MongoClient.connect(mongoUri,{useNewUrlParser:true},(err,client)=>{
            if(err){
                reject('Error');
            }
            let db = client.db(dbName);
            userDetails.password = crypto.createHmac('sha256',userDetails.salt).update(userDetails.password).digest('hex');
            db.collection('users').insertOne(userDetails).then((result)=>{
                resolve(result);
            }).catch((err)=>{
                reject('Error');
            });
        });
    });
}

const GetSaltKey = (userDetails)=>{
    return new Promise((resolve,reject)=>{
        MongoClient.connect(mongoUri,{useNewUrlParser:true},(err,client)=>{
            if(err){
                reject('Error');
            }
            let db = client.db(dbName);
            db.collection('users').find({email:userDetails.email}).project({salt:1}).toArray().then((result)=>{
                resolve(result);
            }).catch((err)=>{
                reject('Error');
            });
        });
    });
}

const Login = (userDetails)=>{
    return new Promise((resolve,reject)=>{
        MongoClient.connect(mongoUri,{useNewUrlParser:true},(err,client)=>{
            if(err){
                reject('Error');
            }
            let db = client.db(dbName);
            //console.log(userDetails);
            userDetails.password = crypto.createHmac('sha256',userDetails.salt).update(userDetails.password).digest('hex');
            //console.log(userDetails.password,userDetails.email);
            db.collection('users').find({$and:[{email:userDetails.email},{password:userDetails.password}]}).project({name:1,email:1}).toArray().then((result)=>{
                resolve(result);
            }).catch((err)=>{
                reject(false);
            });
        });
    });
}

const UserDetails = (userDetails)=>{
    return new Promise((resolve,reject)=>{
        MongoClient.connect(mongoUri,{useNewUrlParser:true},(err,client)=>{
            if(err){
                reject('Error');
            }
            let db = client.db(dbName);    
            db.collection('users').find({_id:{$in:userDetails.userId}}).project({name:1}).toArray().then((result)=>{
                resolve(result);
            }).catch((err)=>{
                reject(false);
            });
        });
    });
}

const AddToContact = (userDetails)=>{
    console.log('userDetails',userDetails);
    return new Promise((resolve,reject)=>{
        MongoClient.connect(mongoUri,{useNewUrlParser:true},(err,client)=>{
            if(err){
                reject('Error');
            }
            let db = client.db(dbName);
            db.collection('users').updateOne({_id:ObjectId(userDetails.userId)},{$addToSet:{friends:ObjectId(userDetails.friend)}}).then((result)=>{
                resolve(result);
            }).catch((err)=>{
                reject('Error');
            });
        });
    });
}

const SendRequest = (userDetails)=>{
    return new Promise((resolve,reject)=>{
        MongoClient.connect(mongoUri,{useNewUrlParser:true},(err,client)=>{
            if(err){
                reject('Error');
            }
            let db = client.db(dbName);
            db.collection('users').updateOne({_id:ObjectId(userDetails.userId)},{$addToSet:{requests:userDetails.friend}}).then((result)=>{
                resolve(result);
            }).catch((err)=>{
                reject('Error');
            });
        });
    });
}

const DisplayRequest = (userDetails)=>{
    return new Promise((resolve,reject)=>{
        MongoClient.connect(mongoUri,{useNewUrlParser:true},(err,client)=>{
            if(err){
                reject('Error');
            }
            let db = client.db(dbName);
            db.collection('users').find({_id:ObjectId(userDetails.userId)}).project({requests:1}).toArray().then((result)=>{
                //console.log('user result',result);
                resolve(result);
            }).catch((err)=>{
                reject('Error');
            });
        });
    });
}
module.exports = {
    RegisterUser,
    GetSaltKey,
    Login,
    UserDetails,
    AddToContact,
    SendRequest,
    DisplayRequest
}