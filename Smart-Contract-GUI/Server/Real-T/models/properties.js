const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 50, minlength: 1 },
    addr: { type: String, required: true, minlength: 1 },
    rented: { type: Boolean, required: false },
    rentInterval: { type: Number, required: true, minlength: 4 },
    rentAmount: { type: Number, required: true, min: 0 },
    warningLimit: { type: Boolean, required: true },
    tenantWarning: { type: Number, required: false },
    dueDate: { type: Number, required: false },
    tenant: { type: String, required: true, 
        match: [/^0x[a-fA-F0-9]{40}$/, "Invalid ethereum address"]
    },
})

const RealT_DB = mongoose.connection.useDb('real-t');
const propertyModel = RealT_DB.model('Property', PropertySchema);
module.exports = propertyModel;



