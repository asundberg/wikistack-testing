// var chai = require('chai');
// var spies = require('chai-spies');
// chai.use(spies);
// var expect = chai.expect;

// describe('math', function () {
//   it('adds numbers', function () {
//     expect(2 + 2).to.equal(4);
//   });
// });

// describe('setTimeout', function () {
//   it('sets a timeout of 1000 milliseconds', function (done) {
//     var d = new Date();
//     var timeBefore = d.getTime();
//     setTimeout(function () {
//       d = new Date();
//       var timeAfter = d.getTime();
//       expect(timeAfter - timeBefore).to.be.above(1000).and.to.be.below(1500);
//       done();
//     }, 1000);
//   });
// });

// function logHi(){
//   console.log('hi');
// }

// describe('spying?', function () {
//   it('spies on stuff', function() {
//     var array=[0,1,2,3,4,5,6];
//     logHi= chai.spy(logHi);
//     array.forEach(logHi);
//     expect(logHi).to.have.been.called.exactly(7);
//   });
// });
