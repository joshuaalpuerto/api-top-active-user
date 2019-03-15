DROP FUNCTION IF EXISTS sp_get_user_detail_view(INTEGER, integer, integer);
CREATE OR REPLACE FUNCTION public.sp_get_user_detail_view(IN paramUser integer = null, IN paramOffset integer = 0 , IN paramLimit integer = 5 )
  RETURNS TABLE(
    "id" integer,
    "name" varchar,
    "createdAt" timestamp with time zone,
    "companies" json,
    "createdListings" json,
    "applications" json
  ) AS
$BODY$
	SELECT
    a."id",
    a."name",
    a."created_at",
    (SELECT
      json_agg(t) "companies"
	  FROM (
			SELECT
        b."id",
        b."name",
        b."created_at" "createdAt",
        c."contact_user" "isContact"
      FROM "companies" b
      LEFT JOIN "teams" c ON c."company_id" = b."id"
      WHERE c."user_id" = a."id"
      LIMIT CASE WHEN paramUser IS NULL THEN 5 END
		) t),
    (SELECT
      json_agg(t) "createdListings"
	  FROM (
			SELECT
        d."id",
        d."name",
        d."description",
        d."created_at" "createdAt"
      FROM "listings" d
      WHERE d."created_by" = a."id"
      LIMIT CASE WHEN paramUser IS NULL THEN 5 END
    ) t),
    (SELECT
      json_agg(t) "applications"
	  FROM (
			SELECT
        e."id",
        e."cover_letter" "coverLetter",
        e."created_at" "createdAt",
        (SELECT
          row_to_json(listing) "listings"
        FROM (
          SELECT
            f."id",
            f."name",
            f."description"
          FROM "listings" f
          WHERE f."id" = e."listing_id"
        ) listing) "listing"
      FROM "applications" e
      WHERE e."user_id" = a."id"
      LIMIT CASE WHEN paramUser IS NULL THEN 5 END
		) t)
  FROM "users" a
  WHERE (paramUser IS NULL OR a."id" = paramUser)
  ORDER BY a."name" ASC
  OFFSET paramOffset
  LIMIT paramLimit
$BODY$
  LANGUAGE sql VOLATILE;
