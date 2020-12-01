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
-- Table structure for table `state`
--

DROP TABLE IF EXISTS `state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `state` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `tested` int DEFAULT NULL,
  `fips_code` varchar(45) DEFAULT NULL,
  `abbreviation` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `state`
--

LOCK TABLES `state` WRITE;
/*!40000 ALTER TABLE `state` DISABLE KEYS */;
INSERT INTO `state` VALUES (1,'Alabama',NULL,'1','AL'),(2,'Alaska',NULL,'2','AK'),(3,'Arizona',NULL,'4','AZ'),(4,'Arkansas',NULL,'5','AR'),(5,'California',NULL,'6','CA'),(6,'Colorado',NULL,'8','CO'),(7,'Connecticut',NULL,'9','CT'),(8,'Delaware',NULL,'10','DE'),(9,'Florida',NULL,'12','FL'),(10,'Georgia',NULL,'13','GA'),(11,'Hawaii',NULL,'15','HI'),(12,'Idaho',NULL,'16','ID'),(13,'Illinois',NULL,'17','IL'),(14,'Indiana',NULL,'18','IN'),(15,'Iowa',NULL,'19','IA'),(16,'Kansas',NULL,'20','KS'),(17,'Kentucky',NULL,'21','KY'),(18,'Louisiana',NULL,'22','LA'),(19,'Maine',NULL,'23','ME'),(20,'Montana',NULL,'30','MT'),(21,'Nebraska',NULL,'31','NE'),(22,'Nevada',NULL,'32','NV'),(23,'New Hampshire',NULL,'33','NH'),(24,'New Jersey',NULL,'34','NJ'),(25,'New Mexico',NULL,'35','NM'),(26,'New York',NULL,'36','NY'),(27,'North Carolina',NULL,'37','NC'),(28,'North Dakota',NULL,'38','ND'),(29,'Ohio',NULL,'39','OH'),(30,'Oklahoma',NULL,'40','OK'),(31,'Oregon',NULL,'41','OR'),(32,'Maryland',NULL,'24','MD'),(33,'Massachusetts',NULL,'25','MA'),(34,'Michigan',NULL,'26','MI'),(35,'Minnesota',NULL,'27','MN'),(36,'Mississippi',NULL,'28','MS'),(37,'Missouri',NULL,'29','MO'),(38,'Pennsylvania',NULL,'42','PA'),(39,'Rhode Island',NULL,'44','RI'),(40,'South Carolina',NULL,'45','SC'),(41,'South Dakota',NULL,'46','SD'),(42,'Tennessee',NULL,'47','TN'),(43,'Texas',NULL,'48','TX'),(44,'Utah',NULL,'49','UT'),(45,'Vermont',NULL,'50','VT'),(46,'Virginia',NULL,'51','VA'),(47,'Washington',NULL,'53','WA'),(48,'West Virginia',NULL,'54','WV'),(49,'Wisconsin',NULL,'55','WI'),(50,'Wyoming',NULL,'56','WY');
/*!40000 ALTER TABLE `state` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-30 18:05:09
