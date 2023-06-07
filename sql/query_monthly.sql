SELECT to_country, COUNT(*) AS count
FROM isl
WHERE date >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
GROUP BY to_country
ORDER BY count DESC
LIMIT 5;