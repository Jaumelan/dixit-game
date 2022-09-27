import express from 'express';
import routes from './routes';
/*
setInterval(async () => {
    const timeNow = new Date().getTime() 
    const time = await timeToContinueArray
    time.forEach(set =>{
        if(set < timeNow) {
            executar continue
            deletar o set
        }   })
},1000)()
*/
import cors from 'cors';

const apCors = cors({ origin: '*' });

const app = express();

app.use(apCors);
app.use(routes);
export { app };
