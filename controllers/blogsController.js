const db = require("../config/db");
const {
  successResponse,
  errorResponse,
} = require("../utils/responseFormatter");

const getAllBlogs = (req, res) => {
  const queryBlogs = `SELECT 
    b.Id,
    b.Title,
    b.Desc,
    b.Created,
    b.Status,
    b.IdUser,
    u.Name AS UserName,
    GROUP_CONCAT(DISTINCT i.ImageUrl) AS ImageUrls,
    GROUP_CONCAT(DISTINCT t.Name) AS Tags
    FROM Blogs b
    JOIN imageblogs i ON b.Id = i.IdBlog
    JOIN blogs_tags bt ON b.Id = bt.BlogId
    JOIN tags t ON bt.TagId = t.Id
    JOIN users u ON b.IdUser = u.Id
    GROUP BY b.Id;
`;
  db.query(queryBlogs, (err, results) => {
    if (err) return res.status(500).json(errorResponse(err.message));
    res.json(successResponse(results));
  });
};

// add new blog
// get all comment of the blog
const getBlogComments = (req, res) => {
  const blogId = req.params.id;
  const queryComments = `
    SELECT 
      b.Id AS BlogId,
      b.Title AS BlogTitle,
      cb.Id AS CommentId,
      cb.Comment,
      cb.Status,
      cb.CreatedAt,
      cb.UpdatedAt,
      u.Id AS UserId,
      u.Name AS UserName
    FROM blogs b
    LEFT JOIN commentblogs cb ON b.Id = cb.IdBlog
    LEFT JOIN users u ON cb.IdUser = u.Id
    WHERE b.Id = ?
    ORDER BY cb.CreatedAt;
  `;

  db.query(queryComments, [blogId], (err, results) => {
    if (err) return res.status(500).json(errorResponse(err.message));
    res.json(successResponse(results));
  });
};
// Thêm mới comment cho blog
const addBlogComment = (req, res) => {
  const { IdBlog, comment, IdUser } = req.body;
  console.log("Received data:", { IdBlog, comment, IdUser });
  const queryInsertComment = `
    INSERT INTO commentblogs (IdBlog, Comment, IdUser)
    VALUES (?, ?, ?);
  `;

  db.query(queryInsertComment, [IdBlog, comment, IdUser], (err, results) => {
    if (err) return res.status(500).json(errorResponse(err.message));
    res.json(successResponse({ message: "Comment added successfully" }));
  });
};
// lây Emojis của blog
const getBlogEmojis = (req, res) => {
  const blogId = req.params.id;
  const query = `
SELECT 
  bi.BlogId,
  i.Name AS Emoji,
  u.Id AS UserId,
  u.Name AS UserName
FROM blogs_icons bi
JOIN icons i ON bi.IconId = i.Id
JOIN users u ON bi.IdUser = u.Id
ORDER BY bi.BlogId, i.Name;

  `;

  db.query(query, [blogId], (err, results) => {
    if (err) {
      console.error("Error fetching emojis:", err);
      return res.status(500).json({ success: false, message: err.message });
    }

    res.status(200).json({
      success: true,
      data: results,
    });
  });
};

// add Emojis to blog
const addBlogEmoji = (req, res) => {
  const { BlogId, IconId, IdUser } = req.body;
   console.log("Received data for adding emoji:", { BlogId, IconId, IdUser });
  if (!BlogId || !IconId || !IdUser) {
    return res.status(400).json(errorResponse("Missing required fields"));
  }
  
 
  const queryInsertEmoji = `
    INSERT INTO blogs_icons (BlogId, IconId, IdUser)
    VALUES (?, ?, ?);
  `;

  db.query(queryInsertEmoji, [BlogId, IconId, IdUser], (err, results) => {
    if (err) return res.status(500).json(errorResponse(err.message));
    res.json(successResponse({ message: "Emoji added successfully" }));
  });
};

module.exports = {
  getAllBlogs,
  getBlogComments,
  addBlogComment ,
  getBlogEmojis , 
  addBlogEmoji
};
