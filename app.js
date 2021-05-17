import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import {authRouter} from './routes/auth.routes.js'
import {postRouter} from "./routes/post.routes.js";
import path from 'path';

const app = express();

app.use(express.json({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
    } catch (e) {
        console.log(`Server error ${e.message}`);
        process.exit(1);
    }
}

start();

