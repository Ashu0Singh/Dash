import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    min: 2,
    max: 50
  },
  email:{
    type: String,
    required: true,
    min: 2,
    max: 50,
    unique: true
  },
  password:{
    type: String,
    required:true,
    min: 6
  },
  phoneNumber: {
    type: String,
    max: 10,
    min:10
  },
  role: {
    type: String,
    enum: ['user','admin','superadmin'],
    default: 'admin'
  },
  city: String,
  state: String,
  country: String,
  occupation: String
},{ timestamps: true});

const User = mongoose.model('User',userSchema);

export default User;