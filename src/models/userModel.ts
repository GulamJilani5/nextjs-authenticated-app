
import mongoose from 'mongoose';
// const Schema = mongoose.Schema;
// interface IUser extends Document {
//   username: string;
//   email: string;
//   password: String;
//   isVerified: Boolean;
//   isAdmin: Boolean;
//   forgotPasswordToken: String;
//   forgotPasswordTokenExpiry: Date;
//   verifyToken:String;
//   verifyTokenExpiry:Date;
// }

// const userSchema = new Schema<IUser>({
// const userSchema = new Schema({
    const userSchema = new mongoose.Schema({
        username:{
            type: String,
            required: [true, 'Please proivde a username'],
            },
        email:{
            type: String,
            required: [true, 'Please proivde a email'],
            unique: true,
        },
        password:{
            type: String,
            required: [true, 'Please proivde a password'],
        },
        isVerified:{
            type: Boolean,
            default: false
        },
        isAdmin:{
            type: Boolean,
            default: false
        },

        forgotPasswordToken: String,
        forgotPasswordTokenExpiry: Date,
        verifyToken:String,
        verifyTokenExpiry:Date,
})
console.log("User in userModel...A ", mongoose.models.users)
const User:any = mongoose.models.users || mongoose.model('User', userSchema);
console.log("User in userModel...B ", User)
// const User = mongoose.models.users || mongoose.model('users', userSchema);
// const User = mongoose.models.users || mongoose.model('User', userSchema);   // If there is now 'users' collection in the database then it wll create new one.
//Typescript
// const User:Model<IUser>= mongoose.model<IUser>('User', userSchema);   // If there is now 'users' collection in the database then it wll create new one.
// module.exports = mongoose.model('User', userSchema);   // If there is now 'users' collection in the database then it wll create new one.

// module.exports = mongoose.model('users', userSchema);

// module.exports = User; // Commonly used in nodejs/commonjs
export default User;  // ES6