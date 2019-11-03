-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 03, 2019 at 08:05 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.0

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
('1AM17CS101', 'NotPassword'),
('1AM17CS127', 'abcde12345#');

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
('1AM17CS127', 'Veg', 'Chai');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `E_ID` varchar(20) NOT NULL,
  `NAME` varchar(20) NOT NULL,
  `DATE` date NOT NULL,
  `TIME` time NOT NULL,
  `DURATION` time NOT NULL,
  `VENUE` varchar(20) NOT NULL,
  `PRICE` int(11) NOT NULL,
  `COORDINATORS` varchar(20) NOT NULL,
  `RULES` varchar(20) NOT NULL,
  `CATEGORY` varchar(20) NOT NULL,
  `TEAM_COUNT` int(11) NOT NULL,
  `COLOR` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`E_ID`, `NAME`, `DATE`, `TIME`, `DURATION`, `VENUE`, `PRICE`, `COORDINATORS`, `RULES`, `CATEGORY`, `TEAM_COUNT`, `COLOR`) VALUES
('E000', 'Group Dance', '2019-09-27', '11:15:00', '07:00:00', 'Main Stage', 600, '1AM17CS127', '6+6 in a team', 'Main Stage', 4, 'Red'),
('E001', 'Solo Singing', '2019-09-27', '12:00:00', '05:00:00', 'Main Stage', 150, '1AM17CS145', 'Time alloted 3+2 min', 'Main Stage', 1, 'Blue'),
('E002', 'Code It', '2019-09-27', '09:30:00', '01:00:00', '201', 150, '1AM17CS005', '', 'Technical', 2, 'Purple'),
('E003', 'Group singing', '2019-09-27', '11:15:00', '05:00:00', 'Main Stage', 600, '1AM17CS102', '6+6 in a team', 'Main Stage', 4, 'Green'),
('E004', 'mad ads', '2019-09-27', '01:00:00', '04:00:00', 'Main Stage', 200, '1AM17CS103', 'Time alloted 3+2 min', 'Main Stage', 4, 'Orange'),
('E005', 'hackaton', '2019-09-27', '09:30:00', '01:00:00', '201', 150, '1AM17CS006', '', 'Technical', 2, 'Purple'),
('E006', 'solo dance', '2019-09-27', '11:15:00', '07:00:00', 'Main Stage', 200, '1AM17CS128', '6+6 in a team', 'Main Stage', 1, 'Red'),
('E007', 'fashion show', '2019-09-27', '05:00:00', '05:30:00', 'Main Stage', 800, '1AM17CS146', 'Time alloted 3+2 min', 'Main Stage', 8, 'Blue'),
('E008', 'quiz', '2019-09-27', '10:30:00', '01:00:00', '201', 150, '1AM17CS123', '', 'Technical', 2, 'Purple');

-- --------------------------------------------------------

--
-- Table structure for table `registration`
--

CREATE TABLE `registration` (
  `R_ID` varchar(20) NOT NULL,
  `E_ID` varchar(20) NOT NULL,
  `USN` varchar(20) NOT NULL,
  `TIMESTAMP` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `DESK_ID` varchar(20) NOT NULL,
  `DESK_USN` varchar(20) NOT NULL,
  `DESKLOCATION` varchar(20) NOT NULL,
  `T_ID` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `EVENTS` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`USN`, `DEPT`, `SEM`, `SECTION`, `PHONE`, `EVENTS`) VALUES
('1AM17CS127', 'CSE', 5, 'B', '2155421546', 'Chai');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `R_ID` varchar(20) NOT NULL,
  `T_ID` varchar(20) NOT NULL,
  `AMOUNT` int(11) NOT NULL,
  `MODE` varchar(20) NOT NULL,
  `STATUS` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  ADD KEY `T_ID` (`T_ID`),
  ADD KEY `E_ID` (`E_ID`),
  ADD KEY `USN` (`USN`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`USN`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`T_ID`),
  ADD KEY `R_ID` (`R_ID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `coordinators`
--
ALTER TABLE `coordinators`
  ADD CONSTRAINT `coordinators_ibfk_1` FOREIGN KEY (`USN`) REFERENCES `students` (`USN`),
  ADD CONSTRAINT `coordinators_ibfk_2` FOREIGN KEY (`USN`) REFERENCES `auth` (`USN`);

--
-- Constraints for table `registration`
--
ALTER TABLE `registration`
  ADD CONSTRAINT `registration_ibfk_1` FOREIGN KEY (`T_ID`) REFERENCES `transactions` (`T_ID`),
  ADD CONSTRAINT `registration_ibfk_2` FOREIGN KEY (`E_ID`) REFERENCES `events` (`E_ID`),
  ADD CONSTRAINT `registration_ibfk_3` FOREIGN KEY (`USN`) REFERENCES `students` (`USN`);

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`R_ID`) REFERENCES `registration` (`R_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
