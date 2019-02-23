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