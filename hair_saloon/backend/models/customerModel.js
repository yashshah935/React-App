import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        mobile_num:{type: Number, required: true},
        email: { type: String, required: true, unique: true },
        password: { type:String, required: true },
        location_id:{type: String, required: true}
    }
)


const Customer = mongoose.model("Customer", customerSchema);
export default Customer;