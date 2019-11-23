-- phpMyAdmin SQL Dump
-- version 4.7.6
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 23, 2019 at 09:37 AM
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

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `REGISTER` (IN `_E_ID` INT(11), IN `_USN` VARCHAR(20), IN `_NAME` VARCHAR(20), IN `_PHONE` VARCHAR(20), IN `_SEM` INT(11), IN `_SECTION` VARCHAR(20), IN `_PAY` VARCHAR(20), IN `_DESKUSN` VARCHAR(20), IN `_DEPT` VARCHAR(20))  MODIFIES SQL DATA
BEGIN
DECLARE _COUNT INT(11);
DECLARE _R_ID INT(11);
    SELECT
        COUNT(*)
        	INTO _COUNT
    FROM
        students
    WHERE
        USN = _USN;

IF (_COUNT = 0) THEN
    INSERT INTO students(
        USN,
        NAME,
        PHONE,
        SEM,
        SECTION,
        DEPT
    )
VALUES(
    _USN,
    _NAME,
    _PHONE,
    _SEM,
    _SECTION,
    _DEPT
);
END IF;
INSERT INTO registration(E_ID, USN, DESK_USN)
VALUES(_E_ID, _USN, _DESKUSN);

    SELECT
        R_ID
    INTO _R_ID
    FROM
        registration
    WHERE
        E_ID = _E_ID AND USN = _USN 
        ORDER BY `TIMESTAMP` LIMIT 1 ;

UPDATE
    transactions
SET
    `MODE` = _PAY,
    `STATUS` = 'PAID'
WHERE
    R_ID = _R_ID;
    SELECT _R_ID LIMIT 1;
END$$

DELIMITER ;

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
('1AM17CS102', 'Coordinator', '1'),
('1AM17CS103', 'Coordinator', '2'),
('1AM17CS104', 'Coordinator', '3'),
('1AM17CS105', 'Coordinator', '4'),
('1AM17CS106', 'Coordinator', '5'),
('1AM17CS107', 'Coordinator', '6'),
('1AM17CS108', 'Coordinator', '7'),
('1AM17CS109', 'Coordinator', '8'),
('1AM17CS110', 'Coordinator', '9'),
('1AM17CS111', 'Coordinator', '10'),
('1AM17CS112', 'Coordinator', '11'),
('1AM17CS113', 'Coordinator', '12'),
('1AM17CS114', 'Coordinator', '13'),
('1AM17CS115', 'Coordinator', '14'),
('1AM17CS116', 'Coordinator', '15'),
('1AM17CS117', 'Coordinator', '16'),
('1AM17CS118', 'Coordinator', '17'),
('1AM17CS119', 'Coordinator', '18'),
('1AM17CS120', 'Coordinator', '19'),
('1AM17CS121', 'Coordinator', '20'),
('1AM17CS122', 'Coordinator', '21'),
('1AM17CS123', 'Coordinator', '22'),
('1AM17CS124', 'Coordinator', '23'),
('1AM17CS125', 'Coordinator', '24'),
('1AM17CS126', 'Coordinator', '25'),
('1AM17CS127', 'Coordinator', '26'),
('1AM17CS128', 'Coordinator', '27'),
('1AM17CS129', 'Coordinator', '28'),
('1AM17CS130', 'Coordinator', '29'),
('1AM17CS131', 'Coordinator', '30'),
('1AM17CS132', 'Coordinator', '31'),
('1AM17CS133', 'Core team', 'Core'),
('1AM17CS134', 'Core team', 'Core'),
('1AM17CS135', 'Core team', 'Core');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `E_ID` int(11) NOT NULL,
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
(1, 'Codeit', '2019-11-15', '10:00:00', 60, ' LH-201', 80, '1AM17CS102', 'TECHNICAL', 2, 'YELLOW'),
(2, 'Fasion show', '2019-11-15', '17:00:00', 15, 'MAIN STAGE', 800, '1AM17CS103', 'MAIN STAGE', 8, 'RED'),
(3, 'Group singing', '2019-11-15', '10:00:00', 7, 'MAIN STAGE', 400, '1AM17CS104', 'MAIN STAGE', 5, 'RED'),
(4, 'Group dance', '2019-11-15', '11:00:00', 7, 'MAIN STAGE', 500, '1AM17CS105', 'MAIN STAGE', 6, 'RED'),
(5, 'Solo singing', '2019-11-15', '12:00:00', 5, 'MAIN STAGE', 100, '1AM17CS106', 'MAIN STAGE', 1, 'RED'),
(6, 'Solo dance', '2019-11-15', '13:00:00', 6, 'MAIN STAGE', 100, '1AM17CS107', 'MAIN STAGE', 1, 'RED'),
(7, 'Hackaton', '2019-11-15', '11:00:00', 60, 'LH-202', 100, '1AM17CS108', 'TECHNICAL', 2, 'YELLOW'),
(8, 'Treasure hunt', '2019-11-15', '12:00:00', 120, 'LH-203', 100, '1AM17CS109', 'OFF STAGE', 2, 'BLUE'),
(9, 'Beg Borrow Steal', '2019-11-15', '13:00:00', 120, 'LH-204', 100, '1AM17CS110', 'OFF STAGE', 4, 'BLUE'),
(10, 'Sketching', '2019-11-15', '14:00:00', 60, 'LH-205', 100, '1AM17CS112', 'OFF STAGE', 1, 'BLUE'),
(11, 'Mad ads', '2019-11-15', '15:00:00', 15, 'MAIN STAGE', 200, '1AM17CS113', 'MAIN STAGE', 5, 'RED'),
(12, 'Quiz', '2019-11-15', '13:00:00', 60, 'LH-206', 100, '1AM17CS114', 'OFF STAGE', 1, 'BLUE'),
(13, 'Debate', '2019-11-15', '11:00:00', 5, 'LH-207', 100, '1AM17CS115', 'TECHNICAL', 1, 'YELLOW'),
(14, 'Gaming', '2019-11-15', '12:00:00', 60, 'LH-208', 200, '1AM17CS116', 'OFF STAGE', 4, 'BLUE'),
(15, 'Musically King/Queen', '2019-11-15', '15:00:00', 5, 'LH-209', 100, '1AM17CS117', 'OFF STAGE', 1, 'BLUE'),
(16, 'Cooking W/o Fire', '2019-11-15', '15:00:00', 30, 'LH-210', 150, '1AM17CS118', 'OFF STAGE', 2, 'BLUE'),
(17, 'Rangoli', '2019-11-15', '15:00:00', 45, 'LH-211', 100, '1AM17CS119', 'OFF STAGE', 4, 'BLUE'),
(18, 'Poetry', '2019-11-15', '16:00:00', 30, 'LH-212', 80, '1AM17CS120', 'OFF STAGE', 1, 'BLUE'),
(19, 'Photography', '2019-11-15', '17:00:00', 30, 'LH-213', 100, '1AM17CS121', 'OFF STAGE', 1, 'BLUE'),
(20, 'Dumb Charades', '2019-11-15', '16:00:00', 10, 'LH-214', 80, '1AM17CS122', 'OFF STAGE', 1, 'BLUE'),
(21, 'Mr & Ms. Fresher', '2019-11-15', '13:00:00', 120, 'LH-215', 0, '1AM17CS123', 'MAIN STAGE', 1, 'RED'),
(22, 'Stand Up Comedy', '2019-11-15', '12:00:00', 8, 'LH-216', 100, '1AM17CS124', 'MAIN STAGE', 1, 'RED'),
(23, 'PUBG Mobile', '2019-11-15', '13:00:00', 60, 'LH-217', 400, '1AM17CS125', 'GAMING', 4, 'ORANGE'),
(24, 'NFS Most Wanted', '2019-11-15', '11:00:00', 60, 'LH-218', 200, '1AM17CS126', 'GAMING', 2, 'ORANGE'),
(25, 'Counter Strike 1.6', '2019-11-15', '14:00:00', 60, 'LH-219', 200, '1AM17CS127', 'GAMING', 2, 'ORANGE'),
(26, 'Mini Militia', '2019-11-15', '12:00:00', 20, 'LH-220', 100, '1AM17CS128', 'GAMING', 1, 'ORANGE'),
(27, 'Football', '2019-11-15', '14:00:00', 30, 'LH-221', 200, '1AM17CS129', 'SPORTS', 8, 'GREEN'),
(28, 'Cricket', '2019-11-15', '13:00:00', 40, 'LH-222', 400, '1AM17CS130', 'SPORTS', 11, 'GREEN'),
(29, 'Chess', '2019-11-15', '17:00:00', 20, 'LH-223', 100, '1AM17CS131', 'SPORTS', 1, 'GREEN'),
(30, 'Table Tennis', '2019-11-15', '16:00:00', 30, 'LH-224', 100, '1AM17CS132', 'SPORTS', 2, 'GREEN');

-- --------------------------------------------------------

--
-- Table structure for table `registration`
--

CREATE TABLE `registration` (
  `R_ID` int(11) NOT NULL,
  `E_ID` int(11) NOT NULL,
  `USN` varchar(20) NOT NULL,
  `TIMESTAMP` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `DESK_USN` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `registration`
--

INSERT INTO `registration` (`R_ID`, `E_ID`, `USN`, `DESK_USN`) VALUES
(3, 21, '1AM17CS119', '1AM17CS132'),
(4, 12, '1AM17CS131', '1AM17CS119'),
(10, 11, '1AM17CS101', '1AM17CS132'),
(11, 24, '1AM17CS121', '1AM17CS132'),
(12, 11, '1AM17CS110', '1AM17CS132'),
(13, 26, '1AM17CS102', '1AM17CS132'),
(19, 24, '1AM17CS101', '1AM17CS132'),
(26, 11, '1AM18CS102', '1AM17CS132'),
(27, 10, '1AM17CS121', '1AM17CS132'),
(28, 11, '1AM17CS101', '1AM17CS132'),
(29, 11, '1AM17CS121', '1AM17CS132'),
(30, 3, '1am17cs127', '1AM17CS132'),
(31, 21, '1AM17CS132', '1AM17CS132'),
(32, 11, '1AM17CS119', '1AM17CS132'),
(33, 4, '1AM17CS118', '1AM17CS132'),
(34, 15, '1AM17CS112', '1AM17CS132'),
(35, 11, '1AM18CS113', '1AM17CS132'),
(36, 11, '1AM17CS101', '1AM17CS132'),
(37, 9, '1AM17CS132', '1AM17CS132'),
(38, 2, '1AM17CS119', '1AM17CS132'),
(39, 2, '1AM17CS118', '1AM17CS132'),
(40, 3, '1AM17CS105', '1AM17CS132'),
(41, 4, '1AM17CS119', '1AM17CS132'),
(42, 4, '1AM17CS119', '1AM17CS132'),
(43, 4, '1AM17CS120', '1AM17CS132'),
(44, 4, '1AM17CS120', '1AM17CS132'),
(45, 24, '1AM17CS120', '1AM17CS132'),
(46, 3, '1AM17CS120', '1AM17CS132'),
(47, 11, '1AM18CS114', '1AM17CS132'),
(48, 25, '1AM17CS113', '1AM17CS132'),
(49, 23, '1AM17CS113', '1AM17CS132'),
(50, 21, '1AM17CS110', '1AM17CS132'),
(51, 25, '1AM18CS101', '1AM17CS132'),
(52, 24, '1AM18CS100', '1AM17CS132'),
(53, 24, '1AM18CS102', '1AM17CS132'),
(54, 8, '1AM18CS101', '1AM17CS132'),
(55, 12, '1AM18CS102', '1AM17CS132'),
(56, 9, '1AM18CS119', '1AM17CS132'),
(57, 11, '1AM18CS100', '1AM17CS132'),
(58, 10, '1AM17CS119', '1AM17CS132'),
(59, 11, '1AM17CS119', '1AM17CS132'),
(60, 20, '1AM18CS101', '1AM17CS132'),
(61, 24, '1AM18CS101', '1AM17CS132'),
(62, 24, '1AM17CS120', '1AM17CS132'),
(63, 28, '1AM17CS113', '1AM17CS132'),
(64, 20, '1AM17CS116', '1AM17CS132'),
(65, 24, '1AM17CS109', '1AM17CS132'),
(66, 30, '1AM18CS102', '1AM17CS132'),
(67, 12, '1AM17CS101', '1AM17CS132'),
(68, 19, '1AM17CS132', '1AM17CS132'),
(69, 19, '1AM18CS100', '1AM17CS132');

--
-- Triggers `registration`
--
DELIMITER $$
CREATE TRIGGER `TRANSACT` AFTER INSERT ON `registration` FOR EACH ROW INSERT INTO transactions(R_ID, AMOUNT) VALUES(NEW.R_ID, (SELECT PRICE FROM events WHERE events.E_ID=NEW.E_ID))
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `rules`
--

CREATE TABLE `rules` (
  `E_ID` int(11) NOT NULL,
  `RULE_NO` int(11) NOT NULL,
  `RULES` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rules`
--

INSERT INTO `rules` (`E_ID`, `RULE_NO`, `RULES`) VALUES
(2, 1, 'Test rule 1'),
(2, 2, 'Test rule 2');

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
('1AM17CS135', 'cse', 5, 'b', '8639094896', 'Alvin'),
('1AM18CS100', 'CSE', 3, 'B', '723423489', 'BOB'),
('1AM18CS101', 'CSE', 3, 'B', '293842983', 'TOM'),
('1AM18CS102', 'CSE', 3, 'B', '453435342', 'JOB'),
('1AM18CS113', 'cse', 5, 'b', '9890998098', 'Nishank Swamy'),
('1AM18CS114', 'CSE', 3, 'A', '342342342', 'CAP'),
('1AM18CS119', 'CSE', 3, 'B', '934583945', 'ROB');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `R_ID` int(11) NOT NULL,
  `AMOUNT` int(11) NOT NULL DEFAULT '0',
  `MODE` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `STATUS` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'PENDING'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`R_ID`, `AMOUNT`, `MODE`, `STATUS`) VALUES
(3, 0, NULL, 'PENDING'),
(4, 0, NULL, 'PENDING'),
(10, 0, NULL, 'PENDING'),
(11, 0, NULL, 'PENDING'),
(12, 0, NULL, 'PENDING'),
(13, 0, NULL, 'PENDING'),
(19, 200, NULL, 'PENDING'),
(26, 200, 'CASH', 'PAID'),
(27, 100, 'UPI', 'PAID'),
(28, 200, 'CASH', 'PAID'),
(29, 200, 'CASH', 'PAID'),
(30, 400, 'CASH', 'PAID'),
(31, 0, 'UPI', 'PAID'),
(32, 200, 'CASH', 'PAID'),
(33, 500, 'UPI', 'PAID'),
(34, 100, 'UPI', 'PAID'),
(35, 200, '', 'PAID'),
(36, 200, 'CASH', 'PAID'),
(37, 100, 'CASH', 'PAID'),
(38, 800, 'UPI', 'PAID'),
(39, 800, NULL, 'PENDING'),
(40, 400, NULL, 'PENDING'),
(41, 500, NULL, 'PENDING'),
(42, 500, NULL, 'PENDING'),
(43, 500, NULL, 'PENDING'),
(44, 500, NULL, 'PENDING'),
(45, 200, 'CASH', 'PAID'),
(46, 400, NULL, 'PENDING'),
(47, 200, 'CASH', 'PAID'),
(48, 200, 'UPI', 'PAID'),
(49, 400, 'CASH', 'PAID'),
(50, 0, 'CASH', 'PAID'),
(51, 200, 'UPI', 'PAID'),
(52, 200, 'CASH', 'PAID'),
(53, 200, 'UPI', 'PAID'),
(54, 100, 'CASH', 'PAID'),
(55, 100, 'UPI', 'PAID'),
(56, 100, 'CASH', 'PAID'),
(57, 200, 'CASH', 'PAID'),
(58, 100, 'CASH', 'PAID'),
(59, 200, NULL, 'PENDING'),
(60, 80, 'UPI', 'PAID'),
(61, 200, 'CASH', 'PAID'),
(62, 200, NULL, 'PENDING'),
(63, 400, 'CASH', 'PAID'),
(64, 80, 'CASH', 'PAID'),
(65, 200, 'CASH', 'PAID'),
(66, 100, 'CASH', 'PAID'),
(67, 100, 'CASH', 'PAID'),
(68, 100, 'CASH', 'PAID'),
(69, 100, 'CASH', 'PAID');

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `E_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `registration`
--
ALTER TABLE `registration`
  MODIFY `R_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

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
  ADD CONSTRAINT `registration_ibfk_3` FOREIGN KEY (`USN`) REFERENCES `students` (`USN`) ON DELETE CASCADE,
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
