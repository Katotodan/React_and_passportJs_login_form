const mongoose = require("mongoose")
const schema = new mongoose.Schema({ 
    username: {
        type: String,
        require:true
    }, 
    password: {
        type: String,
        require:true
    },
    email:{
        type: String,
    }
});
const UserModel = mongoose.model('users', schema);

module.exports = UserModel