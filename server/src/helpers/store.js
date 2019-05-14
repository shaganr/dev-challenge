import fs from 'fs';
import util from 'util';
import getUser from './getUser';
import path from 'path';

const readDir = util.promisify(fs.readdir);
const ROOT_DIR = path.resolve(path.join(__dirname, '../../data'));
let store;

const setup = async () => {
  const files = await readDir('./data/users');

  let users = files
    .filter(filename => filename.includes('.json'))
    .map(filename => getUser(filename.replace('.json', '')));

  return users;
};

fs.watch(`${ROOT_DIR}/users`, (eventType, filename) => {
  // update store on file change
  store = setup();
});

store = setup();

export default store;
