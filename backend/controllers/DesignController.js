import DesignModel from "../models/DesignModel.js";
import fs from 'fs';

//add design item
const addDesign = async(req,res)=>{
    let image_filename = `${req.file.filename}`;

    const design = new DesignModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try {
        await design.save();
        res.json({success:true,message:"Design Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

//all design list
const listDesign = async(req,res)=>{
    try {
        const designs = await DesignModel.find({});
        res.json({success:true,data:designs})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//remove design item
const removeDesign = async(req,res)=>{
    try {
        const design = await DesignModel.findById(req.body.id);
        fs.unlink(`uploads/${design.image}`,()=>{})

        await DesignModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Design Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

export {addDesign,listDesign,removeDesign}