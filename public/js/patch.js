/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';

export const updateData = async (data, route) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:3000/api/${route}`,
      data
    });

    let text;
    if (res.data.status === 'success') {
      if (route.startsWith('users/updateMe'))
        text = 'Twoje dane zostały pomyślnie zmienione';
      else if (
        route.startsWith('users/updateMyPassword') ||
        route.startsWith('users/resetPassword')
      )
        text = 'Twoje hasło zostało pomyślnie zmienione';
      else if (route.startsWith('courses'))
        text = 'Pomyślnie zaktualizonao kurs';
      else if (route.startsWith('users/joinCourse'))
        text = 'Pomyślnie zapisałeś się na kurs';
      else if (route.startsWith('subjects'))
        text = 'Pomyślnie aktualizowałeś przedmiot';
    }
    showAlert('success', text);
    location.assign('/');
  } catch (err) {
    showAlert('error', 'Coś poszło nie tak. Spróbuj ponownie');
  }
};

export const discountinue = async route => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:3000/api/${route}`
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Wypisano z kursu');
      location.assign('/');
    }
  } catch (err) {
    showAlert('error', 'Coś poszło nie tak. Spróbuj ponownie');
  }
};
