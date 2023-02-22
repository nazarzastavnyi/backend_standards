import mongoose from 'mongoose';
import { AVAILABLE_COUNTRIES} from './enums';

const { Schema } = mongoose;

const CarBrandModel = new Schema(
    {
        brand: {
            type: String,
            default: '',
        },
        model: {
            type: String,
            default: '',
        },
        status: {
            type: Boolean,
            default: true,
        },
        countries: {
            type: [String],
            default: [],
            enum: AVAILABLE_COUNTRIES,
        },
    }, 
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

CarBrandModel.index({
    countries: 1, brand: 1, model: 1, status: 1,
});
CarBrandModel.index({ brand: 1, model: 1, status: 1 });
CarBrandModel.index({ brand: 1, model: 1 }, { unique: true });

export { CarBrandModel };
export default mongoose.model('car-brand-models', CarBrandModel);
