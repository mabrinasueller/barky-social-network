-- DROP TABLE IF EXISTS wall_post;
-- DROP TABLE IF EXISTS chat;
-- DROP TABLE IF EXISTS friends;
-- DROP TABLE IF EXISTS reset_codes;
-- DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS dog_info;

-- CREATE TABLE users (
--     id            SERIAL PRIMARY KEY,
--     first_name    VARCHAR NOT NULL CHECK (first_name != ''),
--     last_name     VARCHAR NOT NULL CHECK (last_name != ''),
--     email         VARCHAR NOT NULL UNIQUE CHECK (email != ''),
--     password_hash VARCHAR NOT NULL CHECK (password_hash != ''),
--     img_url       TEXT,
--     bio           TEXT,
--     created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE reset_codes(
--     id SERIAL PRIMARY KEY,
--     email VARCHAR NOT NULL,
--     code VARCHAR NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
--   );

-- CREATE TABLE friends(
--   id SERIAL PRIMARY KEY,
--   sender_id INT REFERENCES users(id) NOT NULL,
--   recipient_id INT REFERENCES users(id) NOT NULL,
--   accepted BOOLEAN DEFAULT false
--   );

--   CREATE TABLE chat(
--     id SERIAL PRIMARY KEY,
--     sender_id INT REFERENCES users(id) NOT NULL,
--     recipient_id INT REFERENCES users(id),
--     message TEXT,
--     private_text TEXT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
--   )

--   CREATE TABLE wall_post(
--     id SERIAL PRIMARY KEY,
--     sender_id INT REFERENCES users(id) NOT NULL,
--     recipient_id INT REFERENCES users(id) NOT NULL,
--     post TEXT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
--   )

  CREATE TABLE dog_info(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL UNIQUE REFERENCES users(id),
    dog_name VARCHAR NOT NULL,
    height INTEGER,
    dog_like TEXT,
    dislike TEXT,
    looking TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )

