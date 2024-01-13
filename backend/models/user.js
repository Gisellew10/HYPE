const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({

    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    userId: {type:String, required:true, unique:true},

},
{
    collection: 'users'
});

//Hashing password to secure
userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = bcryptjs.hashSync(this.password,10);
    }
    next();
})

module.exports = mongoose.model('users', userSchema);