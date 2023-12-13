-- MySQL dump 10.13  Distrib 8.2.0, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: signingcloudsurvey
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `EVALUATION`
--

DROP TABLE IF EXISTS `EVALUATION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EVALUATION` (
  `evaluation_id` int NOT NULL AUTO_INCREMENT,
  `contractnum` varchar(255) DEFAULT NULL,
  `training_id` int DEFAULT NULL,
  `staff_id` int DEFAULT NULL,
  `state` enum('Pending','Completed') DEFAULT NULL,
  PRIMARY KEY (`evaluation_id`),
  KEY `training_id` (`training_id`),
  KEY `staff_id` (`staff_id`),
  CONSTRAINT `EVALUATION_ibfk_1` FOREIGN KEY (`training_id`) REFERENCES `TRAINING` (`training_id`),
  CONSTRAINT `EVALUATION_ibfk_2` FOREIGN KEY (`staff_id`) REFERENCES `STAFF` (`staff_id`)
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EVALUATION`
--

LOCK TABLES `EVALUATION` WRITE;
/*!40000 ALTER TABLE `EVALUATION` DISABLE KEYS */;
INSERT INTO `EVALUATION` VALUES (134,'10F52BC99E2F16F55118D6C5E6A3322D',1,2,'Completed'),(135,'15A87B0CE5D6F923C36D545E4808D96C',4,2,'Completed');
/*!40000 ALTER TABLE `EVALUATION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `STAFF`
--

DROP TABLE IF EXISTS `STAFF`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `STAFF` (
  `staff_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `division` varchar(255) DEFAULT NULL,
  `role` enum('HR','Staff') DEFAULT NULL,
  `secretkeyword` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`staff_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `STAFF`
--

LOCK TABLES `STAFF` WRITE;
/*!40000 ALTER TABLE `STAFF` DISABLE KEYS */;
INSERT INTO `STAFF` VALUES (1,'Jasminder Kaur','jasminder.jasbir@securemetric.com','HR Manager','HR Department','HR','hr1'),(2,'Cahyo Ihtifazhuddin','cahyo.ihtifazhuddin@signingcloud.com','Data Analyst','Engineering','Staff','sc63'),(3,'Kishanraaj Kathiraso','kishanraaj.kathiraso@signingcloud.com','System Engineer','Engineering','Staff','sc60'),(4,'Chang Pei Shan','peishan.chang@signingcloud.com','Assistant Manager - System Engineering','Engineering','Staff','uhuy'),(5,'Wan Muhammad Syafiq Bin Roslan','muhammad.syafiq@signingcloud.com','Inside Sales','Customer-Focused','Staff','ihiw'),(6,'Hendri Saputra','hendri.saputra@securemetric.com','HR Trainee','HR Department','Staff','akay'),(7,'Someone','someone@email.com','CEO','BOD','Staff','ahoy'),(8,'Another One','anotherone@email.com','CFO','BOD','Staff','uwu'),(10,'test@yopmail.com','test','test','test','Staff','test');
/*!40000 ALTER TABLE `STAFF` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TRAINING`
--

DROP TABLE IF EXISTS `TRAINING`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TRAINING` (
  `training_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `trainer` varchar(255) DEFAULT NULL,
  `training_datetime` int DEFAULT NULL,
  `venue` varchar(255) DEFAULT NULL,
  `state` enum('Ongoing','Pending','Completed') DEFAULT NULL,
  PRIMARY KEY (`training_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TRAINING`
--

LOCK TABLES `TRAINING` WRITE;
/*!40000 ALTER TABLE `TRAINING` DISABLE KEYS */;
INSERT INTO `TRAINING` VALUES (1,'Securemetric Project Management 101','Tan Yu Win',1673773200,'Centagate Room (Old Wing)\r','Ongoing'),(2,'PKI Implementation','Affendi Razak',1675607400,'Centagate Room (Old Wing)\r','Pending'),(3,'SigningCloud User Training','Lee Kay Win',1679309100,'Lab 1 (New Office)','Completed'),(4,'SigningCloud Restful API','Chris Chang',1681132500,'Lab 1 (New Office)','Ongoing'),(5,'Basic finance knowledge','Kelvin Yong',1684150200,'Microsoft Teams (Online)','Pending'),(6,'Microsoft Power Automate','Stuart Tai',1685631600,'Centagate Room (Old Wing)\r','Ongoing'),(7,'Fido Technology','Sea Chong Seak',1689154200,'Centagate Room (Old Wing)\r','Completed'),(8,'Authentication as Service','Au Yong Jin Yoo',1692967500,'Microsoft Teams (Online)','Pending'),(9,'Cert-cycle','Yee Wen Biau',1694354400,'Centagate Room (Old Wing)\r','Completed'),(10,'ID terminal','Yen Chee Khan',1696503600,'Microsoft Teams (Online)','Ongoing');
/*!40000 ALTER TABLE `TRAINING` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USER`
--

DROP TABLE IF EXISTS `USER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USER` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `staff_id` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `staff_id` (`staff_id`),
  CONSTRAINT `USER_ibfk_1` FOREIGN KEY (`staff_id`) REFERENCES `STAFF` (`staff_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USER`
--

LOCK TABLES `USER` WRITE;
/*!40000 ALTER TABLE `USER` DISABLE KEYS */;
INSERT INTO `USER` VALUES (1,'jasmine','hr1',1),(2,'cahyo','123',2),(3,'kishan','234',3),(4,'chris','345',4),(5,'syafiq','456',5),(6,'hendri','567',6),(7,'a','a',7),(8,'b','b',8),(12,'test','test',10);
/*!40000 ALTER TABLE `USER` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-13 14:55:53
