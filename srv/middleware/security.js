const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const express = require('express');

function setupSecurityMiddleware(app) {
    // Security headers
    app.use(helmet());

    // Rate limiting
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
        message: 'Too many requests from this cosmic sector, please try again later',
        standardHeaders: true,
        legacyHeaders: false
    });
    app.use(limiter);

    // CORS configuration
    app.use(cors({
        origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:4004'],
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }));

    // Request size limiting
    app.use(express.json({ limit: '10kb' }));
    app.use(express.urlencoded({ extended: true, limit: '10kb' }));
}

module.exports = { setupSecurityMiddleware }; 