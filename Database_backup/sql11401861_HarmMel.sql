-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: sql11.freesqldatabase.com    Database: sql11401861
-- ------------------------------------------------------
-- Server version	5.5.62-0ubuntu0.14.04.1

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
-- Table structure for table `HarmMel`
--

DROP TABLE IF EXISTS `HarmMel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HarmMel` (
  `ID_HarmMel` int(11) NOT NULL,
  `ID_Beat` int(11) NOT NULL,
  `ID_Melody` int(11) DEFAULT NULL,
  `ID_Bass` int(11) DEFAULT NULL,
  `ID_Harmony` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_HarmMel`),
  KEY `HarmMel-Harmony_idx` (`ID_Harmony`),
  KEY `HarmMel-Bass_idx` (`ID_Bass`),
  KEY `HarmMel-Melody_idx` (`ID_Melody`),
  CONSTRAINT `HarmMel-Bass` FOREIGN KEY (`ID_Bass`) REFERENCES `Bass` (`ID_Bass`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `HarmMel-Harmony` FOREIGN KEY (`ID_Harmony`) REFERENCES `Harmony` (`ID_Harmony`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `HarmMel-Melody` FOREIGN KEY (`ID_Melody`) REFERENCES `Melody` (`ID_Melody`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HarmMel`
--

LOCK TABLES `HarmMel` WRITE;
/*!40000 ALTER TABLE `HarmMel` DISABLE KEYS */;
INSERT INTO `HarmMel` VALUES (1,1,1,1,1);
/*!40000 ALTER TABLE `HarmMel` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-01 10:46:48
