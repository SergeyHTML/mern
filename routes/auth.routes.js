import {Router} from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import User from '../models/User.js';
import {check, validationResult} from "express-validator";

export const authRouter = Router();

const {hash} = bcrypt;

// /api/auth/register
authRouter.post(
    '/register',
    [
        check('email', 'Not correct email').isEmail(),
        check('password', 'Minimum length of password 6 symbols')
            .isLength({min: 6}),
        check('name', 'Minimum length of password 2 symbols').isLength({min: 2})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Not correct data for registration',
                })
            }
            const {email, password, name} = req.body;

            const candidate = await User.findOne({email});

            if (candidate) {
                return res.status(400).json({message: `User with this email: ${email} is already exist `})
            }

            const hashedPassword = await hash(password, 12);

            const user = new User({
                email,
                password: hashedPassword,
                name,
            });

            await user.save((err, createdUser) => {
                const token = jwt.sign(
                    { userId: createdUser.id, },
                    config.get('jwtSecret'),
                )
                res.status(201)
                    .json({ token, userId: createdUser.id, name, message: `User with email ${email} has been created!`});
            });

        } catch (err) {
            res.status(500).json({message: 'Something went wrong, try again!'})
        }
    })

// /api/auth/login
authRouter.post(
    '/login',
    [
        check('email', 'Not correct email').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Not correct data for login',
                })
            }

            const { email, password } = req.body;

            const user = await User.findOne({email});

            if (!user) {
                return res.status(400).json({ message: 'User was not found :('});
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Entered data not correct, try again'})
            }

            const token = jwt.sign(
                { userId: user.id, },
                config.get('jwtSecret'),
                // { expiresIn: '1h' }
            )

            res.json({ token, userId: user.id, name: user.name});

        } catch (err) {
            res.status(500).json({message: 'Something went wrong, try again!'})
        }
    })