import { CarBrandService } from '../../src/carbrand/service';
import sinon from 'sinon';
import carBrandModel from '../../src/carbrand/models';
import { expect } from 'chai';
import { newCarBrand,newCarBrand1 } from '../mocks/carBrandMocks';
import { CarBrand } from '../../src/carbrand/intarfaces';

describe('Unit test for carBrandService', () => {
    let carBrandServices : CarBrandService;
    carBrandServices = new CarBrandService();
    beforeEach(() => {
        carBrandServices = new CarBrandService();
        sinon.stub(carBrandModel, 'create').resolves(newCarBrand);
        sinon.stub(carBrandModel, 'findById').resolves(newCarBrand);
        sinon.stub(carBrandModel, 'find').resolves([]);
        sinon.stub(carBrandModel, 'findByIdAndUpdate').resolves(newCarBrand1);
        sinon.stub(carBrandModel, 'findByIdAndDelete').resolves(newCarBrand1);
    });

    afterEach(() => {
        sinon.restore();
    });

    it('Should add a new carBrand',async() => {
        expect(await carBrandServices.create(newCarBrand as CarBrand)).to.equal(newCarBrand);

    });
    it('Should findOne carBrand',async() => {

        expect(await carBrandServices.get('1')).to.equal(newCarBrand);
    });
    it('Should findAll carBrands',async() => {
        expect(await carBrandServices.getList()).to.be.a('array');
    });
    it('Should update carBrand',async() => {  
        expect(await carBrandServices.update(newCarBrand1 as CarBrand)).to.equal(newCarBrand1);
    });
    it('Should delete carBrand',async() => {
        expect(await carBrandServices.delete('1')).to.equal(newCarBrand1);
    }); 
});
