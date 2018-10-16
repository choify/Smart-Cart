USE projectdb;

CREATE TABLE data_sensor (
    ID INT NOT NULL AUTO_INCREMENT,
    DATE DATETIME DEFAULT CURRENT_TIMESTAMP,
    VALUE TEXT NOT NULL,
    PRIMARY KEY (ID)
);

-- SELECT
--     ID,
--     DATE_FORMAT(DATE, "%Y-%m-%d %H:%i:%S") as DATE,
--     value as VALUE
-- FROM data_sensor;