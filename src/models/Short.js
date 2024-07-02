import db from "./db.js";

class Short {
  static async createShort(
    category,
    title,
    author,
    publish_date,
    content,
    actual_content_link,
    image,
    upvote,
    downvote
  ) {
    try {
      const result = await db.query(
        "INSERT INTO shorts (category, title, author, publish_date, content, actual_content_link, image, upvote, downvote) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          category,
          title,
          author,
          publish_date,
          content,
          actual_content_link,
          image,
          upvote,
          downvote,
        ]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getAllShorts() {
    try {
      const result = await db.query(
        "SELECT * FROM shorts ORDER BY publish_date DESC, upvote DESC"
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async filterShorts(filters, search) {
    try {
      let query = "SELECT * FROM shorts WHERE ";
      const values = [];

     
      if (filters.category) {
        query += "category = ? AND ";
        values.push(filters.category);
      }
      if (filters.publish_date) {
        query += "publish_date >= ? AND ";
        values.push(filters.publish_date);
      }
      if (filters.upvote) {
        query += "upvote > ? AND ";
        values.push(filters.upvote);
      }

      
      query = query.slice(0, -5);

      const result = await db.query(query, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async searchShorts(searchParams) {
    try {
      let query = "SELECT * FROM shorts WHERE ";
      const values = [];

      
      if (searchParams.title) {
        query += "title LIKE ? AND ";
        values.push(`%${searchParams.title}%`);
      }
      if (searchParams.keyword) {
        query += "(title LIKE ? OR content LIKE ?) AND ";
        values.push(`%${searchParams.keyword}%`, `%${searchParams.keyword}%`);
      }
      if (searchParams.author) {
        query += "author LIKE ? AND ";
        values.push(`%${searchParams.author}%`);
      }

     
      query = query.slice(0, -5);

      const result = await db.query(query, values);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default Short;
