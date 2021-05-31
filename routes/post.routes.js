import { Router } from 'express';
import Post from '../models/Post.js';
import {authMiddleware} from '../middleware/auth.middleware.js';

export const postRouter = Router();

// api/create
postRouter.post('/create', authMiddleware, async (req, res) => {
    try {
        const { title, text, name } = req.body;

        const post = new Post({
            title, text, owner: req.user.userId, author: name
        })

        await post.save();

        res.status(201).json({ post, message: 'Your post was created!'})

    } catch (err) {
        res.status(500).json({message: 'Something went wrong, try again!'})
    }
});

postRouter.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ _id: 'desc'})
        res.json(posts);
    } catch (err) {
        res.status(500).json({message: 'Something went wrong, try again!'})
    }
});

postRouter.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.json(post);
    } catch (err) {
        res.status(500).json({message: 'Something went wrong, try again!'})
    }
});

postRouter.delete('/delete/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findOne({ _id: id})

        if (post.owner.toString() === req.user.userId) {
            Post.deleteOne({ _id: id}).then(() => {
                res.status(200).json({post, message: 'Your post was deleted!'})
            })
        }

    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again!'})
    }
})

postRouter.post('/edit', authMiddleware, async (req, res) => {
    try {
        const { title, text, id } = req.body;
        const post = await Post.findOne({ _id: id});

        if (post.owner.toString() === req.user.userId) {
            post.updateOne({ title, text, data: Date.now() }).then(() => {

                res.status(200).json({ message: 'Your post was edited!'})
            }).catch(err => {
                console.log(err);
            })
        }

    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again!'})
    }
})