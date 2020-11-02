const { Book, Bookmark, User } = require('../../models');

exports.getBookmarks = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Bookmark.findAll({
      where: {
        UserId: id,
      },
      include: [
        {
          model: Book,
          as: 'book',
          attributes: ['id', 'title', 'author', 'cover'],
        },
      ],
      attributes: ['id'],
      order: [['id', 'DESC']],
    });

    res.send({
      status: 'success',
      message: `Bookmarks fetched successfully`,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'error',
      message: 'Internal Server Error',
      code: 500,
      data: error,
    });
  }
};

exports.addBookmark = async (req, res) => {
  try {
    const { UserId, BookId } = req.params;
    const data = await Bookmark.create({
      UserId,
      BookId,
    });

    const { id, title } = await Book.findOne({
      where: {
        id: BookId,
      },
    });

    res.send({
      status: 'success',
      message: 'Bookmark added successfully',
      data: {
        id,
        title,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'error',
      message: 'Internal Server Error',
      code: 500,
    });
  }
};

exports.removeBookmark = async (req, res) => {
  try {
    const { UserId, BookId } = req.params;
    const data = await Bookmark.destroy({
      where: {
        UserId,
        BookId,
      },
    });
    const { id, title } = await Book.findOne({
      where: {
        id: BookId,
      },
    });

    res.send({
      status: 'success',
      message: 'Bookmark removed successfully',
      data: {
        id,
        title,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'error',
      message: 'Internal Server Error',
      code: 500,
    });
  }
};
