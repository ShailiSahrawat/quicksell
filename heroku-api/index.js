const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Sample data
const data = {
    "tickets": [
        {
            "id": "CAM-1",
            "title": "Update User Profile Page UI",
            "tag": ["Feature request"],
            "userId": "usr-1",
            "status": "Todo",
            "priority": 4
        },
        {
            "id": "CAM-2",
            "title": "Add Multi-Language Support",
            "tag": ["Feature Request"],
            "userId": "usr-2",
            "status": "In progress",
            "priority": 3
        }
        // Add other tickets as necessary...
    ],
    "users": [
        {
            "id": "usr-1",
            "name": "Anoop Sharma",
            "available": false
        },
        {
            "id": "usr-2",
            "name": "Yogesh",
            "available": true
        }
        // Add other users as necessary...
    ]
};

// Define a GET route to return the data
app.get('/api/data', (req, res) => {
    res.json(data);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
