SELECT to_country, COUNT(*) AS count
FROM isl
WHERE DATE(date) = CURDATE()
GROUP BY to_country
ORDER BY count DESC
LIMIT 5;