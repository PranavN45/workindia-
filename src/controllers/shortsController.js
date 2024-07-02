import Short from "../models/Short.js";

export const createShort = async (req, res) => {
  const {
    category,
    title,
    author,
    publish_date,
    content,
    actual_content_link,
    image,
    votes,
  } = req.body;

  try {
   
    await Short.createShort(
      category,
      title,
      author,
      publish_date,
      content,
      actual_content_link,
      image,
      votes.upvote,
      votes.downvote
    );

    res.status(200).json({
      message: "Short added successfully",
      status_code: 200,
    });
  } catch (error) {
    console.error("Error creating short:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getShortsFeed = async (req, res) => {
  try {

    const shorts = await Short.getAllShorts();

    res.status(200).json(shorts);
  } catch (error) {
    console.error("Error fetching shorts feed:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const filterShorts = async (req, res) => {
  const { filter, search } = req.query;

  try {
   
    const filters = JSON.parse(filter);
    const searchParams = JSON.parse(search);

    
    const filteredShorts = await Short.filterShorts(filters, searchParams);

    if (filteredShorts.length === 0) {
      return res
        .status(400)
        .json({
          status: "No short matches your search criteria",
          status_code: 400,
        });
    }

    res.status(200).json(filteredShorts);
  } catch (error) {
    console.error("Error filtering shorts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
