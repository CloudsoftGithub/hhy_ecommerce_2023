import { Schema, models,model } from "mongoose";

const OrderSchema = new Schema({
    line_items: Object,
    name: String,
    email: String,
    phoneno: String,
    city: String,
    streetAddress: String,
    state_of_delivery: String,
    country: String,
    payment_method: String,
    order_status: String,
    paid: Boolean,
},
{
    timestamp: true,
});

export const Order = models?.Order || model('Order', OrderSchema);