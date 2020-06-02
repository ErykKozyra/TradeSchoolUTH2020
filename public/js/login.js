/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';

export const login = async data => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/users/login',
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logowanie zakończone sukcesem');
      location.assign('/');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/users/logout'
    });
    if ((res.data.status = 'success')) {
      showAlert('success', 'Zostałeś wylogowany');
      location.assign('/');
    }
  } catch (err) {
    showAlert('error', 'Błąd podczas wylogowywania. Spróbuj ponownie');
  }
};