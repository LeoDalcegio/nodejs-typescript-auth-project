'use-strict';

import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6,
        select: false
    }
},{
    timestamps: true
});

UserSchema.plugin(mongoosePaginate);

export default mongoose.model('User', UserSchema);
