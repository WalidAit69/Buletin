import express from 'express';
import cors from 'cors';
import { mongoose } from 'mongoose';
import router from './router/route.js'
import morgan from "morgan";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import staticMiddleware from './staticMiddleware.cjs';



const app = express();


app.use('/uploads', staticMiddleware);
app.use(bodyParser.json());
app.use(express.json());
// app.use(cors({credentials:true,origin:'http://localhost:5173'}));
app.use(cors({credentials:true,origin:'https://buletin-v2.vercel.app'}));
app.disable("x-powered-by");
app.use(morgan("tiny"));
app.use(cookieParser());





app.get('/' , (req,res)=>{
    res.send('Home get Request');
})


// api routes
app.use('/api',router)




// Start Server only whe we have valid connection
mongoose.connect('mongodb+srv://walidait:samyboy2001..@cluster0.ksqig4m.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    try {
      app.listen(4000, () => console.log('app running on port 4000!'));
    } catch (error) {
        console.log("cannot connect to the server");
    }
  }).catch(error =>{
    console.log("invalid database")
  });

