import app from '../../src/index';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { newRider } from '../mocks/authMocks';

chai.use(chaiHttp);

describe('/auth', () => {
    describe('POST /signup', () => {
        it('Return created new Rider => status code 200', done => {
            chai
                .request(app)
                .post('/auth/signup')
                .send(newRider)
                .end((err, res) => {
                    expect(res.status).equal(200);
                    expect(res.body.id).to.be.a('string');
                    done();
                });
        });

        it('Return validation error => status code 400', done => {
            chai
                .request(app)
                .post('/auth/signup')
                .send({})
                .end((err, res) => {
                    expect(res.status).equal(400);
                    expect(res.body.error).equal('"rider" is required');
                    done();
                });
        });

        it('Return is exist error => status code 400', done => {
            chai
                .request(app)
                .post('/auth/signup')
                .send(newRider)
                .end((err, res) => {
                    expect(res.status).equal(400);
                    expect(res.body.error).equal('Rider exist');
                    done();
                });
        });
    });
});
