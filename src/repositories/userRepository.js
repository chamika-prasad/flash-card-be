import db from '../configs/db.js';

const createUser = async (email, password) => {
  // Insert user into database
  const [result] = await db.query('INSERT INTO user (email, password,role) VALUES (?, ?,?)', [email, password,0]);
  return { id: result.insertId, email };
};

const getUserByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
  return rows[0];
};

export default { createUser, getUserByEmail };