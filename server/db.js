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

module.exports.getUser = (userId) => {
    return db.query(`SELECT * FROM users WHERE id = $1`, [userId]);
};

module.exports.getOtherUsers = (userId) => {
    return db.query(
        `SELECT first_name, last_name, img_url, bio FROM users WHERE id = $1`,
        [userId]
    );
};

module.exports.checkVerificationCode = (email) => {
    return db.query(
        `SELECT * FROM reset_codes WHERE email = $1 AND 
CURRENT_TIMESTAMP - created_at < INTERVAL '5 minutes'`,
        [email]
    );
};

module.exports.updatePassword = (hashedPassword, email) => {
    return db.query(
        `UPDATE users SET password_hash = $1 WHERE email = $2 RETURNING *`,
        [hashedPassword, email]
    );
};

module.exports.insertCode = (code, email) => {
    return db.query(
        `INSERT INTO reset_codes (code, email) VALUES ($1, $2) RETURNING *`,
        [code, email]
    );
};

module.exports.newImage = (fullUrl, userId) => {
    return db.query(`UPDATE users SET img_url = $1 WHERE id = $2 RETURNING *`, [
        fullUrl,
        userId,
    ]);
};

module.exports.updateBio = (bio, userId) => {
    return db.query(`UPDATE users SET bio = $1 WHERE id = $2 RETURNING *`, [
        bio,
        userId,
    ]);
};

module.exports.getNewestUsers = () => {
    return db.query(
        `SELECT id, first_name, last_name, img_url FROM users ORDER BY id DESC LIMIT 3`
    );
};

module.exports.getMatchingUsers = (inputField) => {
    return db.query(
        `SELECT id, first_name, last_name, img_url FROM users WHERE first_name ILIKE $1 OR last_name ILIKE $1 `,
        [`${inputField}%`]
    );
};

module.exports.getConnection = (user1, user2) => {
    return db.query(
        `SELECT FROM friends WHERE (recipient_id = $1 AND sender_id = $2) OR (recipient_id =$2 AND sender_id=$1)`,
        [user1, user2]
    );
};

module.exports.insertConnection = (user1, user2) => {
    return db.query(
        `INSERT INTO friends (sender_id, recipient_id) VALUES ($1, $2) RETURNING *`,
        [user1, user2]
    );
};

module.exports.updateConnection = (user1, user2) => {
    return db.query(
        `UPDATE friends SET accepted = "true" WHERE recipient_id = $1 AND sender_id = $2 RETURNING *`,
        [user1, user2]
    );
};

module.exports.deleteConnection = (user1, user2) => {
    return db.query(
        `DELETE FROM friends WHERE (recipient_id = $1 AND sender_id = $2) OR (recipient_id =$2 AND sender_id=$1)`,
        [user1, user2]
    );
};
