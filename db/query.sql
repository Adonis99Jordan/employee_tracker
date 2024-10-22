\c winery_app_db;


SELECT 
    shops.id AS shop_id,
    name AS shop_name,
    address AS shop_address,
    users.id AS user_id,
    CONCAT(first_name, '', Last_name) AS user_name,
    email AS user_email,
    wines.id AS wine_id,
    brand AS wine_name,
    type AS wine_type,
    region AS wine_region,
    price AS wine_price
FROM shops 
JOIN users
    ON shops.user_id = users.id
JOIN wines
    ON shops.id = wines.shop_id;









-- SELECT
--     u.id AS user_id,
--     CONCAT(u.first_name, ' ', u.last_name) AS user_name,
--     CONCAT(managers.first_name, ' ', managers.last_name) AS manager_name
-- FROM users AS u
-- LEFT JOIN users AS managers
--     ON u.manager_id = managers.id;