create table `location` (
	`address_id` int(20) unsigned not null,
    `address_name` varchar(255),
    `seat` text,
    `image` varchar(255),
    `amount` int(20) unsigned,
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
`booking_seat` varchar(20) not null,
`booking_concert` varchar(255) not null,
`booking_amount` int(1) not null,
`booking_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
`status` enum('pending', 'success', 'fail') default 'pending'  not null,
`booking_price` int(10) not null,
`booking_slip` varchar(255) default null,
`user_user_id` int(20) unsigned,
`banking_banking_id` int(20) unsigned,
`concert_concert_id` int(20) unsigned,
`address_id` int(20) unsigned,
`ticType` varchar(255),
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
	`id` int(20) unsigned not null auto_increment,
	`booking_id` int(20) unsigned,
    `fname` varchar(255),
    `lname` varchar(255),
    `pay_date` datetime,
    PRIMARY KEY (`id`),
    foreign key (`booking_id`) references `booking` (`booking_id`)
)ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

create table `payimages`(
`id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `payment_id` int(20) unsigned NOT NULL,
  `file_path` varchar(200) NOT NULL,
  `upload_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_by_id` int(11) DEFAULT NULL,

  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  foreign key (`payment_id`) references `payments` (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;


insert into `location` (`address_id`, `address_name`, `seat`, `image`, `amount`) values
(1, 'hotel', 'A1 A2 A3 A4 A5 A6 A7 A8 A9 A10 B1 B2 B3 B4 B5 B6 B7 B8 B9 B10 C1 C2 C3 C4 C5 C6 C7 C8 C9 C10 D1 D2 D3 D4 D5 D6 D7 D8 D9 D10 E1 E2 E3 E4 E5 E6 E7 E8 E9 E10 F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 G1 G2 G3 G4 G5 G6 G7 G8 G9 G10 H1 H2 H3 H4 H5 H6 H7 H8 H9 H10 I1 I2 I3 I4 I5 I6 I7 I8 I9 I10 J1 J2 J3 J4 J5 J6 J7 J8 J9 J10 K1 K2 K3 K4 K5 K6 K7 K8 K9 K10 L1 L2 L3 L4 L5 L6 L7 L8 L9 L10', 'https://i.ibb.co/xmrZjf1/zone-2.png', 120),
(2, 'union', 'A1 A2 A3 A4 A5 A6 A7 A8 A9 A10 A11 A12 A13 A14 B1 B2 B3 B4 B5 B6 B7 B8 B9 B10 B11 B12 B13 B14 C1 C2 C3 C4 C5 C6 C7 C8 C9 C10 C11 C12 C13 C14 D1 D2 D3 D4 D5 D6 D7 D8 D9 D10 D11 D12 D13 D14 E1 E2 E3 E4 E5 E6 E7 E8 E9 E10 E11 E12 E13 E14', 'https://i.ibb.co/Ch2qp7p/zone1.png', 70),
(3, 'centre', 'A1 A2 A3 A4 A5 A6 A7 A8 A9 A10 A11 A12 A13 A14 A15 A16 B1 B2 B3 B4 B5 B6 B7 B8 B9 B10 B11 B12 B13 B14 B15 B16 C1 C2 C3 C4 C5 C6 C7 C8 C9 C10 C11 C12 C13 C14 C15 C16 D1 D2 D3 D4 D5 D6 D7 D8 D9 D10 D11 D12 D13 D14 D15 D16 E1 E2 E3 E4 E5 E6 E7 E8 E9 E10 E11 E12 E13 E14 E15 E16 F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12 F13 F14 F15 F16 G1 G2 G3 G4 G5 G6 G7 G8 G9 G10 G11 G12 G13 G14 G15 G16 H1 H2 H3 H4 H5 H6 H7 H8 H9 H10 H11 H12 H13 H14 H15 H16 I1 I2 I3 I4 I5 I6 I7 I8 I9 I10 I11 I12 I13 I14 I15 I16 J1 J2 J3 J4 J5 J6 J7 J8 J9 J10 J11 J12 J13 J14 J15 J16 K1 K2 K3 K4 K5 K6 K7 K8 K9 K10 K11 K12 K13 K14 K15 K16 L1 L2 L3 L4 L5 L6 L7 L8 L9 L10 L11 L12 L13 L14 L15 L16 M1 M2 M3 M4 M5 M6 M7 M8 M9 M10 M11 M12 M13 M14 M15 M16 N1 N2 N3 N4 N5 N6 N7 N8 N9 N10 N11 N12 N13 N14 N15 N16 O1 O2 O3 O4 O5 O6 O7 O8 O9 O10 O11 O12 O13 O14 O15 O16', 'https://i.ibb.co/92gXVgM/zone3.png', 240);


INSERT INTO `users` (`user_id`, `user`, `fname`, `lname`, `address`, `phone`, `email`, `password`) VALUES
('1', 'admin', 'admin', 'admin','bangkok thailand', '0808080808', 'admin@hotmail.com', 'Admin123'),
('2', 'cus', 'chanakarn', 'prasomkeaw', 'กรุงเทพมหานคร', '093429042', 'chanakarn@hotmail.com', 'Password1'),
('3', 'sell', 'chanakan', 'thudhayanukul', 'กรุงเทพมหานคร', '0894039002', 'chanakan@gmail.com', 'Password1');

INSERT INTO `concerts` (`concert_id`, `concert_title`, `concert_amountseat`, `concert_address`, `concert_desc`, `concert_status`, `concert_showtime`, `buy_available`, `user_user_id`, `address_id`, `price`) VALUES
('1', 'Three man down', 2000, 'โรงแรมคาร์ลตัน กรุงเทพฯ สุขุมวิท', 'อยากฟัง Three Man Down เล่าเรื่องของพวกเขาให้เราได้รู้จักกันมากขึ้น', 'on sale now', '2021-05-20 10:00:00', '2021-03-20 10:00:00', 3, 1, 1000),
('2', 'RRCB MBK (ROCK And ROLL Come Back MBK)', 1000, 'โรงแรมคาร์ลตัน กรุงเทพฯ สุขุมวิท', 'RRCB MBK (ROCK And ROLL Come Back MBK) เลื่อนวันแสดงไม่มีกำหนด สำหรับลูกค้าที่ซื้อบัตรคอนเสิร์ตไปแล้วสามารถเก็บบัตรของท่านไว้สำหรับเข้าชมการแสดงในรอบใหม่ได้', 'on sale now', '2021-06-10 00:11:10', '2021-04-20 10:00:00', 3, 1, 1000),
('3', 'Dept', 800, 'ยูเนี่ยน ฮอลล์, ศูนย์การค้ายูเนี่ยน มอลล์', 'ทำความรู้จักกับสองหนุ่มวง Dept เบนซ์–ภวัต โอภาสสิริโชติ (ร้องนำ/กีตาร์) และ ลุค ทาวน์เซน (คีย์บอร์ด) วงดูโอ้ป๊อปน้องใหม่จากค่ายสมอลล์รูม', 'on sale now', '2021-08-01 21:10:00', '2021-04-09 10:00:00', 3, 2, 1000),
('4', '2gether The Movie', 1000, 'โรงแรมคาร์ลตัน กรุงเทพฯ สุขุมวิท', 'เพราะเราคู่กัน', 'on sale now', '2021-09-22 10:00:00', '2021-04-02 10:00:00', 3, 1, 2000),
('5', 'PHUKET SUNSET BEACH RUN', 500, 'ศูนย์วัฒนธรรมแห่งประเทศไทย หอประชุมใหญ่', 'ภูเก็ตเป็นหนึ่งในจังหวัดที่ดึงดูดนักท่องเที่ยวชาวต่างชาติมากที่สุดในประเทศไทย หนึ่งในสถานที่ท่องเที่ยวหลักของภูเก็ตคือ หาดทรายที่ทอดยาวไปตามชายฝั่งทะเลอันดามัน ซึ่งเป็นทิวทัศน์ที่หาที่ไหนไม่ได้ ', 'on sale now', '2021-07-11 16:30:00', '2021-04-08 10:00:00', 3, 3, 500),
('6', '7เซียน คอนเสิร์ต', 500, 'ยูเนี่ยน ฮอลล์, ศูนย์การค้ายูเนี่ยน มอลล์', 'พวกเราทีมผู้จัดและศิลปิน 7 เซียนคอนเสิร์ต ขอให้แฟน ๆ ที่รอคอยการแสดงทุกคนดูแลสุขภาพของตัวเองและสุข', 'on sale now', '2021-08-26 15:30:00', '2021-05-30 10:00:00', 3, 2, 900),
('7', 'คอนเสิร์ต 36 ปี ปั่น ไพบูลย์เกียรติ เขียวแก้ว', 200, 'บีซีซี ฮอลล์ เซ็นทรัล พลาซ่า ลาดพร้าว ชั้น 5', 'งานคอนเสิร์ต 36 ปี ปั่น ไพบูลย์เกียรติ เขียวแก้ว ย้ายสถานที่แสดงเป็น BCC Hall เซ็นทรัลลาดพร้าว (ชั้น 5) และเลื่อนการแสดง เป็นวันที่ 17 กรกฎาคม 2564 17.00 น.',
 'coming soon', '2021-05-19 14:00:00', '2021-03-06 10:00:00', 3, 2,800),
('8', 'Kamikaze Party 2021', 2000, 'โรงแรมคาร์ลตัน กรุงเทพฯ สุขุมวิท', 'สนุกไปกับ FOUR-MOD, FFK, K-OTIC, WAII, PAYU, KNOMJEAN, MILA, SISKA, SWEE:D, 3.2.1, TIMETHAI และศิลปินเซอร์ไพร์สสุดพิเศษ !!',
 'coming soon', '2021-07-28 16:00:00', '2021-06-22 10:00:00', 3, 1, 1000),
('9', 'แปลรักฉันด้วยใจเธอ เต๋ โอ้เอ๋ว Fan Meeting', 100, 'โยูเนี่ยน ฮอลล์, ศูนย์การค้ายูเนี่ยน มอลล์', 'แปลรักฉันด้วยใจเธอ เต๋ โอ้เอ๋ว Fan Meeting', 'on sale now', '2021-06-30 15:30:00', '2021-03-06 10:00:00', 3, 2, 1200),
('10', '2020 TRINITY INVISIBLE WORLD LIVE IN BANGKOK', 1000, 'โรงแรมคาร์ลตัน กรุงเทพฯ สุขุมวิท', 'ประกาศเลื่อนการจัดคอนเสิร์ต 2020 TRINITY INVISIBLE WORLD LIVE IN BANGKOK : REALITY AND IMAGINATION วันเสาร์ที่ 26 ธันวาคม 2563', 'on sale now', '2021-05-20 16:30:00', '2021-03-10 10:00:00', 3, 1, 1000);


INSERT INTO `banking` (`banking_id`, `bank_account`, `account_name`, `concert_id`, `user_id`, `fname`, `lname`) VALUES
('1', '3622413483', 'SCB', '1', 3, 'chanakan', 'thudhayanukul');

INSERT INTO `booking` (`booking_id`, `booking_seat`, `booking_concert`, `booking_amount`, `booking_date`, `status`, `booking_price`, `booking_slip`, `user_user_id`, `banking_banking_id`, `concert_concert_id`, `address_id`, `ticType`) VALUES
('1', 'A1', 'Three man down', '1', '2021-03-09 05:14:41', 'success', 1000, 'abc', 2, 1, 1, 1, 'E-TICKET');


INSERT INTO `ticket` (`ticket_id`, `qr_code`, `booking_booking_id`) VALUES
('1', 'https://chart.apis.google.com/chart?cht=qr&chl=webpro&chs=500x500', 1);

INSERT INTO `images` (`id`, `concert_id`, `file_path`, `upload_date`, `update_by_id`, `main`) VALUES
('1', '1', 'uploads/566627.jpg', '2021-03-16 21:03:36', NULL, '1'),
('2', '2', 'uploads/rrcb.jpg', '2021-03-16 21:04:27', NULL, '1'),
('3', '3', 'uploads/dept.jpg', '2021-03-16 21:51:56', NULL, '1'),
('4', '4', 'uploads/2gether.jpg', '2021-03-16 21:51:56', NULL, '1'),
('5', '5', 'uploads/phuket.jfif', '2021-03-16 21:51:56', NULL, '1'),
('6', '6', 'uploads/7Sien.png', '2021-03-16 21:51:56', NULL, '1'),
('7', '7', 'uploads/piboon.jpg', '2021-03-16 21:51:56', NULL, '1'),
('8', '8', 'uploads/Kamikaze.webp', '2021-03-16 21:51:56', NULL, '1'),
('9', '9', 'uploads/translatelove.jpg', '2021-03-16 21:51:56', NULL, '1'),
('10', '10', 'uploads/2022trin.jpg', '2021-03-16 21:51:56', NULL, '1');


INSERT INTO `payments` (`id`, `booking_id`, `fname`, `lname`, `pay_date`) VALUES
(1, 1, 'ชนกันต์', 'ตัถยานุกูล', '2021-03-16 21:03:36');

INSERT INTO `payimages` (`id`, `payment_id`, `file_path`, `upload_date`, `update_by_id`) VALUES
('1', '1', 'uploads/1.jpg', '2021-03-16 21:03:36', NULL);


