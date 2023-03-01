import app from '../../src/index';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { newRider,loginRider } from '../mocks/authMocks';

let globalToken = '';
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
                    expect(res.body.data.id).to.be.a('string');
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
                    expect(res.body.data.error).equal('"rider" is required');
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
                    expect(res.body.data.error).equal('Rider exist');
                    done();
                });
        });
    });
    describe('POST /login', () => {
        it('Return created new Rider => status code 200', done => {      
            chai
                .request(app)
                .post('/auth/login')
                .send(loginRider)
                .end((err, res) => {
                    expect(res.status).equal(200);
                    expect(res.body.data.token).to.be.a('string');
                    globalToken = res.body.data.token;
                    done();
                });
        });

        it('Return validation error => status code 400', done => {
            chai
                .request(app)
                .post('/auth/login')
                .send({})
                .end((err, res) => {
                    expect(res.status).equal(400);
                    expect(res.body.data.error).equal('"email" is required');
                    done();
                });
        });
    });
    describe('POST /logout', () => {
        it('Return logout Rider => status code 200', done => {      
            chai
                .request(app)
                .post('/auth/logout')
                .set('Authorization', 'Bearer ' + globalToken)
                .send({})
                .end((err, res) => {
                    expect(res.status).equal(200);
                    expect(res.body.data.success).to.be.a('boolean').equal(true);
                    done();
                });
        });

        it('Return unauthorized error => status code 401', done => {
            chai
                .request(app)
                .post('/auth/logout')
                .send({})
                .end((err, res) => {
                    expect(res.status).equal(401);
                    expect(res.body.error).equal('not authenticated');
                    done();
                });
        });
    });
});
