-- MySQL dump 10.13  Distrib 8.0.23, for Linux (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.23

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;

CREATE TABLE `articles` (
  `Id` int unsigned NOT NULL AUTO_INCREMENT,
  `writerId` varchar(255) DEFAULT NULL,
  `writerName` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `text` text,
  `image` varchar(255) DEFAULT NULL,
  `timeStamp` datetime DEFAULT NULL,
  `likes` int unsigned DEFAULT '0',
  `dislikes` int unsigned DEFAULT '0',
  `score` int DEFAULT NULL,
  `usersLiked` json DEFAULT NULL,
  `usersDisliked` json DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 ;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
  `Id` int unsigned NOT NULL AUTO_INCREMENT,
  `articleId` int unsigned NOT NULL,
  `commentatorId` int unsigned DEFAULT NULL,
  `commentatorName` varchar(255) DEFAULT NULL,
  `comment` text NOT NULL,
  `timeStamp` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 ;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `Id` int unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `admin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 ;

-- Dump completed on 2021-04-05 17:56:04
