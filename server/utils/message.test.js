const expect = require('expect');

let {generateMessage,generateLocationMessage} = require('./message.js');

describe('Generate Message',()=>{
    it('Should generate the correct message object',()=>{
        
        let from = 'Vikram';
        let text = 'Hello';

        let val = generateMessage(from,text);
        //console.log(val);
        expect(typeof val.createdAt).toBe('number');
        expect(val).toMatchObject({
            from:from,
            text:text
        });
        
    });
});

describe('Generate LocationMessage',()=>{
    it('Should generate the correct location object',()=>{
        
        let from = 'Vikram';
        let lat = 15;
        let long = 19;
        let url = "https://www.google.com/maps?q=15,19";

        let val = generateLocationMessage(from,lat,long);
        //console.log(val);
        expect(typeof val.createdAt).toBe('number');
        expect(val).toMatchObject({
            from:from,
            url:url
        });
        expect()
        
    });
});