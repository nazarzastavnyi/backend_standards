import riderModel from './models';
import { Rider, Login } from './interfaces';
import bcrypt from 'bcrypt';
import { security } from '../shared/security';

export class AuthService {

    async getRiderByEmail(email: string) {
        return riderModel.findOne({ email });
    }

    async registerRider(rider: Rider) {
        const newRider = await riderModel.create(rider);

        return newRider;
    }

    async login(data: Login): Promise<boolean | string> {
        const rider = await this.getRiderByEmail(data.email);

        if (!await bcrypt.compare(data.password, rider.password)) {
            return false;
        }

        const token = security.generateSpecificToken({ email: rider.email }, '7d');
        rider.token = token;
        await rider.save(); 

        return token;
    }

    async logout(email: string): Promise<boolean> {
        const rider = await this.getRiderByEmail(email);

        rider.token = '';
        await rider.save(); 

        return true;
    }
}
