-- users
DROP INDEX IF EXISTS unique_user;
CREATE INDEX unique_user ON "users" ("id");

-- companies
DROP INDEX IF EXISTS unique_company;
CREATE INDEX unique_company ON "companies" ("id");

-- teams
DROP INDEX IF EXISTS unique_team_user_company;
CREATE INDEX unique_team_user_company ON "teams" ("user_id", "company_id");

-- listings
DROP INDEX IF EXISTS unique_listing;
CREATE INDEX unique_listing ON "listings" ("id");

DROP INDEX IF EXISTS unique_user_listing;
CREATE INDEX unique_user_listing ON "listings" ("created_by");

-- applications
DROP INDEX IF EXISTS unique_application;
CREATE INDEX unique_application ON "applications" ("id");

DROP INDEX IF EXISTS unique_user_application;
CREATE INDEX unique_user_application ON "applications" ("user_id");
