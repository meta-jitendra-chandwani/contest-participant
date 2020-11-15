let chai = require('chai');
let chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
var assert = require('assert');

let server = require('../app');
//Our parent block
describe('Test case running', () => {
    describe('Contest with discount 50%', () => {
        it('participate in contest - 1', (done) => {
            chai.request(server)
                .get('/contest?userId=8&discount=50')
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body.status).should.be.eql('Success');
                    done();
                });
        });
    });
    describe('Contest with default discount i.e - 20%', () => {
        it('participate in contest - 2', (done) => {
            chai.request(server)
                .get('/contest?userId=9')
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body.status).should.be.eql('Success');
                    done();
                });
        });
    });
});


