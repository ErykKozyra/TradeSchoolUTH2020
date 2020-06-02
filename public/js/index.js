/* eslint-disable */

import '@babel/polyfill';
import { signup } from './signup';
import { login, logout } from './login';
import { updateData, discountinue } from './patch';
import { deleteData } from './delete';
import { createData, forgotPassword } from './post';

const checkbox = document.getElementById('cokolwiek');
const body = document.querySelector('body');
const signupForm = document.querySelector('.signup');
const loginForm = document.querySelector('.login');
const logOutBtn = document.querySelector('.logout');
const userDataForm = document.querySelector('.user-data');
const userPasswordForm = document.querySelector('.user-password');
const delAccountBtn = document.querySelector('.btn-account-delete');
const delCourseBtn = document.querySelector('.btn-course-delete');
const updateCourseForm = document.querySelector('.update-course');
const selectTag = document.querySelector('.select-tag');
const limit = document.querySelector('.limit');
const page = document.querySelector('.page');
const join = document.getElementById('joinSlugArr');
const createCourse = document.querySelector('.create-course');
const createSubject = document.querySelector('.create-subject');
const delSubjectBtn = document.querySelector('.btn-subject-delete');
const forgotPasswordForm = document.querySelector('.forgot-password');
const newPasswordForm = document.querySelector('.new-password');
const updateSubjectForm = document.querySelector('.update-subject');
const discontinueBtn = document.querySelector('.discontinue');

if (signupForm)
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = {};
    data.name = document.getElementById('name').value;
    data.surname = document.getElementById('surname').value;
    data.pin = document.getElementById('pin').value;
    data.dob = document.getElementById('dob').value;
    data.street = document.getElementById('street').value;
    data.city = document.getElementById('city').value;
    data.code = document.getElementById('code').value;
    data.email = document.getElementById('email').value;
    data.number = document.getElementById('number').value;
    data.password = document.getElementById('password').value;
    data.passwordConfirm = document.getElementById('confirm').value;
    signup(data);
  });

if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = {};
    data.email = document.getElementById('email').value;
    data.password = document.getElementById('password').value;
    login(data);
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = {};
    const email = document.getElementById('email').value;
    if (email !== '') data.email = email;
    const street = document.getElementById('street').value;
    if (street !== '') data.street = street;
    const city = document.getElementById('city').value;
    if (city !== '') data.city = city;
    const code = document.getElementById('code').value;
    if (code !== '') data.code = code;
    console.log(data);
    updateData(data, 'users/updateMe');
    document.getElementById('email').value = '';
    document.getElementById('street').value = '';
    document.getElementById('city').value = '';
    document.getElementById('code').value = '';
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    const data = {};
    document.querySelector('.btn-update').textContent = 'Aktualizowanie...';
    data.passwordCurrent = document.getElementById('passwordCurrent').value;
    data.password = document.getElementById('password').value;
    data.passwordConfirm = document.getElementById('passwordConfirm').value;

    await updateData(data, 'users/updateMyPassword');
    document.querySelector('.btn-update').textContent = 'Aktualizuj';
    document.getElementById('passwordCurrent').value = '';
    document.getElementById('password').value = '';
    document.getElementById('passwordConfirm').value = '';
  });

if (delAccountBtn)
  delAccountBtn.addEventListener('click', () => {
    if (
      confirm(
        'Czy jesteś pewien, że chcesz usunąć swoje konto? Proces ten jest nieodwracalny. Użycie tego samego adresu email w naszym systemie będzie niemożliwe.'
      )
    ) {
      deleteData('users/deleteMe');
    }
  });

if (selectTag)
  selectTag.addEventListener('change', () => {
    const queryString = window.location.search;
    const usp = new URLSearchParams(queryString);

    if (selectTag.selectedIndex === 1) usp.set('sort', 'surname');
    if (selectTag.selectedIndex === 2) usp.set('sort', '-surname');
    if (selectTag.selectedIndex === 3) usp.set('sort', '-createdAt');
    if (selectTag.selectedIndex === 4) usp.set('sort', 'createdAt');

    const search = `?${usp.toString()}`;
    const url = `${window.location.origin}${window.location.pathname}${search}`;
    window.location.href = url;
  });

if (limit)
  limit.addEventListener('change', () => {
    const queryString = window.location.search;
    const usp = new URLSearchParams(queryString);

    if (limit.selectedIndex === 1) usp.set('limit', '3');
    if (limit.selectedIndex === 2) usp.set('limit', '5');
    if (limit.selectedIndex === 3) usp.set('limit', '7');
    if (limit.selectedIndex === 4) usp.set('limit', '10');

    const search = `?${usp.toString()}`;
    const url = `${window.location.origin}${window.location.pathname}${search}`;
    window.location.href = url;
  });

if (page) {
  const next = document.getElementById('next');
  const previous = document.getElementById('previous');
  const sumUsers = document.getElementById('sumUsers').textContent * 1;
  const queryString = window.location.search;
  const usp = new URLSearchParams(queryString);

  let pageNum = usp.get('page') || 1;
  let limitNum = usp.get('limit') || 100;
  let maxRes = Math.ceil(sumUsers / limitNum);

  next.addEventListener('click', () => {
    if (pageNum < maxRes) pageNum++;
    usp.set('page', `${pageNum}`);
    const search = `?${usp.toString()}`;
    const url = `${window.location.origin}${window.location.pathname}${search}`;
    window.location.href = url;
  });

  previous.addEventListener('click', () => {
    pageNum--;
    if (pageNum === 0) pageNum = 1;
    usp.set('page', `${pageNum}`);
    const search = `?${usp.toString()}`;
    const url = `${window.location.origin}${window.location.pathname}${search}`;
    window.location.href = url;
  });
}

if (join) {
  const slugStr = document.getElementById('joinSlugArr').textContent;

  if (slugStr.length !== 0) {
    const idStr = document.getElementById('joinIdArr').textContent;
    const slugArr = slugStr.split(',');
    const idArr = idStr.split(',');

    const arrDOM = [];
    for (let i = 0; i < slugArr.length; i++) {
      arrDOM[i] = document.getElementById(`${slugArr[i]}`);
      arrDOM[i].addEventListener('click', () => {
        if (
          confirm(
            'Czy jesteś pewien, że chcesz się zapisać na ten kurs? Proces ten jest nieodwracalny. Klikając TAK, zobowiązujesz się do uczestnictwa w kursie, aż do jego zakończenia!'
          )
        ) {
          const data = { course: idArr[i] };
          updateData(data, 'users/joinCourse');
        }
      });
    }
  }
}

if (discontinueBtn)
  discontinueBtn.addEventListener('click', () => {
    const pathname = window.location.pathname;
    const id = pathname.substring(pathname.lastIndexOf('/') + 1);
    const route = `users/discontinue/${id}`;
    if (confirm('Czy jesteś pewien, że chcesz wypisać użytkownika z kursu?')) {
      discountinue(route);
    }
  });

if (checkbox)
  checkbox.addEventListener('change', () => {
    body.classList.toggle('night');
  });

if (updateCourseForm)
  updateCourseForm.addEventListener('submit', e => {
    e.preventDefault();

    const data = {
      name,
      description,
      subjects: []
    };

    const slugStr = document.getElementById('slugArr').textContent;
    const idStr = document.getElementById('idArr').textContent;
    const slugArr = slugStr.split(',');
    const idArr = idStr.split(',');

    const arrDOM = [];
    for (let i = 0; i < slugArr.length; i++) {
      arrDOM[i] = document.getElementById(`${slugArr[i]}`);
      if (arrDOM[i].checked === true) data.subjects.push(idArr[i]);
    }

    const name = document.getElementById('name').value;
    if (name.length != 0) data.name = name;
    const description = document.getElementById('description').value;
    if (description.length != 0) data.description = description;

    const pathname = window.location.pathname;
    const id = pathname.substring(pathname.lastIndexOf('/') + 1);
    const route = `courses/${id}`;

    updateData(data, route);
  });

if (delCourseBtn)
  delCourseBtn.addEventListener('click', () => {
    if (
      confirm(
        'Czy jesteś pewien, że chcesz usunąć ten kurs? Usunięcie kursu spowoduje jednoczesne wypisanie z niech wszystkie osoby w nim uczestniczące.'
      )
    ) {
      const pathname = window.location.pathname;
      const id = pathname.substring(pathname.lastIndexOf('/') + 1);
      const route = `courses/${id}`;
      deleteData(route);
    }
  });

if (createCourse)
  createCourse.addEventListener('submit', () => {
    const data = {};
    data.name = document.getElementById('name').value;
    data.description = document.getElementById('description').value;
    createData(data, 'courses');
  });

if (createSubject)
  createSubject.addEventListener('submit', () => {
    const data = {};
    data.name = document.getElementById('name').value;
    data.numOfHours = document.getElementById('numOfHours').value;
    data.maxGroupSize = document.getElementById('maxGroupSize').value;
    data.description = document.getElementById('description').value;

    const idStr = document.getElementById('idArr').textContent;
    const idArr = idStr.split(',');
    const arrDOM = [];

    for (let i = 0; i < idArr.length; i++) {
      arrDOM[i] = document.getElementById(`${idArr[i]}`);
      if (arrDOM[i].checked === true) data.teacher = idArr[i];
    }

    createData(data, 'subjects');
  });

if (delSubjectBtn)
  delSubjectBtn.addEventListener('click', () => {
    if (
      confirm(
        'Czy jesteś pewien, że chcesz usunąć ten przedmiot? Zostanie on usunięty ze wszystkich obecnych kursów!'
      )
    ) {
      const pathname = window.location.pathname;
      const id = pathname.substring(pathname.lastIndexOf('/') + 1);
      const route = `subjects/${id}`;
      deleteData(route);
    }
  });

if (updateSubjectForm)
  updateSubjectForm.addEventListener('submit', () => {
    const data = {};
    const name = document.getElementById('name').value;
    if (name !== '') data.name = name;
    const numOfHours = document.getElementById('numOfHours').value;
    if (numOfHours !== '') data.numOfHours = numOfHours;
    const maxGroupSize = document.getElementById('maxGroupSize').value;
    if (maxGroupSize !== '') data.maxGroupSize = maxGroupSize;
    const description = document.getElementById('description').value;
    if (description !== '') data.description = description;

    const idStr = document.getElementById('idArr').textContent;
    const idArr = idStr.split(',');
    const arrDOM = [];

    for (let i = 0; i < idArr.length; i++) {
      arrDOM[i] = document.getElementById(`${idArr[i]}`);
      if (arrDOM[i].checked === true) data.teacher = idArr[i];
    }

    const pathname = window.location.pathname;
    const id = pathname.substring(pathname.lastIndexOf('/') + 1);
    const route = `subjects/${id}`;

    updateData(data, route);
  });

if (forgotPasswordForm)
  forgotPasswordForm.addEventListener('submit', () => {
    const data = {};
    data.email = document.getElementById('email').value;
    forgotPassword(data);
  });

if (newPasswordForm)
  newPasswordForm.addEventListener('submit', () => {
    const data = {};
    data.password = document.getElementById('password').value;
    data.passwordConfirm = document.getElementById('passwordConfirm').value;
    const pathname = window.location.pathname;
    const id = pathname.substring(pathname.lastIndexOf('/') + 1);
    const route = `users/resetPassword/${id}`;
    updateData(data, route);
  });

var popup = document.getElementById('myPopup');
var popupDev = document.getElementById('myPopupDev');
var popup2 = document.getElementById('pop');
var popup3 = document.getElementById('pop2');
popup2.addEventListener('click', e => {
  popup.classList.toggle('show');
});
popup3.addEventListener('click', e => {
  popupDev.classList.toggle('show');
});
