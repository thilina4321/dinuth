const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PaymentSchema = new Schema({
    recordId:{
        type:Schema.Types.ObjectId,
        ref:'ServiceRecord'
    },
    customerId:{
        type:Schema.Types.ObjectId,
        ref:'Customer'
    },
    amount:{
        type:Number
    },
    paymentDate:{
        type:Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Payment', PaymentSchema)