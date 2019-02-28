// [{

// }]

class Users{
    constructor(){
        this.users = [];
    }
    addUser(id,name,room){
        let user = {id,name,room};
        this.users.push(user);
        return user;
    }

    removeUser(id){
        //Return user that was removed
        let user = this.getUser(id);
        if(user){
            this.users = this.users.filter(user=> user.id !==id);
        }
        return user;
    }

    getUser(id){
        return this.users.filter(user=> user.id===id)[0];
       // return user;
    }
    
    getUserList(room){             
        let user = this.users.filter(doc=> doc.room === room);
        //console.log('Here',user);
        let namesArr = user.map(user => user.name);
        //console.log(namesArr);
        return namesArr;
    }
}


module.exports = {
    Users
}

// //addUser(id,name,room)
// //removeUser(id)
// //getUser(id)
// //getUserList(room)

// class Person {
//     constructor (name,age){
//         this.name = name;
//         this.age = age;       
//     } //Specific to the class, and creates an instance of the class, Gets called by default
//     getUserDescription(){
//         return `${this.name} is ${this.age}(s) years old`;
//     }
// }

// let me = new Person('Vikram',100);
// console.log(me.getUserDescription());