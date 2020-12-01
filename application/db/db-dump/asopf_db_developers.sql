-- MySQL dump 10.13  Distrib 8.0.21, for macos10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: asopf_db
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `developers`
--

DROP TABLE IF EXISTS `developers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `developers` (
  `id` int DEFAULT NULL,
  `firstName` text,
  `lastName` text,
  `jobTitle` text,
  `imageUrl` text,
  `grade` text,
  `major` text,
  `school` text,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `developers`
--

LOCK TABLES `developers` WRITE;
/*!40000 ALTER TABLE `developers` DISABLE KEYS */;
INSERT INTO `developers` VALUES (1,'Nicholas','Handy','Backend Developer','https://i.imgur.com/ttAJlMh.jpg','Senior','Computer Engineering','SFSU','Focusing on developing skills in Backend Programming with MySQL and Javascript. Also exploring AWS Server Management to employ CI/CD'),(6,'Alexandre','de Charry','Github Manager & Full Stack Developer','https://i.imgur.com/vpmPibh.png','Exchange','Computer Science','SFSU','Experienced game developer, web developper and business intelligence engineer'),(7,'Erik','Loza','Backend Developer','https://i.imgur.com/mNMZPiL.jpeg','Senior','Computer Engineering','SFSU','Experienced in app development in ios and android devices'),(8,'Huan','NguyenKim','Full Stack Developer','https://i.imgur.com/q8mUEcu.jpg','Senior','Computer Science','SFSU',NULL),(9,'Mohammad','Razavi','Front & Backend Developer','https://i.imgur.com/vH9GUoj.jpeg','Senior','Computer Science','SFSU','Experienced in cross-platform coding, databases, and application support. Worked in telecommunication, mainly hardware.'),(10,'Siddhi','Rote','UI Design/Developer','https://i.imgur.com/7h08P7g.png','Senior','Computer Science','SFSU','International student and an aspiring UI Designer.'),(11,'Ufkun','Erdin','Team Lead & Backend Developer','https://i.imgur.com/NaTA0s6.png','Senior','Computer Science','SFSU','Worked in webdev & IT for 3 years before going back to school full-time.');
/*!40000 ALTER TABLE `developers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-30 18:05:11
