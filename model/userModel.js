const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
name:{
    type: String,
    required: true
},
email:{
    type:String,
    required: true,
},
password:{
    type:String,
    require:true
},
role:{
    type:String,
    enum:["ORGANIZER" , "CUSTOMER"]
}
});

module.exports = mongoose.model("User", userSchema);


