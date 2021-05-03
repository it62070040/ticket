create table `location` (
	`address_id` int(20) unsigned not null,
    `address_name` varchar(255),
    `seat` text,
    `image` varchar(255),
    primary key (`address_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    
create table `users` (
`user_id` int(20) unsigned NOT NULL AUTO_INCREMENT,
`user` varchar(20) not null,
`fname` varchar(150) not null,
`lname` varchar(150) not null,
`address` text not null,
`phone` char(10) not null,
`email` varchar(100) not null,
`password` varchar(255) not null,
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
`buy_available` timestamp not null,
`user_user_id` int(20) unsigned,
`address_id` int(20) unsigned,
`price` int(20) unsigned,
foreign key (`user_user_id`) references `users` (`user_id`),
foreign key (`address_id`) references `location` (`address_id`),
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

create table `banking` (
`banking_id` int(20) unsigned NOT NULL AUTO_INCREMENT,
`bank_account` varchar(20) not null,
`account_name` varchar(20) not null,
`concert_id` int(20) unsigned,
`user_id` int(20) unsigned,
`fname` varchar(150),
`lname` varchar(150),
PRIMARY KEY (`banking_id`),
foreign key (`concert_id`) references `concerts` (`concert_id`),
foreign key (`user_id`) references `users` (`user_id`),
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
`address_id` int(20) unsigned,
foreign key (`user_user_id`) references `users` (`user_id`),
foreign key (`banking_banking_id`) references `banking` (`banking_id`),
foreign key (`concert_concert_id`) references `concerts` (`concert_id`),
foreign key (`address_id`) references `location` (`address_id`),
PRIMARY KEY (`booking_id`),
UNIQUE KEY `booking_id` (`booking_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

create table `ticket` (
`ticket_id` int(20) unsigned NOT NULL AUTO_INCREMENT,
`qr_code` varchar(255) NOT NULL,
`booking_booking_id` int(20) unsigned,
foreign key (`booking_booking_id`) references `booking` (`booking_id`),
PRIMARY KEY (`ticket_id`),
UNIQUE KEY `ticket_id` (`ticket_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(20) unsigned NOT NULL,
  `token` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tokens_UN` (`token`),
  KEY `token_FK` (`user_id`),
  CONSTRAINT `token_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
);
create table `payments`(
	`booking_id` int(20) unsigned,
    `fname` varchar(255),
    `lname` varchar(255),
    `pay_date` datetime,
    `bank` varchar(255),
    `image` varchar(255),
    foreign key (`booking_id`) references `booking` (`booking_id`)
);

insert into `location` (`address_id`, `address_name`, `seat`, `image`) values
(1, 'hotel', 'A1 A2 A3 A4 A5 A6 A7 A8 A9 A10 B1 B2 B3 B4 B5 B6 B7 B8 B9 B10 C1 C2 C3 C4 C5 C6 C7 C8 C9 C10 D1 D2 D3 D4 D5 D6 D7 D8 D9 D10 E1 E2 E3 E4 E5 E6 E7 E8 E9 E10 F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 G1 G2 G3 G4 G5 G6 G7 G8 G9 G10 H1 H2 H3 H4 H5 H6 H7 H8 H9 H10 I1 I2 I3 I4 I5 I6 I7 I8 I9 I10 J1 J2 J3 J4 J5 J6 J7 J8 J9 J10 K1 K2 K3 K4 K5 K6 K7 K8 K9 K10 L1 L2 L3 L4 L5 L6 L7 L8 L9 L10', 'https://i.ibb.co/xmrZjf1/zone-2.png'),
(2, 'union', 'A1 A2 A3 A4 A5 A6 A7 A8 A9 A10 A11 A12 A13 A14 B1 B2 B3 B4 B5 B6 B7 B8 B9 B10 B11 B12 B13 B14 C1 C2 C3 C4 C5 C6 C7 C8 C9 C10 C11 C12 C13 C14 D1 D2 D3 D4 D5 D6 D7 D8 D9 D10 D11 D12 D13 D14 E1 E2 E3 E4 E5 E6 E7 E8 E9 E10 E11 E12 E13 E14', 'https://i.ibb.co/Ch2qp7p/zone1.png'),
(3, 'centre', 'A1 A2 A3 A4 A5 A6 A7 A8 A9 A10 A11 A12 A13 A14 A15 A16 B1 B2 B3 B4 B5 B6 B7 B8 B9 B10 B11 B12 B13 B14 B15 B16 C1 C2 C3 C4 C5 C6 C7 C8 C9 C10 C11 C12 C13 C14 C15 C16 D1 D2 D3 D4 D5 D6 D7 D8 D9 D10 D11 D12 D13 D14 D15 D16 E1 E2 E3 E4 E5 E6 E7 E8 E9 E10 E11 E12 E13 E14 E15 E16 F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12 F13 F14 F15 F16 G1 G2 G3 G4 G5 G6 G7 G8 G9 G10 G11 G12 G13 G14 G15 G16 H1 H2 H3 H4 H5 H6 H7 H8 H9 H10 H11 H12 H13 H14 H15 H16 I1 I2 I3 I4 I5 I6 I7 I8 I9 I10 I11 I12 I13 I14 I15 I16 J1 J2 J3 J4 J5 J6 J7 J8 J9 J10 J11 J12 J13 J14 J15 J16 K1 K2 K3 K4 K5 K6 K7 K8 K9 K10 K11 K12 K13 K14 K15 K16 L1 L2 L3 L4 L5 L6 L7 L8 L9 L10 L11 L12 L13 L14 L15 L16 M1 M2 M3 M4 M5 M6 M7 M8 M9 M10 M11 M12 M13 M14 M15 M16 N1 N2 N3 N4 N5 N6 N7 N8 N9 N10 N11 N12 N13 N14 N15 N16 O1 O2 O3 O4 O5 O6 O7 O8 O9 O10 O11 O12 O13 O14 O15 O16', 'https://i.ibb.co/92gXVgM/zone3.png');


INSERT INTO `users` (`user_id`, `user`, `fname`, `lname`, `address`, `phone`, `email`, `password`) VALUES
('1', 'admin', 'admin', 'admin','bangkok thailand', '0808080808', 'admin@hotmail.com', 'Admin123'),
('2', 'cus', 'chanakarn', 'prasomkeaw', 'กรุงเทพมหานคร', '093429042', 'chanakarn@hotmail.com', 'Password1'),
('3', 'sell', 'chanakan', 'thudhayanukul', 'กรุงเทพมหานคร', '0894039002', 'chanakan@gmail.com', 'Password1');

INSERT INTO `concerts` (`concert_id`, `concert_title`, `concert_amountseat`, `concert_address`, `concert_desc`, `concert_status`, `concert_showtime`, `buy_available`, `user_user_id`, `address_id`, `price`) VALUES
('1', 'Three man down', 2, 'ladkrabang bangkok thailand 10101', 'abcdefg', 'on sale now', '2000-01-01 10:00:00', '2021-03-09 05:14:41', 3, 1, 1000),
('2', 'RRCB MBK (ROCK And ROLL Come Back MBK)', 6, 'ladkrabang bangkok thailand 10101', 'abcdefg', 'canceled', '2000-01-01 00:11:10', '2021-03-09 05:14:41', 3, 1, 1000),
('3', 'Dept', 2, 'ladkrabang bangkok thailand 10101', 'abcdefg', 'canceled', '2000-01-01 21:10:00', '2019-04-09 05:14:41', 3, 2, 1000),
('4', '2022 FIFA World Cup Qualification (AFC)GROUP G Thailand vs. Indonesia', 2, 'ladkrabang bangkok thailand 10101', 'abcdefg', 'canceled', '1921-05-11 23:59:59', '2021-03-09 05:14:41', 3, 3, 1000);

INSERT INTO `banking` (`banking_id`, `bank_account`, `account_name`, `concert_id`, `user_id`, `fname`, `lname`) VALUES
('1', '3622413483', 'SCB', '1', 3, 'chanakan', 'thudhayanukul');

INSERT INTO `booking` (`booking_id`, `booking_seat`, `booking_concert`, `booking_amount`, `booking_date`, `status`, `booking_price`, `booking_slip`, `user_user_id`, `banking_banking_id`, `concert_concert_id`, `address_id`) VALUES
('1', 'A1', 'Three man down', '1', '2021-03-09 05:14:41', true, 1000, 'abc', 2, 1, 1, 1);


INSERT INTO `ticket` (`ticket_id`, `qr_code`, `booking_booking_id`) VALUES
('1', 'https://chart.apis.google.com/chart?cht=qr&chl=webpro&chs=500x500', 1);



INSERT INTO `images` (`id`, `concert_id`, `file_path`, `upload_date`, `update_by_id`, `main`) VALUES
('1', '1', 'uploads/1.jpg', '2021-03-16 21:03:36', NULL, '1'),
('2', '2', 'uploads/2.jpg', '2021-03-16 21:04:27', NULL, '1'),
('3', '3', 'uploads/3.jpg', '2021-03-16 21:51:56', NULL, '1'),
('4', '4', 'uploads/myImage-1618695697812.jpg', '2021-03-16 21:51:56', NULL, '1');

