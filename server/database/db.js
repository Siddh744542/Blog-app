import mongoose from "mongoose";

const Connection = async (Username, Password)=>{
    const URL =`mongodb+srv://${Username}:${Password}@blog-app.mbdlujq.mongodb.net/?retryWrites=true&w=majority`;
    try {
        mongoose.connect(URL, {useNewUrlParser : true});
        console.log("database connected successfully");
    } catch(err) { 
        console.log(err);
    }   
}

export default Connection;