import mongoose from 'mongoose'


export async function connect(){
    try{
mongoose.connect(process.env.MONGO_URL!);
const connection  = mongoose.connection;
connection.on('connected',()=>{
    console.log('Mongodb connected successsfully')
})
connection.on('error',(err)=>{
    console.log("Mongo db connection error", err);
    process.exit();
})
    }catch(err){
        console.log(err)
    }
}