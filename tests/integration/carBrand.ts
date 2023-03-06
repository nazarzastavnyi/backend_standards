import app from '../../src/index';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { newCarBrand } from '../mocks/carBrandMocks';
import { loginRider } from '../mocks/authMocks';

let globalToken = '';
let id = '';
chai.use(chaiHttp);

describe('/carBrand/',() => {
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
    describe('POST /carBrand',() => {
        it('Return new carBrand => status code 200',done => {
            chai
                .request(app)
                .post('/carBrand')
                .set('Authorization', 'Bearer ' + globalToken)
                .send(newCarBrand)
                .end((err,res) => {
                    expect(res.status).equal(200);
                    expect(res.body.data._id).to.be.a('string');
                    id = res.body.data._id;
                    done();
                });
        });
        it('Return unauthorized error => status code 401', done => {
            chai
                .request(app)
                .post('/carBrand')
                .send(newCarBrand)
                .end((err,res) => {
                    expect(res.status).equal(401);
                    done();
                });
        });
        it('Return validation error => status code 400', done => {
            chai
                .request(app)
                .post('/carBrand')
                .set('Authorization', 'Bearer ' + globalToken)
                .send({
                    countries:['BBBB']
                })
                .end((err,res) => {
                    expect(res.status).equal(400);
                    done();
                });
        });
    }); 
    describe('GET /carBrandList',() => {
        it('Return list carBrands => status code 200',done => {
            chai
                .request(app)
                .get('/carBrandList')
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
                .get('/carBrandList')
                .end((err,res) => {
                    expect(res.status).equal(401);
                    done();
                });
        });
    });
    describe('GET by ID /carBrand/:id',() => {
        it('Return a carBrand by ID => status code 200',done => {
            chai
                .request(app)
                .get('/carBrand/' + id)
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
                .get('/carBrand/' + id)
                .end((err,res) => {
                    expect(res.status).equal(401);
                    done();
                });
        });
        it('Return not found => status code 404', done => {
            chai
                .request(app)
                .get('/carBrand/')
                .set('Authorization', 'Bearer ' + globalToken)
                .end((err,res) => {
                    expect(res.status).equal(404);
                    done();
                });
        });
    });
    describe('PUT /carBrand/update',() => {
        it('Return updated carBrand => status code 200',done => {
            chai
                .request(app)
                .put('/carBrand/update')
                .set('Authorization', 'Bearer ' + globalToken)
                .send({
                    _id:id,
                    brand: 'new1',
                    model: 'new1',
                    status: false,
                    countries: ['MA']
                })
                .end((err,res) => {
                    expect(res.status).equal(200);
                    done();
                });
        });
        it('Return unauthorized error => status code 401', done => {
            chai
                .request(app)
                .put('/carBrand/update')
                .send({})
                .end((err,res) => {
                    expect(res.status).equal(401);
                    done();
                });
        });
        it('Return validation error => status code 400', done => {
            chai
                .request(app)
                .put('/carBrand/update')
                .set('Authorization', 'Bearer ' + globalToken)
                .send({countries: ['BBBB']})
                .end((err,res) => {
                    expect(res.status).equal(400);
                    done();
                });
        });
    }); 
    describe('DELETE by ID /carBrand/:id',() => {
        it('Should delete by ID => status code 200',done => {
            chai
                .request(app)
                .delete('/carBrand/' + id)
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
                .delete('/carBrand/' + id)
                .end((err,res) => {
                    expect(res.status).equal(401);
                    done();
                });
        });
        it('Return not found carBrand => status code 404', done => {
            chai
                .request(app)
                .delete('/carBrand/')
                .set('Authorization', 'Bearer ' + globalToken)
                .end((err,res) => {
                    expect(res.status).equal(404);
                    done();
                });
        });
    });
});
