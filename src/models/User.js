import db from "./db.js";

class User {
  static async createUser(username, password, email) {
    try {
      const result = await db.query(
        "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
        [username, password, email]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async findUserByUsername(username) {
    try {
      const result = await db.query("SELECT * FROM users WHERE username = ?", [
        username,
      ]);
      return result[0];
    } catch (error) {
      throw error;
    }
  }
}

export default User;
