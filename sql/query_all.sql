SELECT to_country, COUNT(*) AS count
FROM isl
GROUP BY to_country
ORDER BY count DESC
LIMIT 5;