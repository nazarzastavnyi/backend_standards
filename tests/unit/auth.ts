import { AuthService } from '../../src/auth/service';
import sinon from 'sinon';
import riderModel from '../../src/auth/models';
import { newRider } from '../mocks/authMocks';
import { expect } from 'chai';

describe('Unit test for auth service logic', async() => {
    let authService: AuthService;
    beforeEach(() => {
        authService = new AuthService();
        sinon.stub(riderModel , 'findOne').resolves(newRider);
    });

    afterEach(() => {
        sinon.restore();
    });

    it('Check find by Email', async () => {
        expect(await authService.getRiderByEmail('test')).to.equal(newRider);
    });
});
