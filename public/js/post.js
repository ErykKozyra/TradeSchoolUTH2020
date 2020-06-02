/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';

export const createData = async (data, route) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `http://127.0.0.1:3000/api/${route}`,
      data
    });

    let text;
    if (res.data.status === 'success') {
      if (route.startsWith('courses')) text = 'Pomyślnie dodano kurs';
      else if (route.startsWith('subjects'))
        text = 'Pomyślnie dodano przedmiot';
      else if (route.startsWith('forgotPassword')) text = 'Wysłano e-mail';
    }
    showAlert('success', text);
    location.assign('/');
  } catch (err) {
    showAlert('error', 'Coś poszło nie tak. Spróbuj ponownie');
  }
};

export const forgotPassword = async data => {
  try {
    const res = await axios({
      method: 'POST',
      url: `http://127.0.0.1:3000/api/users/forgotPassword`,
      data
    });

    location.assign('/');

    if (res.data.status === 'success') {
      showAlert('success', 'Pomyślnie wysłano email');
      location.assign('/');
    }
  } catch (err) {
    showAlert('error', 'Coś poszło nie tak. Spróbuj ponownie');
  }
};
