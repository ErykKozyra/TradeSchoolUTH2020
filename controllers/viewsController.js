const Course = require('../models/courseModel');
const User = require('../models/userModel');
const Subject = require('../models/subjectModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Rejestracja'
  });
};

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Logowanie'
  });
};

exports.getAdmin = catchAsync(async (req, res) => {
  res.status(200).render('admin', {
    title: 'Administrator'
  });
});

exports.forgotPassword = catchAsync(async (req, res) => {
  res.status(200).render('forgotPassword', {
    title: 'Zapomniałem hasła'
  });
});

exports.resetPassword = catchAsync(async (req, res) => {
  res.status(200).render('newPassword', {
    title: 'Ustaw nowe hasło'
  });
});

exports.getOverview = catchAsync(async (req, res, next) => {
  const courses = await Course.find();

  if (!courses) {
    return next(new AppError('Nie znaleziono kursów', 404));
  }

  res.status(200).render('overview', {
    title: 'Kursy',
    courses
  });
});

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Twoje konto'
  });
};

exports.getUsers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(User.find(), req.query).sort().paginate();
  const users = await features.query;
  const sum = await User.count({}, function(err, count) {
    if (err) console.log('Błąd podczas zliczania wyników wyszukiwania');
    else return count;
  });

  if (!users) {
    return next(new AppError('Nie znaleziono użytkowników', 404));
  }

  res.status(200).render('users', {
    title: 'Użytkownicy',
    users,
    sum
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('Nie znaleziono użytkownika o takim ID', 404));
  }

  res.status(200).render('user', {
    title: `${user.name} ${user.surname}`,
    user
  });
});

exports.createCoursee = catchAsync(async (req, res, next) => {
  const subjects = await Subject.find();

  if (!subjects) {
    return next(new AppError('Nie znaleziono przedmiotów', 404));
  }

  res.status(200).render('addCourse', {
    title: 'Dodaj kurs',
    subjects
  });
});

exports.getCourses = catchAsync(async (req, res, next) => {
  const courses = await Course.find();

  if (!courses) {
    return next(new AppError('Nie znaleziono kursów', 404));
  }

  res.status(200).render('courses', {
    title: 'Kursy',
    courses
  });
});

exports.getCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  const subjects = await Subject.find();

  if (!course) {
    return next(new AppError('Nie znaleziono kursu o takim ID', 404));
  }

  if (!subjects) {
    return next(new AppError('Nie znaleziono przedmiotów', 404));
  }

  res.status(200).render('course', {
    title: `${course.name}`,
    course,
    subjects
  });
});

exports.createSubject = catchAsync(async (req, res, next) => {
  const teachers = await User.find({ role: 'teacher' });

  if (!teachers) {
    return next(new AppError('Nie znaleziono nauczycieli', 404));
  }

  res.status(200).render('addSubject', {
    title: 'Dodaj przedmiot',
    teachers
  });
});

exports.getSubjects = catchAsync(async (req, res, next) => {
  const subjects = await Subject.find();

  if (!subjects) {
    return next(new AppError('Nie znaleziono przedmiotów', 404));
  }

  res.status(200).render('subjects', {
    title: 'Przedmioty',
    subjects
  });
});

exports.getSubject = catchAsync(async (req, res, next) => {
  const subject = await Subject.findById(req.params.id);
  const teachers = await User.find({ role: 'teacher' });

  if (!subject) {
    return next(new AppError('Nie znaleziono przedmiotu', 404));
  }

  if (!teachers) {
    return next(new AppError('Nie znaleziono nauczycieli', 404));
  }

  res.status(200).render('subject', {
    title: `${subject.name}`,
    subject,
    teachers
  });
});
