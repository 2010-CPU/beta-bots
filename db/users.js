const client = require('./client')
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

// database methods
const createUser = async (user) => {
  console.log("ATTEMPTED CREATED USER:", user)
  const {firstName, lastName, email, username, password} = user

  if(!firstName || !lastName || !email || !username || !password) {
    throw new Error("Must have a first name, last name, email, username, and password when creating a user.")
  }

  const insertString = Object.keys(user).map(key => `"${key}"`).join(', ')
  const valuesString = Object.keys(user).map((key, index) => `$${index + 1}`).join(', ')

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT)

    user.password = hashedPassword
    const values = Object.values(user)

    const { rows: [_user] } = await client.query(`
    INSERT INTO users(${insertString})
    VALUES(${valuesString})
    RETURNING *;
    `, values);

    delete _user.password

    return _user

  } catch (error) {
    throw error;
  }
}

const getUser = async ({username, password}) => {
  try {
    const user = await getUserByUsername(username);
 if (!user){
   throw new Error ("No user by that username!")
 } else {
   const hashedPassword = user.password;
   const passwordsMatch = await bcrypt.compare(password, hashedPassword);
   
   if(passwordsMatch){
     delete user.password
     return user
   }
 }
  } catch (error) {
    throw error
  }

}

const getUserByUsername = async(username) => {
  try {
    const { rows: [user] } = await client.query(`
    SELECT *
    FROM users
    WHERE username=$1;
    `, [username])

    return user
  } catch (error) {
    throw error
  }
};

const getAllUsers = async() => {
  try {
    const { rows: users } = await client.query(`
      SELECT 
        users.id,
        users."firstName",
        users."lastName",
        users.email,
        users."imageURL",
        users.username,
        users."isAdmin"
      FROM users;
    `)
    return users
  } catch (error) {
    throw error
  }
}

const getUserById = async(id) => {
  try {
    const { rows: [user] } = await client.query(`
    SELECT *
    FROM users
    WHERE id=$1;
    `, [id]);
    delete user.password
    return user
  } catch (error) {
    throw error
  }
}

module.exports = {
    getAllUsers,
    getUser,
    getUserById,
    getUserByUsername,
    createUser
}