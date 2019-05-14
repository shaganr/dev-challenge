import { setUser, store } from '../../../helpers';

export default async function User(root, { user }, { ctx }, info) {
  // DONE todo: 1 this throws a unfriendly (and potentially unsafe) error if a non-existnant user ID is entered.
  // how can we check for a non-existing user id and throw a more friendly error.

  /**
   *
   *  The try catch will effectively prevent the true error
   *  since if it fails, the catch block will be triggered which
   *  will display a friendly error.
   *
   */

  // todo: 2 why is this update overwriting existing user data? Need to fix this so that just data input is
  // updated rather than overwritting all the data.
  try {
    await setUser(user);
  } catch (error) {
    throw new Error(
      'Unable to update user at this time! Check to see if the user id is correct!'
    );
  }

  return true;
}
