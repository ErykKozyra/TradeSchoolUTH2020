const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/signup', viewsController.getSignupForm);
router.get('/login', viewsController.getLoginForm);
router.get('/', viewsController.getOverview);
router.get('/me', viewsController.getAccount);
router.get('/forgotPassword', viewsController.forgotPassword);
router.get('/resetPassword/:id', viewsController.resetPassword);

router.get(
  '/admin',
  authController.restrictTo('admin'),
  viewsController.getAdmin
);

router.get(
  '/users',
  authController.restrictTo('admin'),
  viewsController.getUsers
);

router.get(
  '/users/:id',
  authController.restrictTo('admin'),
  viewsController.getUser
);

router.get(
  '/courses',
  authController.restrictTo('admin'),
  viewsController.getCourses
);

router.get(
  '/courses/:id',
  authController.restrictTo('admin'),
  viewsController.getCourse
);

router.get(
  '/subjects',
  authController.restrictTo('admin'),
  viewsController.getSubjects
);

router.get(
  '/subjects/:id',
  authController.restrictTo('admin'),
  viewsController.getSubject
);

router.get(
  '/addSubject',
  authController.restrictTo('admin'),
  viewsController.createSubject
);

router.get(
  '/addCourse',
  authController.restrictTo('admin'),
  viewsController.createCoursee
);

module.exports = router;
