const ManageSystemUserModel = require('../Models/ManageSystemUserModel');
const ManageFlat = require('../Models/ManageFlatModel');
const jwt = require('jsonwebtoken');
const secretKey = 'utsav';
// Login Controller
module.exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      // Find the user in the database
      const user = await ManageSystemUserModel.findOne({ Email:email});
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      // Compare hashed passwords    
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  function logout() {
    // Remove the token from cookies, local storage, or session storage
    // For exa  mple, if you stored the token in a cookie:
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // Redirect the user to the login page or wherever is appropriate
    window.location.href = '/login'; // Redirect to the login page
  }