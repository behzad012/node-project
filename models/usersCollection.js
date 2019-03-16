const mongoose = require('mongoose');
const mongooseUnique = require('mongoose-unique-validator');

let userRegisterSchema = new mongoose.Schema({
    name:  {
      type:String,
      required:true,
      index: true
    },
    password:  {
      type:String,
      required: true
    },
    created_at: {
      type: Date, 
      default: Date.now
    },
    updated_at: {
      type: Date, 
      default: Date.now
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
      required: true
    },
    tags: [String]
  }); 
  
userRegisterSchema.plugin(mongooseUnique,{message:'آدرس ایمیل تکراری است'});
module.exports = mongoose.model('users',userRegisterSchema,'users');