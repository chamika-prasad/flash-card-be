const dotenv = require('dotenv');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

dotenv.config();

async function ensureAdminUser() {
    console.log("Connecting to database...");

    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || "localhost:8080",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "flash_app",
    });

    try {

        const adminEmail = 'admin@gmail.com';
        const adminPassword = '123456';
        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        try {
            const [rows] = await connection.query('SELECT * FROM User WHERE email = ?', [adminEmail]);
            if (rows.length === 0) {
                await connection.query(
                    'INSERT INTO User (email, password, role) VALUES (?, ?, ?)',
                    [adminEmail, hashedPassword, 1]
                );
                console.log('Admin user created successfully!');
            } else {
                console.log('Admin user already exists.');
            }
        } catch (error) {
            console.error('Error while ensuring admin user:', error);
        }
    } catch (connectionError) {
        console.error("Failed to connect to database:", connectionError);
    } finally {
        await connection.end();
        console.log("Database connection closed.");
    }
};

ensureAdminUser()