// Import dependencies
const express = require('express');
const mongoose = require('mongoose');

const path = require('path');
require('dotenv').config();

const app = express();

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Multer setup for file uploads


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Define schema and model
const donationSchema = new mongoose.Schema({
    restaurantName: String,
    contactEmail: String,
    phoneNumber: String,
    sizeOfDonation: String,
    foodType: String,
    shelfLife: String,
    restaurantAddress: String,
    pincode: String,
    gstNumber: String,
    foodSafetyNumber: String,
    websiteLink: String,
    willingToDeliver: String,
    deliveryTimes: String,
    deliveryFrequency: String
});

const Donation = mongoose.model('Donation', donationSchema);

// Serve the HTML form on the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'restaurant-donation-form.html'));
});

// Handle form submission
app.post('/submit', async (req, res) => {
    try {
        const newDonation = new Donation({
            restaurantName: req.body['restaurant-name'],
            contactEmail: req.body['contact-email'],
            phoneNumber: req.body['phone-number'],
            sizeOfDonation: req.body['size-of-donation'],
            foodType: req.body['food-type'],
            shelfLife: req.body['shelf-life'],
            restaurantAddress: req.body['restaurant-address'],
            pincode: req.body['pincode'],
            gstNumber: req.body['gst-number'], // Use the new field
            foodSafetyNumber: req.body['food-safety-number'], // Use the new field
            websiteLink: req.body['website-link'],
            willingToDeliver: req.body['willing-to-deliver'],
            deliveryTimes: req.body['delivery-times'],
            deliveryFrequency: req.body['delivery-frequency']
        });

        await newDonation.save();
        res.status(200).send('Donation submitted successfully!');
    } catch (error) {
        console.error('Error saving donation:', error);
        res.status(500).send('Internal Server Error');
    }
});



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

