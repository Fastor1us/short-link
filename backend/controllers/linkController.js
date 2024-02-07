const linkService = require('../services/linkService');
const { nanoid } = require('@reduxjs/toolkit');

const createLink = async (req, res) => {
  const { link } = req.body;
  try {
    const originalLink = await linkService.readOriginalLink(link);
    if (originalLink.length === 0) {
      const shortened_link = await linkService.createLink(link, nanoid(5));
      res.status(200).json(shortened_link);
    } else {
      res.status(200).json(originalLink[0].shortened_link);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

const redirectLink = async (req, res) => {
  const shortened_link = req.params.link;
  const shortLink = await linkService.readShortLink(shortened_link);
  if (shortLink.length > 0) {
    res.status(200).json(shortLink[0].original_link);
  } else {
    res.status(500).json({ error: 'Ссылка не найдена' });
  }
}

module.exports = {
  createLink,
  redirectLink
};
