-- Add username column to User, defaulting to email for all existing rows.
-- username is treated as the login identifier and always equals the user's email.

-- Step 1: add the column as nullable so existing rows don't violate NOT NULL
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "username" TEXT;

-- Step 2: backfill existing rows — username = email
UPDATE "User" SET "username" = "email" WHERE "username" IS NULL;

-- Step 3: enforce NOT NULL now that all rows have a value
ALTER TABLE "User" ALTER COLUMN "username" SET NOT NULL;
