import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import expressWs from 'express-ws';
import routes from '../routes';
import response from '../middleware/response';

// import db from '../config/db';

const app = express();

app.use(morgan('tiny'));
// app.use(multer().fields([{ name: 'files[]' }]));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(response);
expressWs(app);
const port = 3000;

routes(app);

app.get('/', (req, res) => {
  res.response.success({
    message: 'Hello World!'
  });
})


function start() {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  return app;
}

export default start;