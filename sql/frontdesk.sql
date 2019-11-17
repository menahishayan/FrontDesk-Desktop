-- phpMyAdmin SQL Dump
-- version 4.7.6
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 17, 2019 at 09:27 AM
-- Server version: 8.0.18
-- PHP Version: 7.1.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `frontdesk`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth`
--

CREATE TABLE `auth` (
  `USN` varchar(10) NOT NULL,
  `PASSWORD` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `auth`
--

INSERT INTO `auth` (`USN`, `PASSWORD`) VALUES
('1AM17CS101', '12345678'),
('1AM17CS102', '12345678'),
('1AM17CS103', '12345678'),
('1AM17CS104', '12345678'),
('1AM17CS105', '12345678'),
('1AM17CS106', '12345678'),
('1AM17CS107', '12345678'),
('1AM17CS108', '12345678'),
('1AM17CS109', '12345678'),
('1AM17CS110', '12345678'),
('1AM17CS111', '12345678'),
('1AM17CS112', '12345678'),
('1AM17CS113', '12345678'),
('1AM17CS114', '12345678'),
('1AM17CS115', '12345678'),
('1AM17CS116', '12345678'),
('1AM17CS117', '12345678'),
('1AM17CS118', '12345678'),
('1AM17CS119', '12345678'),
('1AM17CS120', '12345678'),
('1AM17CS121', '12345678'),
('1AM17CS122', '12345678'),
('1AM17CS123', '12345678'),
('1AM17CS124', '12345678'),
('1AM17CS125', '12345678'),
('1AM17CS126', '12345678'),
('1AM17CS127', '12345678'),
('1AM17CS128', '12345678'),
('1AM17CS129', '12345678'),
('1AM17CS130', '12345678'),
('1AM17CS131', '12345678'),
('1AM17CS132', '12345678'),
('1AM17CS133', '12345678'),
('1AM17CS134', '12345678'),
('1AM17CS135', '12345678');

-- --------------------------------------------------------

--
-- Table structure for table `coordinators`
--

CREATE TABLE `coordinators` (
  `USN` varchar(20) NOT NULL,
  `ROLE` varchar(20) NOT NULL,
  `EVENT` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `coordinators`
--

INSERT INTO `coordinators` (`USN`, `ROLE`, `EVENT`) VALUES
('1AM17CS101', 'Core Team', 'Core'),
('1AM17CS102', 'Coordinator', 'E1001'),
('1AM17CS103', 'Coordinator', 'E1002'),
('1AM17CS104', 'Coordinator', 'E1003'),
('1AM17CS105', 'Coordinator', 'E1004'),
('1AM17CS106', 'Coordinator', 'E1005'),
('1AM17CS107', 'Coordinator', 'E1006'),
('1AM17CS108', 'Coordinator', 'E1007'),
('1AM17CS109', 'Coordinator', 'E1008'),
('1AM17CS110', 'Coordinator', 'E1009'),
('1AM17CS111', 'Coordinator', 'E1010'),
('1AM17CS112', 'Coordinator', 'E1011'),
('1AM17CS113', 'Coordinator', 'E1012'),
('1AM17CS114', 'Coordinator', 'E1013'),
('1AM17CS115', 'Coordinator', 'E1014'),
('1AM17CS116', 'Coordinator', 'E1015'),
('1AM17CS117', 'Coordinator', 'E1016'),
('1AM17CS118', 'Coordinator', 'E1017'),
('1AM17CS119', 'Coordinator', 'E1018'),
('1AM17CS120', 'Coordinator', 'E1019'),
('1AM17CS121', 'Coordinator', 'E1020'),
('1AM17CS122', 'Coordinator', 'E1021'),
('1AM17CS123', 'Coordinator', 'E1022'),
('1AM17CS124', 'Coordinator', 'E1023'),
('1AM17CS125', 'Coordinator', 'E1024'),
('1AM17CS126', 'Coordinator', 'E1025'),
('1AM17CS127', 'Coordinator', 'E1026'),
('1AM17CS128', 'Coordinator', 'E1027'),
('1AM17CS129', 'Coordinator', 'E1028'),
('1AM17CS130', 'Coordinator', 'E1029'),
('1AM17CS131', 'Coordinator', 'E1030'),
('1AM17CS132', 'Coordinator', 'E1031'),
('1AM17CS133', 'Core team', 'Core'),
('1AM17CS134', 'Core team', 'Core'),
('1AM17CS135', 'Core team', 'Core');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `E_ID` varchar(20) NOT NULL,
  `NAME` varchar(20) NOT NULL,
  `DATE` date NOT NULL,
  `TIME` time NOT NULL,
  `DURATION` int(11) NOT NULL,
  `VENUE` varchar(20) NOT NULL,
  `PRICE` int(11) NOT NULL,
  `COORDINATORS` varchar(20) NOT NULL,
  `CATEGORY` varchar(20) NOT NULL,
  `TEAM_COUNT` int(11) NOT NULL,
  `COLOR` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`E_ID`, `NAME`, `DATE`, `TIME`, `DURATION`, `VENUE`, `PRICE`, `COORDINATORS`, `CATEGORY`, `TEAM_COUNT`, `COLOR`) VALUES
('E1001', 'Codeit', '2019-11-15', '10:00:00', 60, ' LH-201', 80, '1AM17CS102', 'TECHNICAL', 2, 'YELLOW'),
('E1002', 'Fasion show', '2019-11-15', '17:00:00', 15, 'MAIN STAGE', 800, '1AM17CS103', 'MAIN STAGE', 8, 'RED'),
('E1003', 'Group singing', '2019-11-15', '10:00:00', 7, 'MAIN STAGE', 400, '1AM17CS104', 'MAIN STAGE', 5, 'RED'),
('E1004', 'Group dance', '2019-11-15', '11:00:00', 7, 'MAIN STAGE', 500, '1AM17CS105', 'MAIN STAGE', 6, 'RED'),
('E1005', 'Solo singing', '2019-11-15', '12:00:00', 5, 'MAIN STAGE', 100, '1AM17CS106', 'MAIN STAGE', 1, 'RED'),
('E1006', 'Solo dance', '2019-11-15', '13:00:00', 6, 'MAIN STAGE', 100, '1AM17CS107', 'MAIN STAGE', 1, 'RED'),
('E1007', 'Hackaton', '2019-11-15', '11:00:00', 60, 'LH-202', 100, '1AM17CS108', 'TECHNICAL', 2, 'YELLOW'),
('E1008', 'Treasure hunt', '2019-11-15', '12:00:00', 120, 'LH-203', 100, '1AM17CS109', 'OFF STAGE', 2, 'BLUE'),
('E1009', 'Beg Borrow Steal', '2019-11-15', '13:00:00', 120, 'LH-204', 100, '1AM17CS110', 'OFF STAGE', 4, 'BLUE'),
('E1010', 'Sketching', '2019-11-15', '14:00:00', 60, 'LH-205', 100, '1AM17CS112', 'OFF STAGE', 1, 'BLUE'),
('E1011', 'Mad ads', '2019-11-15', '15:00:00', 15, 'MAIN STAGE', 200, '1AM17CS113', 'MAIN STAGE', 5, 'RED'),
('E1012', 'Quiz', '2019-11-15', '13:00:00', 60, 'LH-206', 100, '1AM17CS114', 'OFF STAGE', 1, 'BLUE'),
('E1013', 'Debate', '2019-11-15', '11:00:00', 5, 'LH-207', 100, '1AM17CS115', 'TECHNICAL', 1, 'YELLOW'),
('E1014', 'Gaming', '2019-11-15', '12:00:00', 60, 'LH-208', 200, '1AM17CS116', 'OFF STAGE', 4, 'BLUE'),
('E1015', 'Musically King/Queen', '2019-11-15', '15:00:00', 5, 'LH-209', 100, '1AM17CS117', 'OFF STAGE', 1, 'BLUE'),
('E1016', 'Cooking W/o Fire', '2019-11-15', '15:00:00', 30, 'LH-210', 150, '1AM17CS118', 'OFF STAGE', 2, 'BLUE'),
('E1017', 'Rangoli', '2019-11-15', '15:00:00', 45, 'LH-211', 100, '1AM17CS119', 'OFF STAGE', 4, 'BLUE'),
('E1018', 'Poetry', '2019-11-15', '16:00:00', 30, 'LH-212', 80, '1AM17CS120', 'OFF STAGE', 1, 'BLUE'),
('E1019', 'Photography', '2019-11-15', '17:00:00', 30, 'LH-213', 100, '1AM17CS121', 'OFF STAGE', 1, 'BLUE'),
('E1020', 'Dumb Charades', '2019-11-15', '16:00:00', 10, 'LH-214', 80, '1AM17CS122', 'OFF STAGE', 1, 'BLUE'),
('E1021', 'Mr & Ms. Fresher', '2019-11-15', '13:00:00', 120, 'LH-215', 0, '1AM17CS123', 'MAIN STAGE', 1, 'RED'),
('E1022', 'Stand Up Comedy', '2019-11-15', '12:00:00', 8, 'LH-216', 100, '1AM17CS124', 'MAIN STAGE', 1, 'RED'),
('E1023', 'PUBG Mobile', '2019-11-15', '13:00:00', 60, 'LH-217', 400, '1AM17CS125', 'GAMING', 4, 'ORANGE'),
('E1024', 'NFS Most Wanted', '2019-11-15', '11:00:00', 60, 'LH-218', 200, '1AM17CS126', 'GAMING', 2, 'ORANGE'),
('E1025', 'Counter Strike 1.6', '2019-11-15', '14:00:00', 60, 'LH-219', 200, '1AM17CS127', 'GAMING', 2, 'ORANGE'),
('E1026', 'Mini Militia', '2019-11-15', '12:00:00', 20, 'LH-220', 100, '1AM17CS128', 'GAMING', 1, 'ORANGE'),
('E1027', 'Football', '2019-11-15', '14:00:00', 30, 'LH-221', 200, '1AM17CS129', 'SPORTS', 8, 'GREEN'),
('E1028', 'Cricket', '2019-11-15', '13:00:00', 40, 'LH-222', 400, '1AM17CS130', 'SPORTS', 11, 'GREEN'),
('E1029', 'Chess', '2019-11-15', '17:00:00', 20, 'LH-223', 100, '1AM17CS131', 'SPORTS', 1, 'GREEN'),
('E1030', 'Table Tennis', '2019-11-15', '16:00:00', 30, 'LH-224', 100, '1AM17CS132', 'SPORTS', 2, 'GREEN');

-- --------------------------------------------------------

--
-- Table structure for table `registration`
--

CREATE TABLE `registration` (
  `R_ID` varchar(20) NOT NULL,
  `E_ID` varchar(20) NOT NULL,
  `USN` varchar(20) NOT NULL,
  `TIMESTAMP` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `DESK_USN` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `registration`
--

INSERT INTO `registration` (`R_ID`, `E_ID`, `USN`, `DESK_USN`) VALUES
('R1003', 'E1021', '1AM17CS119', '1AM17CS132'),
('R1004', 'E1012', '1AM17CS131', '1AM17CS119');

--
-- Triggers `registration`
--
DELIMITER $$
CREATE TRIGGER `TRANSACT` AFTER INSERT ON `registration` FOR EACH ROW INSERT INTO transactions(R_ID) VALUES(NEW.R_ID)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `rules`
--

CREATE TABLE `rules` (
  `E_ID` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `RULE_NO` int(11) NOT NULL,
  `RULES` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rules`
--

INSERT INTO `rules` (`E_ID`, `RULE_NO`, `RULES`) VALUES
('E1002', 1, 'Test rule 1'),
('E1002', 2, 'Test rule 2');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `USN` varchar(20) NOT NULL,
  `DEPT` varchar(20) NOT NULL,
  `SEM` int(11) NOT NULL,
  `SECTION` varchar(20) NOT NULL,
  `PHONE` varchar(20) NOT NULL,
  `NAME` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`USN`, `DEPT`, `SEM`, `SECTION`, `PHONE`, `NAME`) VALUES
('1AM17CS101', 'cse', 5, 'b', '8971729383', 'Menahi Shayan'),
('1AM17CS102', 'cse', 5, 'a', '5285746350', 'Kayne'),
('1AM17CS103', 'cse', 5, 'b', '6325418596', 'Agnese'),
('1AM17CS104', 'cse', 5, 'b', '5489235489', 'Kylen'),
('1AM17CS105', 'cse', 5, 'b', '2041856329', 'Cordey'),
('1AM17CS106', 'cse', 5, 'b', '6587459856', 'Cassius'),
('1AM17CS107', 'cse', 5, 'b', '3254482635', 'Jodie'),
('1AM17CS108', 'cse', 5, 'a', '9885456565', 'Elliot'),
('1AM17CS109', 'cse', 5, 'b', '9875656755', 'Jazmin'),
('1AM17CS110', 'cse', 5, 'b', '8752542585', 'Sigfrid'),
('1AM17CS111', 'cse', 5, 'b', '7897986877', 'Desmund'),
('1AM17CS112', 'cse', 5, 'b', '8698899879', 'Muire'),
('1AM17CS113', 'cse', 5, 'b', '9787598800', 'Jesse'),
('1AM17CS114', 'cse', 5, 'b', '8688908988', 'Ulrike'),
('1AM17CS115', 'cse', 5, 'b', '9979886760', 'Tamma'),
('1AM17CS116', 'cse', 5, 'b', '9878968666', 'Scott'),
('1AM17CS117', 'cse', 5, 'b', '9088908787', 'Jasper'),
('1AM17CS118', 'cse', 5, 'a', '9989789768', 'Zondra'),
('1AM17CS119', 'cse', 5, 'b', '8895889692', 'Cris'),
('1AM17CS120', 'cse', 5, 'b', '8846988709', 'Feodor'),
('1AM17CS121', 'cse', 5, 'b', '9890998098', 'Nishank Swamy'),
('1AM17CS122', 'cse', 5, 'a', '9770989869', 'Linnie'),
('1AM17CS123', 'cse', 5, 'b', '8798988783', 'Tricia'),
('1AM17CS124', 'cse', 5, 'b', '7879986965', 'Teresina'),
('1AM17CS125', 'cse', 5, 'b', '9807687989', 'Wileen'),
('1AM17CS126', 'cse', 5, 'b', '9878878997', 'Iona'),
('1AM17CS127', 'cse', 5, 'b', '7899876677', 'Vamshi Prasad'),
('1AM17CS128', 'cse', 5, 'b', '8632334434', 'Herminia'),
('1AM17CS129', 'cse', 5, 'b', '9957837838', 'Gabrielle'),
('1AM17CS130', 'cse', 5, 'b', '8998348783', 'Jacklyn'),
('1AM17CS131', 'cse', 5, 'b', '9847848749', 'Elwood'),
('1AM17CS132', 'cse', 5, 'b', '8939387837', 'Podaralla Candy'),
('1AM17CS133', 'cse', 5, 'a', '9986634653', 'Marleah'),
('1AM17CS134', 'cse', 5, 'b', '8660718302', 'Humphrey'),
('1AM17CS135', 'cse', 5, 'b', '8639094896', 'Alvin');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `R_ID` varchar(20) NOT NULL,
  `AMOUNT` int(11) NOT NULL DEFAULT '0',
  `MODE` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `STATUS` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'PENDING'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`R_ID`, `AMOUNT`, `MODE`, `STATUS`) VALUES
('R1003', 0, NULL, 'PENDING'),
('R1004', 0, NULL, 'PENDING');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth`
--
ALTER TABLE `auth`
  ADD PRIMARY KEY (`USN`);

--
-- Indexes for table `coordinators`
--
ALTER TABLE `coordinators`
  ADD PRIMARY KEY (`USN`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`E_ID`);

--
-- Indexes for table `registration`
--
ALTER TABLE `registration`
  ADD PRIMARY KEY (`R_ID`),
  ADD KEY `E_ID` (`E_ID`),
  ADD KEY `USN` (`USN`),
  ADD KEY `registration_ibfk_4` (`DESK_USN`);

--
-- Indexes for table `rules`
--
ALTER TABLE `rules`
  ADD PRIMARY KEY (`E_ID`,`RULE_NO`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`USN`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`R_ID`),
  ADD KEY `R_ID` (`R_ID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `coordinators`
--
ALTER TABLE `coordinators`
  ADD CONSTRAINT `coordinators_ibfk_1` FOREIGN KEY (`USN`) REFERENCES `students` (`USN`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `coordinators_ibfk_2` FOREIGN KEY (`USN`) REFERENCES `auth` (`USN`);

--
-- Constraints for table `registration`
--
ALTER TABLE `registration`
  ADD CONSTRAINT `registration_ibfk_2` FOREIGN KEY (`E_ID`) REFERENCES `events` (`E_ID`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `registration_ibfk_3` FOREIGN KEY (`USN`) REFERENCES `students` (`USN`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `registration_ibfk_4` FOREIGN KEY (`DESK_USN`) REFERENCES `students` (`USN`) ON UPDATE RESTRICT;

--
-- Constraints for table `rules`
--
ALTER TABLE `rules`
  ADD CONSTRAINT `rules_fk1` FOREIGN KEY (`E_ID`) REFERENCES `events` (`E_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
