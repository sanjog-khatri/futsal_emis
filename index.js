const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const authRouter = require('./Routes/AuthRouter');
const roleRouter = require('./Routes/ReviewRouter')
const futsalRouter = require('./Routes/FutsalRouter');
const bookingRouter = require('./Routes/BookingRouter');
const challengeRouter = require('./Routes/ChallengeRouter');
const tournamentRouter = require('./Routes/TournamentRouter');
const reviewRouter = require('./Routes/ReviewRouter');

const authenticateToken = require('./Middlewares/AuthToken');


require('dotenv').config();
require('./Models/db');

const app = express();
const PORT = 8080;

app.use(bodyparser.json());
app.use(cors());

app.use('/role', roleRouter);
app.use('/auth', authRouter);
app.use('/futsal', authenticateToken, futsalRouter);
app.use('/booking', authenticateToken, bookingRouter);
app.use('/challenge', authenticateToken, challengeRouter);
app.use('/tournament', authenticateToken, tournamentRouter);
app.use('/review', authenticateToken, reviewRouter);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
