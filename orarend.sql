CREATE TABLE `terem` (
    `teremszam` varchar(4) PRIMARY KEY,
    `kapacitas` int(3) NOT NULL,
    `gepterem_e` tinyint(1) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE `tantargy` (
    `nev` varchar(255) PRIMARY KEY
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE `tanar` (
    `pedagogus_id` varchar(8) PRIMARY KEY,
    `nev` varchar(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE `tanitott_targyak` (
    `pedagogus_id` varchar(255) NOT NULL,
    `targynev` varchar(255) NOT NULL,
    PRIMARY KEY (`pedagogus_id`, `targynev`),
    FOREIGN KEY (`pedagogus_id`) REFERENCES `tanar` (`pedagogus_id`) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (`targynev`) REFERENCES `tantargy` (`nev`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE `osztaly` (
    `osztaly_id` varchar(3) PRIMARY KEY,
    `kezdes_eve` int(4) NOT NULL,
    `vegzes_eve` int(4) NOT NULL,
    `letszam` int(2) NOT NULL,
    `pedagogus_id` varchar(8) NOT NULL,
    `teremszam` varchar(4) NOT NULL,
    FOREIGN KEY (`pedagogus_id`) REFERENCES `tanar` (`pedagogus_id`) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (`teremszam`) REFERENCES `terem` (`teremszam`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE `ora` (
    `teremszam` varchar(4) NOT NULL,
    `nap` varchar(9) NOT NULL,
    `ora` int(1) NOT NULL,
    `osztaly_id` varchar(3) NOT NULL,
    `pedagogus_id` varchar(8) NOT NULL,
    `nev` varchar(255) NOT NULL,
    PRIMARY KEY (`teremszam`, `nap`, `ora`),
    FOREIGN KEY (`teremszam`) REFERENCES `terem` (`teremszam`),
    FOREIGN KEY (`osztaly_id`) REFERENCES `osztaly` (`osztaly_id`) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (`pedagogus_id`) REFERENCES `tanar` (`pedagogus_id`) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (`nev`) REFERENCES `tantargy` (`nev`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `terem` (`teremszam`, `kapacitas`, `gepterem_e`) VALUES
('101', 35, 0),
('102', 35, 0),
('103', 35, 0),
('104', 30, 0),
('201', 35, 0),
('202', 35, 0),
('203', 35, 0),
('204', 30, 0),
('301', 35, 0),
('302', 35, 0),
('303', 35, 0),
('304', 30, 0),
('401', 35, 0),
('402', 35, 0),
('403', 35, 0),
('404', 30, 0),
('Bkt', 35, 0),
('Fizt', 35, 0),
('Inft', 35, 1),
('Ktt', 30, 0),
('Rtt', 35, 0),
('Tcs1', 35, 0),
('Tcs2', 35, 0);

INSERT INTO `tantargy` (`nev`) VALUES
('Angol'),
('Biológia'),
('Ének'),
('Etika'),
('Filozófia'),
('Fizika'),
('Földrajz'),
('Francia'),
('Informatika'),
('Kémia'),
('Magyar'),
('Matematika'),
('Média'),
('Német'),
('Osztályfőnöki'),
('Rajz'),
('Technika'),
('Testnevelés'),
('Történelem');

INSERT INTO `tanar` (`pedagogus_id`, `nev`) VALUES
('0SBUE5MM', 'Rentai Renáta'),
('74KWDST7', 'Antai-Kelemen Ádám'),
('8C0QTBLZ', 'Neményi Arnold'),
('8YC7MCB3', 'Korponay Andrea'),
('9O6RK7KA', 'Varga Kata'),
('AZZSJ3WH', 'Tóth Viktória'),
('AZZXW5BC', 'Zsidák Gábor'),
('B5Q5H0QR', 'Bernáth András'),
('D52A77MD', 'Bíró Péter'),
('DFESTIF2', 'Vladár Ervin'),
('G488J1K5', 'Nagy Zsolt'),
('J0S8SV4V', 'Pósa Richárd'),
('JFEDR9GJ', 'Barka Gabriella'),
('JQVJBU3K', 'Haraszti Róbert'),
('NWBZO02C', 'Felmayer Dávid'),
('V7RHW6UP', 'Bencze Virág'),
('XVN510IT', 'Szatmáry Kinga'),
('YN76SVZV', 'Farkas Evelin'),
('YT34O9UM', 'Haller Endre'),
('ZUPO2DN6', 'Kardos Kálmán');

INSERT INTO `tanitott_targyak` (`pedagogus_id`, `targynev`) VALUES
('0SBUE5MM', 'Francia'),
('0SBUE5MM', 'Magyar'),
('0SBUE5MM', 'Osztályfőnöki'),
('74KWDST7', 'Angol'),
('74KWDST7', 'Német'),
('74KWDST7', 'Osztályfőnöki'),
('8C0QTBLZ', 'Magyar'),
('8C0QTBLZ', 'Történelem'),
('8YC7MCB3', 'Testnevelés'),
('9O6RK7KA', 'Biológia'),
('9O6RK7KA', 'Kémia'),
('AZZSJ3WH', 'Média'),
('AZZSJ3WH', 'Rajz'),
('AZZXW5BC', 'Fizika'),
('AZZXW5BC', 'Kémia'),
('B5Q5H0QR', 'Informatika'),
('B5Q5H0QR', 'Matematika'),
('B5Q5H0QR', 'Osztályfőnöki'),
('D52A77MD', 'Informatika'),
('DFESTIF2', 'Etika'),
('DFESTIF2', 'Filozófia'),
('G488J1K5', 'Biológia'),
('G488J1K5', 'Testnevelés'),
('J0S8SV4V', 'Fizika'),
('J0S8SV4V', 'Kémia'),
('J0S8SV4V', 'Osztályfőnöki'),
('JFEDR9GJ', 'Ének'),
('JQVJBU3K', 'Informatika'),
('JQVJBU3K', 'Matematika'),
('JQVJBU3K', 'Osztályfőnöki'),
('NWBZO02C', 'Matematika'),
('NWBZO02C', 'Osztályfőnöki'),
('V7RHW6UP', 'Osztályfőnöki'),
('V7RHW6UP', 'Rajz'),
('V7RHW6UP', 'Technika'),
('XVN510IT', 'Földrajz'),
('XVN510IT', 'Osztályfőnöki'),
('XVN510IT', 'Történelem'),
('YN76SVZV', 'Földrajz'),
('YN76SVZV', 'Történelem'),
('YT34O9UM', 'Angol'),
('YT34O9UM', 'Német'),
('YT34O9UM', 'Osztályfőnöki'),
('ZUPO2DN6', 'Francia'),
('ZUPO2DN6', 'Magyar'),
('ZUPO2DN6', 'Osztályfőnöki');

INSERT INTO `osztaly` (`osztaly_id`, `kezdes_eve`, `vegzes_eve`, `letszam`, `pedagogus_id`, `teremszam`) VALUES
('10a', 2013, 2017, 30, 'JQVJBU3K', '201'),
('10b', 2013, 2017, 29, 'B5Q5H0QR', '202'),
('11a', 2014, 2018, 28, 'J0S8SV4V', '301'),
('11b', 2014, 2018, 29, 'V7RHW6UP', '302'),
('12a', 2015, 2019, 27, 'NWBZO02C', '103'),
('12b', 2015, 2019, 26, 'XVN510IT', '203'),
('13a', 2016, 2020, 25, 'YT34O9UM', '401'),
('13b', 2016, 2020, 27, 'ZUPO2DN6', '402'),
('9a', 2012, 2017, 32, '0SBUE5MM', '101'),
('9b', 2012, 2017, 33, '74KWDST7', '102');

INSERT INTO `ora` (`teremszam`, `nap`, `ora`, `osztaly_id`, `pedagogus_id`, `nev`) VALUES
('301', 'Csütörtök', 1, '11a', 'XVN510IT', 'Történelem'),
('301', 'Csütörtök', 2, '11a', 'YT34O9UM', 'Német'),
('301', 'Csütörtök', 5, '11a', '74KWDST7', 'Angol'),
('301', 'Csütörtök', 6, '11a', '0SBUE5MM', 'Magyar'),
('301', 'Hétfő', 1, '11a', 'YT34O9UM', 'Német'),
('301', 'Hétfő', 2, '11a', 'XVN510IT', 'Történelem'),
('301', 'Hétfő', 3, '11a', 'YN76SVZV', 'Földrajz'),
('301', 'Hétfő', 4, '11a', 'NWBZO02C', 'Matematika'),
('301', 'Hétfő', 6, '11a', '74KWDST7', 'Angol'),
('301', 'Hétfő', 7, '11a', '74KWDST7', 'Angol'),
('301', 'Kedd', 0, '11a', 'NWBZO02C', 'Matematika'),
('301', 'Kedd', 3, '11a', 'YT34O9UM', 'Német'),
('301', 'Kedd', 4, '11a', '0SBUE5MM', 'Magyar'),
('301', 'Kedd', 5, '11a', '0SBUE5MM', 'Magyar'),
('301', 'Kedd', 6, '11a', '74KWDST7', 'Angol'),
('301', 'Péntek', 1, '11a', 'YN76SVZV', 'Földrajz'),
('301', 'Péntek', 2, '11a', 'JFEDR9GJ', 'Ének'),
('301', 'Péntek', 4, '11a', 'NWBZO02C', 'Matematika'),
('301', 'Péntek', 6, '11a', 'J0S8SV4V', 'Osztályfőnöki'),
('301', 'Szerda', 1, '11a', 'NWBZO02C', 'Matematika'),
('301', 'Szerda', 2, '11a', '74KWDST7', 'Angol'),
('301', 'Szerda', 5, '11a', '0SBUE5MM', 'Magyar'),
('301', 'Szerda', 6, '11a', 'YT34O9UM', 'Német'),
('301', 'Szerda', 7, '11a', 'YT34O9UM', 'Német'),
('Bkt', 'Csütörtök', 4, '11a', 'J0S8SV4V', 'Kémia'),
('Bkt', 'Hétfő', 5, '11a', 'J0S8SV4V', 'Kémia'),
('Bkt', 'Péntek', 5, '11a', 'G488J1K5', 'Biológia'),
('Bkt', 'Szerda', 3, '11a', 'G488J1K5', 'Biológia'),
('Fizt', 'Csütörtök', 3, '11a', 'AZZXW5BC', 'Fizika'),
('Fizt', 'Kedd', 2, '11a', 'AZZXW5BC', 'Fizika'),
('Inft', 'Hétfő', 8, '11a', 'JQVJBU3K', 'Informatika'),
('Inft', 'Szerda', 4, '11a', 'JQVJBU3K', 'Informatika'),
('Ktt', 'Csütörtök', 7, '11a', '8YC7MCB3', 'Testnevelés'),
('Ktt', 'Péntek', 3, '11a', '8YC7MCB3', 'Testnevelés'),
('Rtt', 'Kedd', 1, '11a', 'V7RHW6UP', 'Rajz');

