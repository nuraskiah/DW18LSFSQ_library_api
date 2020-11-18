const express = require('express');
const router = express.Router();

const { isAuth, isUser, isAdmin } = require('../middlewares/validateToken');
const { upload } = require('../middlewares/uploadFile');
const { cloudUpload } = require('../middlewares/cloudinaryUpload');

const { login, register, validateAuth } = require('../controllers/auth');
router.post('/login', login);
router.post('/register', register);
router.get('/validate', isAuth, validateAuth);

const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/user');
router.get('/users', isAuth, isAdmin, getUsers);
router.get('/user/:id', isAuth, isAdmin, getUser);
router.patch('/user/:id', isAuth, cloudUpload('photo'), updateUser);
router.delete('/user/:id', isAuth, isAdmin, deleteUser);

const {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/category');
router.get('/categories', isAuth, getCategories);
router.get('/category/:id', isAuth, getCategory);
router.post('/category', isAuth, isAdmin, addCategory);
router.patch('/category/:id', isAuth, isAdmin, updateCategory);
router.delete('/category/:id', isAuth, isAdmin, deleteCategory);

const {
  getBooks,
  getUserBooks,
  getBook,
  addBook,
  editBook,
  deleteBook,
} = require('../controllers/book');
router.get('/books', isAuth, getBooks);
router.get('/user-books/:id', isAuth, getUserBooks);
router.get('/book/:id', isAuth, getBook);
router.post('/book', isAuth, cloudUpload('book'), addBook);
router.patch('/book/:id', isAuth, isUser, editBook);
router.delete('/book/:id', isAuth, isUser, deleteBook);

const {
  getBookmarks,
  addBookmark,
  removeBookmark,
} = require('../controllers/bookmark');
router.get('/bookmarks/:id', isAuth, getBookmarks);
router.post('/bookmark/:bookId/:userId', isAuth, addBookmark);
router.delete('/unbookmark/:bookId/:userId', isAuth, removeBookmark);

module.exports = router;
