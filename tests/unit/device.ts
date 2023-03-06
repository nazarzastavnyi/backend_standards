import { DeviceService } from '../../src/device/service';
import sinon from 'sinon';
import deviceSchema from '../../src/device/models';
import { expect } from 'chai';
import { newDevice,newDevice1 } from '../mocks/deviceMocks';
import mongoose from 'mongoose';

describe('Unit test for create device service', () => {
    let deviceService : DeviceService;
    beforeEach(() => {
        deviceService = new DeviceService();
        sinon.stub(deviceSchema, 'create').resolves(newDevice);
        sinon.stub(deviceSchema, 'findOne').resolves(newDevice);
        sinon.stub(deviceSchema, 'find').resolves([]);
        sinon.stub(deviceSchema, 'findOneAndUpdate').resolves(newDevice1);
        sinon.stub(deviceSchema, 'findOneAndDelete').resolves(newDevice1);
    });

    afterEach(() => {
        sinon.restore();
    });
    it('Should add a new device',async() => {
        expect(await deviceService.create(newDevice)).to.equal(newDevice);
    });
    it('Should findOne device',async() => {
        expect(await deviceService.get('1')).to.equal(newDevice);
    });
    it('Should findAll devices',async() => {
        expect(await deviceService.getList()).to.be.a('array');
    });
    it('Should update device',async() => {  
        expect(await deviceService.update(newDevice1)).to.equal(newDevice1);
    });
    it('Should delete device',async() => {
        expect(await deviceService.delete('1')).to.equal(newDevice1);
    }); 
});
