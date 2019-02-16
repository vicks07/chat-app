const expect = require('expect');

let {generateMessage} = require('./message.js');

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