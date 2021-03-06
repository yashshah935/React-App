import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        mobile_num:{type: Number, required: true},
        email: { type: String, required: true, unique: true },
        password: { type:String, required: true },
        shopRegisterFlag:{type:Boolean,required:true , default:false}
    }
)

const Owner = mongoose.model("Owner", ownerSchema);
export default Owner;