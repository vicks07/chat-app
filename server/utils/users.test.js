const expect = require('expect');
const {Users} = require('./users.js');


describe('Users',()=>{
    it('Should Add new User',()=>{
        let users = new Users();
        let user = {
            id:123,
            name:'Vikram',
            room:'test'
        }
        let resUser = users.addUser(user.id,user.name,user.room);

        expect(users.users).toEqual([user]);
    });
})