import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config(
    {
        path: "./.env"
    }
);
const port= process.env.PORT  || 5000;
connectDB()
.then(()=>{
    app.listen(port, ()=>{
        console.log(`Server started on port ${port}`);
    })
    app.on("Error", (err)=>{
        console.error(`Error connecting  to the database: app.on ${err}`)
    })
})
.catch((error)=>{
    console.error(`Error connecting to MongoDB database DV : ${error}`);
})





























/*
// dotenv.config({
//     path: './.env'
// })
(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (err)=>{
            console.log('Error connecting to database', err)
            throw error
        })
        app.listen(port, ()=>{
            console.log( `Server is running on port ${port}` )
        })
    } catch (error) {
        console.error("Error ", error);
        throw error
    }
})()
*/





























// const app = express();
// const port = process.env.PORT;
// (async ()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("Error", (error)=> {
//             console.log("error", error);
//             throw error;
//         })
//         app.listen("port", ()=> {
//             console.log(`server is listening on ${port}`);
//         })
//     } catch (error) {
//         console.error(`ERROR: Database not connected ${error}`)
//         throw error;
//     }
// })()





