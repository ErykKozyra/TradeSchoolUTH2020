/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';

export const deleteData = async route => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://127.0.0.1:3000/api/${route}`
    });

    let text = 'Polecenie wykonane';
    if (res.data.status === 'success') {
      if (route.startsWith('users/deleteMe'))
        text = 'Twoje konto zostało pomyślnie usunięte';
      else if (route.startsWith('courses'))
        text = 'Kurs został pomyślnie usunięty';
    }
    showAlert('success', text);
    location.assign('/');
  } catch (err) {
    showAlert('error', 'Coś poszło nie tak. Spróbuj ponownie');
  }
};
