create table `users` (
`user_id` int(20) unsigned NOT NULL AUTO_INCREMENT,
`user` varchar(20) not null,
`fname` varchar(150) not null,
`lname` varchar(150) not null,
`address` text not null,
`phone` char(10) not null,
`email` varchar(100) not null,
`password` varchar(50) not null,
PRIMARY KEY (`user_id`),
UNIQUE KEY `user_id` (`user_id`),
unique key `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

create table `concerts` (
`concert_id` int(20) unsigned NOT NULL AUTO_INCREMENT,
`concert_title` varchar(255) not null,
`concert_amountseat` int(5) not null,
`concert_address` text not null,
`concert_desc` text not null,
`concert_status` enum('canceled', 'coming soon', 'on sale now') not null DEFAULT 'coming soon',
`concert_showtime` datetime not null,
-- `concert_image` varchar(200) not null,
`buy_available` timestamp not null,
`user_user_id` int(20) unsigned,
-- foreign key (`user_user_id`) references `users` (`user_id`),
PRIMARY KEY (`concert_id`),
UNIQUE KEY `concert_id` (`concert_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `images` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `concert_id` int(11) NOT NULL,
  `file_path` varchar(200) NOT NULL,
  `upload_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_by_id` int(11) DEFAULT NULL,
  `main` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

create table `concert_price` (
`id` int(20) unsigned NOT NULL AUTO_INCREMENT,
`price_zone` enum('A','B','C') not null,
`price_seat` varchar(10) not null,
`concert_concert_id` int(20) unsigned,
foreign key (`concert_concert_id`) references `concerts` (`concert_id`),
PRIMARY KEY (`id`),
UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

create table `banking` (
`banking_id` int(20) unsigned NOT NULL AUTO_INCREMENT,
`bank_account1` varchar(20) not null,
PRIMARY KEY (`banking_id`),
UNIQUE KEY `banking_id` (`banking_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

create table `booking` (
`booking_id` int(20) unsigned NOT NULL AUTO_INCREMENT,
`booking_seat` varchar(10) not null,
`booking_concert` varchar(255) not null,
`booking_amount` int(1) not null,
`booking_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
`status` boolean not null,
`booking_price` int(10) not null,
`booking_slip` varchar(255) default null,
`user_user_id` int(20) unsigned,
`banking_banking_id` int(20) unsigned,
`concert_concert_id` int(20) unsigned,
foreign key (`user_user_id`) references `users` (`user_id`),
foreign key (`banking_banking_id`) references `banking` (`banking_id`),
foreign key (`concert_concert_id`) references `concerts` (`concert_id`),
PRIMARY KEY (`booking_id`),
UNIQUE KEY `booking_id` (`booking_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

create table `ticket` (
`ticket_id` int(20) unsigned NOT NULL AUTO_INCREMENT,
`e_image` varchar(255) default null,
`qr_code` varchar(255) NOT NULL,
`booking_booking_id` int(20) unsigned,
foreign key (`booking_booking_id`) references `booking` (`booking_id`),
PRIMARY KEY (`ticket_id`),
UNIQUE KEY `ticket_id` (`ticket_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;


INSERT INTO `concerts` (`concert_id`, `concert_title`, `concert_amountseat`, `concert_address`, `concert_desc`, `concert_status`, `concert_showtime`, `buy_available`, `user_user_id`) VALUES
('1', 'Three man down', 2, 'ladkrabang bangkok thailand 10101', 'abcdefg', 'on sale now', '2000-01-01 10:00:00', '2021-03-09 05:14:41', default),
('2', 'RRCB MBK (ROCK And ROLL Come Back MBK)', 6, 'ladkrabang bangkok thailand 10101', 'abcdefg', 'canceled', '2000-01-01 00:11:10', '2021-03-09 05:14:41', default),
('3', 'Dept', 2, 'ladkrabang bangkok thailand 10101', 'abcdefg', 'canceled', '2000-01-01 21:10:00', '2019-04-09 05:14:41', default),
('4', '2022 FIFA World Cup Qualification (AFC)GROUP G Thailand vs. Indonesia', 2, 'ladkrabang bangkok thailand 10101', 'abcdefg', 'canceled', '1921-05-11 23:59:59', '2021-03-09 05:14:41', default);


INSERT INTO `concert_price` (`id`, `price_zone`, `price_seat`, `concert_concert_id`) VALUES
('1', 'A', 2000, default);

INSERT INTO `users` (`user_id`, `user`, `fname`, `lname`, `address`, `phone`, `email`, `password`) VALUES
('1', 'cus', 'chanakan', 'thudhayanukul', 'bangkok thailand', '0808080808', 'abcde@gmail.com', '12345');

INSERT INTO `ticket` (`ticket_id`, `e_image`, `qr_code`, `booking_booking_id`) VALUES
('1', 'dog', 'https://chart.apis.google.com/chart?cht=qr&chl=webpro&chs=500x500', default);

INSERT INTO `banking` (`banking_id`, `bank_account1`) VALUES
('1', '3622413483');

INSERT INTO `booking` (`booking_id`, `booking_seat`, `booking_concert`, `booking_amount`, `booking_date`, `status`, `booking_price`, `booking_slip`, `user_user_id`, `banking_banking_id`, `concert_concert_id`) VALUES
('1', 'A1', 'Three man down', '1', '2021-03-09 05:14:41', true, 2000, 'abc', default, default, default);

INSERT INTO `images` (`id`, `concert_id`, `file_path`, `upload_date`, `update_by_id`, `main`) VALUES
('1', '1', 'uploads/1.jpg', '2021-03-16 21:03:36', NULL, '1'),
('2', '2', 'uploads/2.jpg', '2021-03-16 21:04:27', NULL, '1'),
('3', '3', 'uploads/3.jpg', '2021-03-16 21:51:56', NULL, '1'),
('4', '4', 'uploads/myImage-1618695697812.jpg', '2021-03-16 21:51:56', NULL, '1');
