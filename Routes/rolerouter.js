const express = require('express');
const router = express.Router();

// router.post('/select', (req, res) => {
//     const { role } = req.body;
    
//     if (role === 'player') {
//         res.send('Redirect to player action selection'); 
//     } else if (role === 'owner') {
//         res.send('Redirect to owner action selection'); 
//     } else {
//         res.status(400).send('Invalid role selected');
//     }
// });


// router.post('/player-action', (req, res) => {
//     const { action } = req.body;
    
//     if (action === 'login') {
//         res.send('Redirect to player login'); 
//     } else if (action === 'signup') {
//         res.send('Redirect to player signup'); 
//     } else {
//         res.status(400).send('Invalid action selected');
//     }
// });


// router.post('/owner-action', (req, res) => {
//     const { action } = req.body;
    
//     if (action === 'login') {
//         res.send('Redirect to owner login'); 
//     } else if (action === 'signup') {
//         res.send('Redirect to owner signup'); 
//     } else {
//         res.status(400).send('Invalid action selected');
//     }
// });


router.post('/select', (req, res) => {
    const { role } = req.body;
    
    if (role === 'player') {
        res.redirect('/role/player-action'); 
    } else if (role === 'owner') {
        res.redirect('/role/owner-action'); 
    } else {
        res.status(400).send('Invalid role selected');
    }
});

router.post('/player-action', (req, res) => {
    const { action } = req.body;
    
    if (action === 'login') {
        res.redirect('/auth/player/login'); 
    } else if (action === 'signup') {
        res.redirect('/auth/player/signup'); 
    } else {
        res.status(400).send('Invalid action selected');
    }
});


router.post('/owner-action', (req, res) => {
    const { action } = req.body;
    
    if (action === 'login') {
        res.redirect('/auth/owner/login'); 
    } else if (action === 'signup') {
        res.redirect('/auth/owner/signup'); 
    } else {
        res.status(400).send('Invalid action selected');
    }
});

module.exports = router;
