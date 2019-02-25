const expect = require('expect');
const {Users} = require('./users.js');


describe('Users',()=>{
    let users;
    beforeEach(()=>{
        users = new Users();
        users.users[{
            id:'1',
            name:'Mike',
            room:'Node Course'
        },{
            id:'2',
            name:'Jen',
            room:'React Course'
        },{
            id:'3',
            name:'Tom',
            room:'Node Course'
        }]
    });
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
    
    // it('Should Return Users of a Room',()=>{
        
    //     let userList = users.getUserList('Node Course');
    //     expect(userList).toEqual(["Mike","Tom"]);
    // });
})