const client = require('./client')
const bcrypt = require('bcrypt');

// database methods
const createUser = async ({firstName, lastName, email, username, password}) => {
  try {
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT)
    const { rows: [user] } = await client.query(`
    INSERT INTO users("firstName", "lastName", email, username, password)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *;
    `, [firstName, lastName, email, username, hashedPassword]);
    delete user.password
    return user
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
        
        users.password,
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