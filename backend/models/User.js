const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
   username: String,
   lastname: String,
   firstname: String,
   email: String,
   password: String,
   orientation: String,
   sexe: String,
   age: String,
   bio: String,
});

const imgSchema = new Schema({
    path: String,
    fieldname: String
})

mongoose.model('users', userSchema);
mongoose.model('imgs', imgSchema)