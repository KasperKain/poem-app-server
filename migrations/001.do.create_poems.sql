CREATE TABLE poems (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title VARCHAR(60) NOT NULL,
    body VARCHAR(200) NOT NULL
);