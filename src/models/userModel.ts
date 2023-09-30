
import mongoose, { Document, Model, Schema } from 'mongoose';

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
const userSchema = new Schema({

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

// const User = mongoose.model.users || mongoose.model('User', userSchema);
// const User = mongoose.model.users || mongoose.model('users', userSchema);
// const User = mongoose.model.users || mongoose.model('User', userSchema);   // If there is now 'users' collection in the database then it wll create new one.
//Typescript
// const User:Model<IUser>= mongoose.model<IUser>('User', userSchema);   // If there is now 'users' collection in the database then it wll create new one.
const User = mongoose.model('User', userSchema);   // If there is now 'users' collection in the database then it wll create new one.

// module.exports = mongoose.model('users', userSchema);

// module.exports = Tour;
export default User;