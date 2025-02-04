import mongoose from 'mongoose'

const designSchema = new mongoose.Schema({
    name: {type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    category:{type:String,required:true},
    image:{type:String,required:true}
})

const DesignModel = mongoose.models.design || mongoose.model("design",designSchema)

export default DesignModel;