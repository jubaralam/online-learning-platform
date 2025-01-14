const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
    payment_Id: { type: String, required: true },
    payment_status: { 
        type: String, 
        required: true, 
        enum: ["Paid", "Pending", "Failed", "Refunded"] 
    },
    payment_date: { type: Date, default: Date.now },
    amount: { 
        type: Number, 
        required: true, 
        validate: {
            validator: function(value) {
                return value > 0;
            },
            message: "Amount must be greater than zero."
        }
    },
    
    payment_method: { 
        type: String, 
        required: true, 
        enum: ["Card", "UPI", "Bank Transfer", "Wallet"] 
    },
    currency: { type: String, default: "INR" },
    learner_Id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    enrollment_Id: { type: mongoose.Schema.Types.ObjectId, ref: "enrollment" },
    gateway_transaction_Id: { type: String },
    notes: { type: String }
});

const PaymentModel = mongoose.model("payment", paymentSchema);

module.exports = PaymentModel;
