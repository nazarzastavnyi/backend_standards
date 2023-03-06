import { AuthService } from '../../src/auth/service';
import sinon from 'sinon';
import riderModel from '../../src/auth/models';
import { newRider,loginRider } from '../mocks/authMocks';
import { expect } from 'chai';
import bcrypt from 'bcrypt';

describe('Unit test for auth service logic', async() => {
    let authService: AuthService;
    beforeEach(() => {
        authService = new AuthService();
        sinon.stub(riderModel, 'create').resolves(newRider);
        sinon.stub(riderModel, 'findOne').resolves(loginRider);
        sinon.stub(bcrypt, 'compare').resolves(loginRider.password);
        sinon.stub(riderModel, 'findOneAndUpdate').resolves(loginRider);
        sinon.stub(riderModel, 'findOneAndReplace').resolves(true);
    });

    afterEach(() => {
        sinon.restore();
    });

    it('Check create new rider',async() => {
        expect(await authService.registerRider(newRider)).to.equal(newRider);
    });
    it('Check find by Email', async () => {
        expect(await authService.getRiderByEmail('test')).to.equal(loginRider);
    });
    it('Check login', async() => {
        expect(await authService.login(loginRider)).to.be.a('string');
    });
    it('Check logout', async() => {
        expect(await authService.logout('test@gmail.com')).to.equal(true);
    });

});

