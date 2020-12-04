-- FIND THE NEWEST DATA --

SELECT * FROM asopf_test.covid_data where date=(SELECT MAX(date) AS 'date' FROM asopf_test.covid_data) ORDER BY county_code;