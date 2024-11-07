const mongoose = require('mongoose')
const User = require('./user_model')

const approvalSchema = new  mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    status : {
        type: String,
        enum: ['approved', 'rejected', 'pending'],
        default: 'pending'
    },
    request_reason : {
        type: String,
        required: true
    },
    comments : {
        type: Array,
        default: null,
    },
    dump_data : {
        type : Map,
        of: mongoose.Schema.Types.Mixed
    },
    dummy2: {
        type : [{ type: mongoose.Schema.Types.ObjectId, ref: User}]
    },
    created_at : {
        type: Date,
        default: Date.now
    },
    updated_at : {
        type: Date,
        default: null
    }
})

const Approval = mongoose.model('approval_requests', approvalSchema)
module.exports = Approval
