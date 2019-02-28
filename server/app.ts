import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import {
  addUserFn,
  checkTokenAuth,
  checkUserExist,
  deleteUserFn, getCurrentUserFn,
  getUserFn, getUsersFilterFn,
  getUsersFn,
  loginUserFn, logoutUserFn, updateCurrentUserFn, updatePasswordFn,
  updateUserFn
} from './server/serverWorker';
import { checkToken } from './server/middleware';
import * as cookieParser from 'cookie-parser';

const options = {
  origin: 'http://localhost:9001',
  credentials: true
};

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors(options));
app.use(cookieParser());

app.listen(port, () => {
  console.log(`Server was started on ${port} port`);
});
app.get('/users', checkToken, (req, res) => getUsersFn(req, res));
app.get('/users/:id', checkToken, (req, res) => getUserFn(req, res));
app.get('/users/check/:name', (req, res) => checkUserExist(req, res));
app.post('/users/add', checkToken, (req, res) => addUserFn(req, res));
app.put('/users/:id', checkToken, (req, res) => updateUserFn(req, res));
app.delete('/users/:id', checkToken, (req, res) => deleteUserFn(req, res));
app.post('/account/register', (req, res) => addUserFn(req, res));
app.post('/account/login', (req, res) => loginUserFn(req, res));
app.post('/account/logout', (req, res) => logoutUserFn(req, res));
app.get('/account/auth', (req, res) => checkTokenAuth(req, res));
app.post('/account/updatePassword', (req, res) => updatePasswordFn(req, res));
app.post('/users/search', (req, res) => getUsersFilterFn(req, res));
app.get('/currentUser', checkToken, (req, res) => getCurrentUserFn(req, res));
app.put('/currentUser', checkToken, (req, res) => updateCurrentUserFn(req, res));
