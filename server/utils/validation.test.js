const expect = require('expect');

let {isRealString} = require('./validation.js');

describe('Validation Testing',()=>{
    it('Should Reject Non-string values',()=>{
        let result = isRealString(28);
        expect(result).toBe(false);
    });

    it('Should Reject String with only spaces',()=>{
        let result = isRealString("  ");       
        expect(result).toBe(false);
    });

    it('Should Allow String with non-space characters',()=>{
        let result = isRealString(" Vikram  ");       
        expect(result).toBe(true);
    });


});