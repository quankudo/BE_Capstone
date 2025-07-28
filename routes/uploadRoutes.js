const express = require('express');
const router = express.Router();
const cloudinary = require('../utils/cloudinary');
const upload = require('../middlewares/upload');

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;

    // upload lên Cloudinary từ buffer
    const result = await cloudinary.uploader.upload_stream(
      { resource_type: 'image' },
      (error, result) => {
        if (error) return res.status(500).json({ error });
        return res.status(200).json({ url: result.secure_url });
      }
    );

    result.end(fileBuffer); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
