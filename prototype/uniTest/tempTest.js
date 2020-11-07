const app = require('../app');
const chai = require('chai');
const mocha = require('mocha');
const chaiHTTP = require('chai-http');
const {expect} = chai;
const {describe} = mocha;

chai.use(chaiHTTP);

describe('weatherAPI', () => {
    it('should return 200 success code', function () {
        chai.request(app)
            .post('/current')
            .end((err, response) => {
                expect(response).to.have.status(400);
                //expect(response.body.message).not.to.include('fred');
                done()
            })
    });
    it('should be html', function () {
        chai.request(app)
            .post('/current')
            .end((err, response) => {
                expect(response.body.message).to.be.html;
                done()
            })
    });
    it('should not include', function () {
        chai.request(app)
            .post('/current')
            .end((err, response) => {
                expect(response.body.message).not.to.include('fred');
                done()
            })
    });

})
