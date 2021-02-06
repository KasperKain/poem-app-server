CREATE TYPE head_styles AS ENUM (
    'mood_joy',
    'mood_peace',
    'mood_sorrow',
    'mood_anger',
    'mood_fear'
);

CREATE TYPE body_styles AS ENUM (
    'temp_cold',
    'temp_cool',
    'temp_warm',
    'temp_hot'
);

CREATE TABLE styles (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    head_style head_styles NOT NULL,
    body_style body_styles NOT NULL
);

ALTER TABLE poems ADD COLUMN
    style INTEGER NOT NULL REFERENCES styles (id)
    ON DELETE CASCADE;