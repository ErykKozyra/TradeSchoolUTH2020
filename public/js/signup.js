/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';

export const signup = async data => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/users/signup',
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Rejestracja zakończona powodzeniem');
      location.assign('/');
    }
  } catch (err) {
    const errArr = err.response.data.message.split(',');
    console.log(errArr.length);
    const error = [];
    for (let i = 0; i < errArr.length; i++) {
      error[i] = errArr[i].substring(errArr[i].lastIndexOf(': ') + 2);
    }
    showAlert('error', `${error.join('. ')}.`);
  }
};
