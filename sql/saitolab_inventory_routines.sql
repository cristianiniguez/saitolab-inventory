-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: saitolab_inventory
-- ------------------------------------------------------
-- Server version	8.0.21

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
-- Temporary view structure for view `stock_view`
--

DROP TABLE IF EXISTS `stock_view`;
/*!50001 DROP VIEW IF EXISTS `stock_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `stock_view` AS SELECT 
 1 AS `name`,
 1 AS `purchases`,
 1 AS `purchases_value`,
 1 AS `sales`,
 1 AS `sales_value`,
 1 AS `profit`,
 1 AS `stock`,
 1 AS `value`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `transactions_view`
--

DROP TABLE IF EXISTS `transactions_view`;
/*!50001 DROP VIEW IF EXISTS `transactions_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `transactions_view` AS SELECT 
 1 AS `id`,
 1 AS `id_product`,
 1 AS `name`,
 1 AS `quantity`,
 1 AS `type`,
 1 AS `price`,
 1 AS `amount`,
 1 AS `date`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `stock_view`
--

/*!50001 DROP VIEW IF EXISTS `stock_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `stock_view` AS select `p`.`name` AS `name`,sum(if((`t`.`type` = 'purchase'),`t`.`quantity`,0)) AS `purchases`,round((sum(if((`t`.`type` = 'purchase'),`t`.`quantity`,0)) * `p`.`purchase_price`),2) AS `purchases_value`,sum(if((`t`.`type` = 'sale'),`t`.`quantity`,0)) AS `sales`,round((sum(if((`t`.`type` = 'sale'),`t`.`quantity`,0)) * `p`.`sale_price`),2) AS `sales_value`,(round((sum(if((`t`.`type` = 'sale'),`t`.`quantity`,0)) * `p`.`sale_price`),2) - round((sum(if((`t`.`type` = 'purchase'),`t`.`quantity`,0)) * `p`.`purchase_price`),2)) AS `profit`,(sum(if((`t`.`type` = 'purchase'),`t`.`quantity`,0)) - sum(if((`t`.`type` = 'sale'),`t`.`quantity`,0))) AS `stock`,round(((sum(if((`t`.`type` = 'purchase'),`t`.`quantity`,0)) - sum(if((`t`.`type` = 'sale'),`t`.`quantity`,0))) * `p`.`purchase_price`),2) AS `value` from (`transactions` `t` join `products` `p` on((`t`.`id_product` = `p`.`id`))) group by `t`.`id_product` order by `t`.`id_product` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `transactions_view`
--

/*!50001 DROP VIEW IF EXISTS `transactions_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `transactions_view` AS select `t`.`id` AS `id`,`t`.`id_product` AS `id_product`,`p`.`name` AS `name`,`t`.`quantity` AS `quantity`,`t`.`type` AS `type`,if((`t`.`type` = 'purchase'),(`p`.`purchase_price` * -(1)),`p`.`sale_price`) AS `price`,round((`t`.`quantity` * if((`t`.`type` = 'purchase'),(`p`.`purchase_price` * -(1)),`p`.`sale_price`)),2) AS `amount`,`t`.`date` AS `date` from (`transactions` `t` join `products` `p` on((`t`.`id_product` = `p`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-25 16:42:58
