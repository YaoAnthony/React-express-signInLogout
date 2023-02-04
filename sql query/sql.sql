-- CREATE TABLE `user`.`userinfo` (
--   `username` VARCHAR(90) NOT NULL,
--   `password` VARCHAR(45) NULL,
--   PRIMARY KEY (`username`)
-- );


CREATE TABLE `user`.`userinfo` (
  `id` VARCHAR(48) NOT NULL,
  `username` VARCHAR(90) NULL,
  `password` VARCHAR(45) NULL,
  PRIMARY KEY (`id`)
);