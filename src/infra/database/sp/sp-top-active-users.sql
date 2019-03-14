DROP FUNCTION IF EXISTS sp_get_top_active_users(integer, integer);
CREATE OR REPLACE FUNCTION public.sp_get_top_active_users(IN paramOffset integer = 0 , IN paramLimit integer = 5 )
  RETURNS TABLE(
    "id" integer,
    "name" varchar,
    "count" integer,
    "listing" json
  ) AS
$BODY$
	SELECT
    a."id",
    a."name",
    (SELECT
      COUNT(b."id")
    FROM "applications" b
    WHERE b."user_id" = a."id"
    )::integer "count",
    (SELECT
      json_agg(t) "listing"
	  FROM (
			SELECT
        d."name"
      FROM "applications" c
      LEFT JOIN "listings" d ON d."id" = c."listing_id"
      WHERE c."user_id" = a."id"
		) t)
  FROM "users" a
  ORDER BY "count" DESC
  OFFSET paramOffset
  LIMIT paramLimit
$BODY$
  LANGUAGE sql VOLATILE;
