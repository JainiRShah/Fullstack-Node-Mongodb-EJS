var mongoose=require('mongoose');

// Database Connectivity
mongoose.connect('mongodb://localhost:27017/backend');
mongoose.connection.on('open',function() {
    console.log('Mongoose connected.');
});

Schema = mongoose.Schema;

// Create User Schema
var User=new Schema({
  username:{
      type:String
    },
    email:{
      type:String
    },
    phone: {
      type: String
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other']
    },
    hobbies: [{
      type: String
    }],
    country: {
      type: String
    },
    address: {
      type: String 
    },
    pincode: {
      type: String
    },
    image: {
      type: String
    },
   
});

// Create Auth Schema
var Auth=new Schema({
  fname:{type:String},
  lname:{type:String},
  email:{type:String},
  password:{type:String},
  token:{type: String},
  otp:{type: String}
});

var UserModel=mongoose.model('User',User);  
var AuthModel=mongoose.model('Auth',Auth);  

module.exports = {
  UserModel,
  AuthModel
}