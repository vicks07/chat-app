let env = process.env.NODE_ENV || 'development';

if(env === 'development' || env === 'test'){
    let config = require('./config.json');
    let envConfig = config[env];
    Object.keys(envConfig).forEach((doc)=>{
        process.env[doc] = envConfig[doc];
        //console.log(process.env[doc],doc);
    });    
}

module.exports = {

}