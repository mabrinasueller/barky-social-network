const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/social"
);

module.exports.createUser = (firstName, lastName, email, hashedPassword) => {
    return db.query(
        `INSERT INTO users (first_name, last_name, email, password_hash) 
    VALUES ($1, $2, $3, $4) RETURNING id`,
        [firstName, lastName, email, hashedPassword]
    );
};

module.exports.registeredUser = (email) => {
    return db.query(`SELECT * FROM users WHERE email = $1`, [email]);
};

module.exports.checkVerificationCode = (email) => {
    return db.query(
        `SELECT * FROM my_table WHERE email = $1 AND 
CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'`,
        [email]
    );
};

module.exports.updatePassword = (hashedPassword, email) => {
    return db.query(
        `UPDATE users SET hashedPassword = $1 WHERE email = $2 RETURNING *`,
        [hashedPassword, email]
    );
};

module.exports.insertCode = (code, email) => {
    return db.query(
        `INSERT INTO reset_codes (code, email) VALUES ($1, $2) RETURNING *`,
        [code, email]
    );
};
