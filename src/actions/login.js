import {
  LOGIN,
  LOGOUT,
} from '../types/actions/login';
import storage from '../localStorage/storage';

export const login = user => (dispatch) => {
  storage.pushUser(user);
  dispatch({
    type: LOGIN,
    user,
  });
};

export const logout = () => (dispatch) => {
  storage.removeUser();
  dispatch({
    type: LOGOUT,
  });
};

