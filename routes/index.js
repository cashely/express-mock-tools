import reference from './reference';
import project from './project';
import document from './document';
import folder from './folder';
import schema from './schema';
import mock from './mock';
import user, { loginRouter, signUpRouter } from './user';
import documentLog from './documentLog';
import upload from './upload';
import schedule from './schedule';
export default (app) => {
  app.use('/mock', mock);
  app.use('/project', project);
  app.use('/reference', reference);
  app.use('/document', document);
  app.use('/schema', schema);
  app.use('/folder', folder);
  app.use('/user', user);
  app.use('/login', loginRouter);
  app.use('/signUp', signUpRouter);
  app.use('/logs', documentLog);
  app.use('/upload', upload);
  app.use('/schedule', schedule);
  app.ws('/socket', (ws, req) => {
    console.log('链接了', ws);
    ws.on('message', (msg) => {
      console.log('收到了', msg);
    })
    setInterval(() => {
      ws.send('hello');
    }, 2000)
  })
}