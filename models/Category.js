import mongoose, {model, models, Schema} from "mongoose";


const CategorySchema = new Schema({
    name: {type:String,required:true},
    images: [{type:String}],
    parent: {type:mongoose.Schema.Types.ObjectId, ref:'Category'},
    properties: [{type:Object}]
    
}
, {
    timestamps: true,
});


export const Category = models?.Category || model('Category', CategorySchema);