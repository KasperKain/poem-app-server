ALTER TABLE IF EXISTS poems
    DROP COLUMN IF EXISTS style;

DROP TABLE IF EXISTS styles;

DROP TYPE IF EXISTS head_styles;
DROP TYPE IF EXISTS body_styles;
