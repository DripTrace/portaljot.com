require("dotenv").config({ path: "/.env" });
const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");

const saltRounds = 10;
const newPassword = "WhistleHead34"; // replace with the actual new password
const username = "Grant"; // replace with the actual username

bcrypt.hash(newPassword, saltRounds, async function (err, hash) {
    if (err) {
        console.error(err);
        return;
    }

    const pool = await mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    await pool.execute(
        "UPDATE users SET hashed_password = ? WHERE username = ?",
        [hash, username]
    );
    await pool.end();
});
