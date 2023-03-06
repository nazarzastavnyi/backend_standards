import app from '../../src/index';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { newDevice } from '../mocks/deviceMocks';
import { loginRider } from '../mocks/authMocks';


let globalToken = '';
let id = '';
chai.use(chaiHttp);

describe('//device//',() => {
    describe('GET JWT',() => {
        it('Return login Rider => status code 200', done => {      
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
    });
    describe('POST /device',() => {
        it('Return new Device => status code 200',done => {
            chai
                .request(app)
                .post('/device')
                .set('Authorization', 'Bearer ' + globalToken)
                .send(newDevice)
                .end((err,res) => {
                    expect(res.status).equal(200);
                    expect(res.body.data._id).to.be.a('string');
                    expect(res.body.success).equal(true);
                    id = res.body.data._id;
                    done();
                });
        });
        it('Return unauthorized error => status code 401', done => {
            chai
                .request(app)
                .post('/device')
                .send(newDevice)
                .end((err,res) => {
                    expect(res.status).equal(401);
                    done();
                });
        });
        it('Return validation error => status code 400', done => {
            chai
                .request(app)
                .post('/device')
                .set('Authorization', 'Bearer ' + globalToken)
                .send({})
                .end((err,res) => {
                    expect(res.status).equal(400);
                    done();
                });
        });
    }); 
    describe('GET /deviceList',() => {
        it('Return  deviceList => status code 200',done => {
            chai
                .request(app)
                .get('/deviceList')
                .set('Authorization', 'Bearer ' + globalToken)
                .end((err,res) => {
                    expect(res.status).equal(200);
                    expect(res.body.data).to.be.a('array');
                    expect(res.body.data.length).equal(1);
                    done();
                });
        });
        it('Return unauthorized error => status code 401', done => {
            chai
                .request(app)
                .get('/deviceList')
                .end((err,res) => {
                    expect(res.status).equal(401);
                    done();
                });
        });
    });
    describe('GET by ID /device/:id',() => {
        it('Return a device by ID => status code 200',done => {
            chai
                .request(app)
                .get('/device/' + id)
                .set('Authorization', 'Bearer ' + globalToken)
                .end((err,res) => {
                    expect(res.status).equal(200);
                    expect(res.body.success).equal(true);
                    done();
                });
        });
        it('Return unauthorized error => status code 401', done => {
            const id = '63fdb663ea8a09a3edebe02a';
            chai
                .request(app)
                .get('/device/' + id)
                .end((err,res) => {
                    expect(res.status).equal(401);
                    done();
                });
        });
        it('Return not found => status code 404', done => {
            chai
                .request(app)
                .get('/device/')
                .set('Authorization', 'Bearer ' + globalToken)
                .end((err,res) => {
                    expect(res.status).equal(404);
                    done();
                });
        });
    });
    describe('PUT /device/update',() => {
        it('Return updated device => status code 200',done => {
            chai
                .request(app)
                .put('/device/update')
                .set('Authorization', 'Bearer ' + globalToken)
                .send({
                    _id:id,
                    device_id:'1',
                    platform: 'ios',
                })
                .end((err,res) => {
                    expect(res.status).equal(200);
                    expect(res.body.success).equal(true);
                    done();
                });
        });
        it('Return unauthorized error => status code 401', done => {
            chai
                .request(app)
                .put('/device/update')
                .send({})
                .end((err,res) => {
                    expect(res.status).equal(401);
                    done();
                });
        });
        it('Return validation error => status code 400', done => {
            chai
                .request(app)
                .put('/device/update')
                .set('Authorization', 'Bearer ' + globalToken)
                .send({platform: 'ios',})
                .end((err,res) => {
                    expect(res.status).equal(400);
                    done();
                });
        });
    }); 
    describe('DELETE by ID /device/:id',() => {
        it('Should delete by ID => status code 200',done => {
            chai
                .request(app)
                .delete('/device/' + id)
                .set('Authorization', 'Bearer ' + globalToken)
                .end((err,res) => {
                    expect(res.status).equal(200);
                    expect(res.body.success).equal(true);
                    done();
                });
        });
        it('Return unauthorized error => status code 401', done => {
            const id = '63fdb663ea8a09a3edebe02a';
            chai
                .request(app)
                .delete('/device/' + id)
                .end((err,res) => {
                    expect(res.status).equal(401);
                    done();
                });
        });
        it('Return not found device => status code 404', done => {
            chai
                .request(app)
                .delete('/device/')
                .set('Authorization', 'Bearer ' + globalToken)
                .end((err,res) => {
                    expect(res.status).equal(404);
                    done();
                });
        });
    });
});
