const getHint = require('../client/util/getHint.js');

describe('Determines correct hint', () => {
 
    it(`Expect guess '1234', and target number '4433' to equal 'XX'`, () => {
      expect(getHint('1234', '4443')).toEqual('XX');
    })

    it(`Expect guess '4444', and target number '4433' to equal 'OO'`, () => {
      expect(getHint('4444', '4443')).toEqual('OOO');
    })

    it(`Expect guess '1344', and target number '4433' to equal 'OXX'`, () => {
      expect(getHint('1344', '4443')).toEqual('OXX');
    })  

    it(`Expect guess '1234', and target number '4320' to equal 'XXX'`, () => {
      expect(getHint('1234', '4320')).toEqual('XXX');
    })  
    
    it(`Expect guess '4442', and target number '4433' to equal 'OOO'`, () => {
        expect(getHint('4442', '4443')).toEqual('OOO');
    })  
    
    it(`Expect guess '3441', and target number '4433' to equal 'OOX'`, () => {
        expect(getHint('3441', '4443')).toEqual('OOX');
    })  

    it(`Expect guess '4443', and target number '4433' to equal 'OOOO'`, () => {
      expect(getHint('4443', '4443')).toEqual('OOOO');
    }) 

    it(`Expect guess '0000', and target number '4433' to equal ''`, () => {
        expect(getHint('1111', '4443')).toEqual('');
      }) 
})