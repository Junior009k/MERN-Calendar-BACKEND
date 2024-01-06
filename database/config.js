const mongoose=require('mongoose');
require('dotenv').config();


const dbConnection= async()=>{


    try{
         await mongoose.connect(process.env.DB_CONN);
         console.log("DB ONLINE");
    }
    catch(error){
        console.log(error);
        throw new Error("error al inicializar base de datos")
    }
}

module.exports={dbConnection}