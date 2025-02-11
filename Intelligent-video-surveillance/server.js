const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to serve the anomalies.txt file
app.get('/api/anomalies', (req, res) => {
  const filePath = path.join(__dirname, 'anomalies.txt');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("File not found:", err);
      res.status(404).send("File not found");
    }
  });
});



// Use CORS middleware to allow requests from different origins
app.use(cors());

// Endpoint to list all video files with metadata
app.get('/api/videos', (req, res) => {
  const videoDir = 'C:/Users/DELL/Documents/GitHub/system-backend';
  fs.readdir(videoDir, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      res.status(500).send("Error reading directory");
      return;
    }
    // Filter out video files and generate metadata
    const videoFiles = files
      .filter(file => ['.avi', '.mp4'].includes(path.extname(file).toLowerCase()))
      .map((file, index) => {
        const filePath = path.join(videoDir, file);
        const stats = fs.statSync(filePath);
        const date = stats.birthtime.toISOString().split('T')[0]; // Format: YYYY-MM-DD
        return {
          id: index + 1,
          name: file,
          date: date
        };
      });
    res.json(videoFiles);
  });
});

// Serve video files from the specific folder
app.use('/videos', express.static('C:/Users/DELL/Documents/GitHub/system-backend'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
