import fs from 'fs';
import util from 'util';

const readDir = util.promisify(fs.readdir);

import { getUser, store } from '../../../helpers';

export default async function users(root, args, { ctx }, info) {
  const files = await readDir('./data/users');

  // todo: 3. can we accept a input variable into the graphql query to only show certain users? Maybe allowing
  //  filter by name to begin with.

  // DONE todo: 5. getting this list of all users is slow.  Would be really cool if it could return all the users
  //  in a more performant way.  Keeping in mind that the underlaying JSON files may get updated.

  /**
   *
   * Instead of constantly filtering through the users,
   * a stored results of the users in memory will allow the
   * fastest retrieval of the data.
   *
   * If the underlying data in the json changes, fs.watch watches
   * the files for changes and updates the store accordingly.
   *
   * Note: It would be more perfomant to change that instance
   * that was changed and putting the values in a Map() for easier
   * retrieval to change/update/remove.
   *
   *
   */

  // console.time('old');
  // let users = files
  //   .filter(filename => filename.includes('.json'))
  //   .map(async filename => getUser(filename.replace('.json', '')));
  // console.timeEnd('old');

  console.time('new');
  users = store;
  console.timeEnd('new');

  return users;
}
