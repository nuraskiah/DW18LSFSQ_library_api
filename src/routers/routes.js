const express = require('express');
const router = express.Router();

const { isAuth } = require('../middlewares/validateToken');

const { login, register } = require('../controllers/auth');
router.post('/login', login);
router.post('/register', register);

const { getUsers, getUser, deleteUser } = require('../controllers/user');
router.get('/users', isAuth, getUsers);
router.get('/user/:id', isAuth, getUser);
router.delete('/user/:id', isAuth, deleteUser);

const {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/category');
router.get('/categories', isAuth, getCategories);
router.get('/category/:id', isAuth, getCategory);
router.post('/category', isAuth, addCategory);
router.patch('/category/:id', isAuth, updateCategory);
router.delete('/category/:id', isAuth, deleteCategory);

const {
  getBooks,
  getBook,
  addBook,
  editBook,
  deleteBook,
  getBookmark,
  bookmark,
  unBookmark,
} = require('../controllers/book');
router.get('/books', isAuth, getBooks);
router.get('/book/:id', isAuth, getBook);
router.post('/book', isAuth, addBook);
router.patch('/book/:id', isAuth, editBook);
router.delete('/book/:id', isAuth, deleteBook);
router.get('/bookmark/:id', isAuth, getBookmark);
router.patch('/bookmark/:bookId/:userId', isAuth, bookmark);
router.patch('/unbookmark/:bookId/:userId', isAuth, unBookmark);

module.exports = router;
