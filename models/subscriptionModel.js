const mongoose = require('mongoose');
//const ObjectId = mongoose.Schema.Types.ObjectId;

const subscriptionSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
        trim: true,
        ref: 'User'
    },
    plan_id : {
        type : String,
        enum : ["FREE","TRIAL","LITE_1M","PRO_1M","LITE_6M","PRO_6M"]
    },
    status:{
        type: String,
        enum : ["SUCCESS","FAILURE"]
    },
    start_date :{type: Date
    },
    amount : {
        type : Number,
        
    },
    validTill : Date

        }, { timestamps: true })

module.exports = mongoose.model('Subscription', subscriptionSchema)