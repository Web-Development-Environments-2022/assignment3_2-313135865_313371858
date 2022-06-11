-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `family_recipes`
--

DROP TABLE IF EXISTS `family_recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `family_recipes` (
  `user_id` int NOT NULL,
  `recipe_owner` varchar(45) NOT NULL,
  `recipe_name` varchar(45) NOT NULL,
  `dedicated_time` varchar(45) NOT NULL,
  `ingredients` varchar(250) NOT NULL,
  `instructions` varchar(250) NOT NULL,
  `image` varchar(250) NOT NULL,
  KEY `user_id_family_idx` (`user_id`),
  CONSTRAINT `family_user_id_recipes` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `family_recipes`
--

LOCK TABLES `family_recipes` WRITE;
/*!40000 ALTER TABLE `family_recipes` DISABLE KEYS */;
INSERT INTO `family_recipes` VALUES (3,'Yonman3','','Shavout','ingredients','instructions','image'),(3,'Yonman3','cheese cake','Shavout','cream cheese, sugar, vanilla extract, eggs','Process graham crackers; mix with sugar, salt, butter:\nPulse the graham crackers in a food processor or blender until finely ground. Put in a large bowl, and stir in the sugar and salt. Stir in the melted butter.','https://www.simplyrecipes.com/thmb/J8bCbcrKXGv8EjPDV9001Ct585Q=/720x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Perfect-Cheesecake-LEAD-12-b66d9b6cce9b444e8c7410b2161e36b8.jpg'),(1,'Yonman3','pie','Shavout','cream cheese, salt, eggs','Process graham crackers; mix with sugar, salt, butter:\nPulse the graham crackers in a food processor or blender until finely ground. Put in a large bowl, and stir in the sugar and salt. Stir in the melted butter.','https://www.simplyrecipes.com/thmb/J8bCbcrKXGv8EjPDV9001Ct585Q=/720x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Perfect-Cheesecake-LEAD-12-b66d9b6cce9b444e8c7410b2161e36b8.jpg');
/*!40000 ALTER TABLE `family_recipes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-11 16:00:45
