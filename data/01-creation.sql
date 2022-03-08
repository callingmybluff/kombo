USE backend;

CREATE TABLE `location` (
  `id` MEDIUMINT UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `longitude` DECIMAL(8, 6) NOT NULL,
  `latitude` DECIMAL(9, 6) NOT NULL
);

CREATE TABLE `city_of_station` (
  `city_id` MEDIUMINT NOT NULL,
  `station_id` MEDIUMINT NOT NULL
);

CREATE TABLE `i18n` (
  `location_id` MEDIUMINT NOT NULL,
  `language_id` TINYINT NOT NULL,
  `name` NVARCHAR(85) NOT NULL
);

CREATE TABLE `language` (
  `id` TINYINT UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(2) NOT NULL,
  `name` NVARCHAR(20)
);

CREATE TABLE `address` (
  `id` MEDIUMINT PRIMARY KEY AUTO_INCREMENT,
  `first` NVARCHAR(120) NOT NULL,
  `second_line` NVARCHAR(60),
  `city` MEDIUMINT NOT NULL
);

CREATE TABLE `location_address` (
  `location_id` MEDIUMINT NOT NULL,
  `address_id` MEDIUMINT NOT NULL
);

ALTER TABLE `city_of_station` ADD FOREIGN KEY (`city_id`) REFERENCES `location` (`id`);

ALTER TABLE `city_of_station` ADD FOREIGN KEY (`station_id`) REFERENCES `location` (`id`);

ALTER TABLE `i18n` ADD FOREIGN KEY (`location_id`) REFERENCES `location` (`id`);

ALTER TABLE `i18n` ADD FOREIGN KEY (`language_id`) REFERENCES `language` (`id`);

ALTER TABLE `location_address` ADD FOREIGN KEY (`location_id`) REFERENCES `location` (`id`);

ALTER TABLE `location_address` ADD FOREIGN KEY (`address_id`) REFERENCES `address` (`id`);