import app from "./app"
import mongoose from "mongoose"
import env from "./util/validateEnv"

const port = env.PORT;

mongoose.connect(env.MONGODB_CONNECTION_STRING)
    .then(()=>{
        console.log("mongoose connected");
        app.listen(port,()=>{
            console.log("port is running " + port)
        })
    }).catch(console.error);
