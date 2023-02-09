import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import bcrypt from 'bcrypt';

import { Gender } from './enums';
import { deviceSchema } from '../device/models';

const { Schema } = mongoose;

const riderSchema = new Schema(
    {
        rider: {
            type: String,
            required: 'rider is required',
        },
        full_name: {
            type: String,
            minlength: 0,
            maxlength: 100,
            default: '',
        },
        first_name: {
            type: String,
            minlength: 0,
            maxlength: 50,
            default: '',
        },
        last_name: {
            type: String,
            minlength: 0,
            maxlength: 50,
            default: '',
        },
        password: {
            type: String,
        },
        profile_picture: {
            type: String,
        },
        email: {
            type: String,
            minlength: 5,
            maxlength: 50,
            match: /\S+@\S+\.\S+/,
            unique: true
        },
        birthday: {
            type: Date,
        },
        gender: {
            type: String,
            default: Gender.Undisclosed,
            enum: Gender,
        },
        rating: {
            type: Number,
            default: 5,
            min: 0,
            max: 5,
        },
        devices: [
            {
                type: deviceSchema,
                default: {},
            },
        ],
        token: {
            type: String,
            default: '',
        }
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

riderSchema.index({ rider: 1 });
riderSchema.index({ updated_at: 1 });

riderSchema.plugin(mongoosePaginate);

riderSchema.pre('save', function(next) {
    const rider = this;

    // only hash the password if it has been modified (or is new)
    if (!rider.isModified('password')) return next();

    bcrypt.genSalt(function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(rider.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            rider.password = hash;
            next();
        });
    });
});

riderSchema.methods = {
    publicProfile() {
        return {
            _id: this._id,
            rider: this.rider,
            email: this.email,
            fullName: this.fullName,
            gender: this.gender,
            phone: this.phone,
            rating: Number(this.rating.toFixed(1)),
            first_name: this.firstName,
            last_name: this.lastName,
        };
    },
};

export { riderSchema };
export default mongoose.model('riders', riderSchema);
