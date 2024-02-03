const pool = require('../db/pool');

const createLink = async (original_link, shortened_link) => {
  const result = await pool.query(`
      INSERT INTO "short-link".links (original_link, shortened_link)
      VALUES ($1, $2)
      RETURNING shortened_link
    `, [original_link, shortened_link]);
  return result.rows[0].shortened_link;
};

const readOriginalLink = async (original_link) => {
  const { rows } = await pool.query(`
      SELECT * FROM "short-link".links
      WHERE original_link = $1
    `, [original_link]);
  return rows;
}

const readShortLink = async (shortened_link) => {
  const { rows } = await pool.query(`
      SELECT * FROM "short-link".links
      WHERE shortened_link = $1
    `, [shortened_link]);
  return rows;
}

module.exports = {
  createLink,
  readOriginalLink,
  readShortLink
};
