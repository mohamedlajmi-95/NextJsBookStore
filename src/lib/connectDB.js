import mongoose from "mongoose";
const connectDB=async()=> {
try{
await mongoose.connect(process.env.DATABASE_URL,{
useNewUrlParser:true,
useUnifiedTopology:true
});
console.log("connexion a la base de donnée réussie")
}catch(error){
throw new Error("errur de connexion a la base de données")
}
}
export default connectDB;