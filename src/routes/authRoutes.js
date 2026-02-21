// src/routes/authRoutes.js
import express from 'express';
// const express = require('express');
import bcrypt from 'bcryptjs';
// const bcrypt = require('bcryptjs');
import jwt from 'jsonwebtoken';

import prisma from '../db.js';
// const prisma = require('../db'); // Point to the db.js we just fixed

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    const { username, email, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    try {
        const user = await prisma.user.create({
            data: { username, email, password: hashedPassword }
        });
        
        await prisma.todo.create({
            data: {
                task: "Hello :) Add your first todo!",
                userId: user.id
            }
        });

        const accessToken = jwt.sign({ id: user.id }, process.env.SECRET_ACCESS_TOKEN, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: user.id }, process.env.SECRET_REFRESH_TOKEN, { expiresIn: '24h' });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only sends over HTTPS in production
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });
        res.json({ accessToken});
    } catch (err) {
        console.log(err.message);
        res.sendStatus(503);
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) { return res.status(404).send({ message: "User not found" }); }

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) { return res.status(401).send({ message: "Invalid password" }); }

        const accessToken = jwt.sign({ id: user.id }, process.env.SECRET_ACCESS_TOKEN, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: user.id }, process.env.SECRET_REFRESH_TOKEN, { expiresIn: '24h' });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only sends over HTTPS in production
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });
        res.json({ accessToken });
    } catch (err) {
        console.log(err.message);
        res.sendStatus(503);
    }
});

export default router;
// module.exports = router;