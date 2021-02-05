-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: project_data
-- ------------------------------------------------------
-- Server version	8.0.20

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
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('aj_eeaQ13TegmgGKbP0TLd3is5mktf2D',1612269605,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":2014734024}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_data`
--

DROP TABLE IF EXISTS `user_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_data` (
  `id` int NOT NULL,
  `password` longtext,
  `user_salt` longtext,
  `name` varchar(45) DEFAULT NULL,
  `nickname` varchar(45) DEFAULT NULL,
  `department` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_data`
--

LOCK TABLES `user_data` WRITE;
/*!40000 ALTER TABLE `user_data` DISABLE KEYS */;
INSERT INTO `user_data` VALUES (1,'ilGSTx0g3Ri9OSrNpSWG9vTHoLTkiegg5dTwiQ2sVW7vk3sfENetKhx7dSpQbNLcvUwqdpaGyHM4Kv+W6C2ylbtnS6jspUzJrZ+fn+GU6J33BK1YrHyzW5WhGxBRB2I0BQhJ53QL8ymfLxlyaZ4K9SH6NvuSK8hgEQENFQuviSI=','hh9KZgcDvBeZPDe+v2J6ZxJiKIxROJnjFwut1zsBDDZCwIAt0cSpRyhAF7YNcDoBA46ik8Lf07O2XyfCkUflVA==','Roh','Roh','1'),(2013742022,'so0bpeq6XhMqwq18WDOV/8UhNs+m9TDOS76PJgnWJr5D6Ca/owOVnnGwRF0RQCO2sT6wdnlylztdDgOFMe+YmonNgspFz5SpfgapfXamnorvs495wVeTKU2kJcS0UQmjqzrAlTHhMclRd/78ugj/+c7Va1mzagQE+5lDiINGUBg=','nMPOzvESdhkvktpaWD4oCVGiuc0pL7NP8behWvnv74RUOl+uAVPJ9HlwUfNuK63Ea91ht6QQKOJTibP8CYlwNg==','ji-su','22','Electronic Convergence Engineering'),(2014734024,'kTK6twurfc0NkRGHwXUsgj6CKXXlxWWWVCOTWoZFxyCcwCY4eDzys+uuTLOhFn/ZQ8ntbGbQQcnYbNZdMuFzM6grIK6qKyo11m11+yXHGbmvUd5N7CJ8McvdUun2VOut2Z0ob4dPRTQQO2O1k2Cm9YYvgZ4qFbmWnkFoZL3fXGM=','EHWMyX1tZ/vLZ+SWwBjVRPv77vaikFDsLbrq3pLt0QdGQ40hui69GNnC+nK8jipHQ2CkIIExoB+xpmVuHyPrvA==','su-young','24','Electronic Materials Engineering'),(2014734045,'Htrxbj6Gj5qAm072Ple9rBQEPeXXViKNGKp6l3N3LHppIDQaKA0bN3qH3fZX1CwTgLp/MKyQovJn2ucijoDrDLgSQXC0ggZM2U6BD5FlpVHJiMcgO6liGG8ZuNEbQye3UvQeUVNfOaepg/gqUfFVMAxLNvCwxxxQ1dWVck/AyhY=','e9TX6n64Gt2dlnHoRQ5t4ozFkJpwrsh3yPENanaZ8kBd6HOYdhFrD6nnc0uEf7B2MMaA4iSKYf/l9Z+u8dzbUA==',NULL,NULL,NULL),(2015508023,'R753OR3DaqYnQh51ZItRhseoNeKLilsKsm7VwtNUgUpGrcPBoJZGA4Gx3SnSA0sOIJGdqLSUTbbi7ss9KKJ3O/tu5X/d81GKmEbF8oBwoYC7/MGQsG0yMmxGzeV0YLuh4g/DBsQrZekJQXU3L/oOE6uAEXcU4b3r+SYwmbkA+Lw=','aE03K32XfEt+8tXKOvkCni0Yk7TEE/hCbQS1iuTZIV5ITc0+KEzlZfQLs6Z2CeArAdWDpESnF7C+gmWI/6eQBg==','a-rin','23','Business Administration'),(2015508040,'BI8d7SC0MfZUkz7Yw7JnAmBR737NAnrmfQSLmbXTjyr/t3DIE8Jp5vdivUMgPrPUy9vh5L4F5/EmXGsFxPLGIwUpZL4CbBWUm1KP7jsxHSBLJxB33xbVowHRgBKGfABFIclIriXSuVDJKDfqyTDJlT7+zRj1iPg09J87RdRWmz8=','RtGfdgyeE0INr/Aal04xVAPr+Q3crawDYjJGNWPPWPz5u8LzniywvOilDSSZBRTYmUBX5ve97044d8j9hQZIvQ==',NULL,NULL,NULL),(2015722017,'9SCtxp31jTNbviTCOdGVGNtugsIS1TbGopT1JgxlcKu1cvCCvFdQb6YPN3kTeTEJ9oUJGNWT7mhi5hjwvot0O8S+FOPT735V17Ztv1ZcAAchzbCdbnYYVEPu/s19KaieWlj9/0JiD6jAqi8E1p5kB0J31NTq+Ak2Xa0v74KcBf0=','co5Q/gyhyz3KSgqVNUPVK5LfvclxtgxGgUqTOCwVxJBl+/4FH4gtT326yj0u+V01O3Im+kUV102Tc0Zyedqddg==','je-suk','17','Computer Engineering'),(2015741021,'+24OXtGZlvHc1HpmS782b72Q3Bn9Ubl71c3vCagbZjlnV3s9LGUCFIhSE4UdbKmoF24hoq5rdCK7yXOVtwBE6wuEDgkFT1MkvSx4Y3XlKcEwmtRCX8suE04Hamrm9ieIV0Q/PnkLamJlKMBFWa9vrKo6D2jOAkyJiDI442PAPRk=','IaHhPfdGxiwz059rAvRtVOqXNbNpgsAUkypTqsYhDQnwhK88XFLcVBG0x28yBLZPLBkfeZEB5mV8e/QyNNCA+g==','dae-hyun','21','Robotics'),(2016123456,'a4pi8u0lyELu2bJbVuFVWRes4fRSK8z2Oe+YV6stB26vqOltkpZLelRyjH5FRqxL2ew06WmPHoFksPE5LlMM3WPX72MhMyJhBwUpAVHVg5CZPUCzEanItFVf2MMoKXGZ4yCC1ZmUK78FIcpZ3Jl4ht1fvjKV74EgMrdlnmpYiJw=','evjtcUMdgUblGBuQDu7q0qe/xVClFnz+qWxgI+sASCE9pvYtRhMSgTSMLMAsp1Nj0gvRF1LQ9f4MMkZPgDOdgw==','Joo','Joo','1'),(2017127012,'rCrnUngb0s4PReckQsrEGzOME8gCTFcDRRXSTkBfI7Cy68nWT689CfqgrHLAcHFo2rRc/+9etTyfYiGT3nOTPvk7MNjfSgeHTz4w/2SJ9JHcFLmRpxxUErnDGGwVXbXut8qeoKikpLRuevedobkiB0eiqu2TWiLXcacuHW+l9uE=','1E6DzkOcs3bUqxcnTOZ0SUUgIymwLSGND7zRnhDwGQF5mXWOMWXl7edAlC71G/P5vxgydBYqWsUnE4VIah8frQ==','min-su','12','Architecture'),(2017202018,'ILcfO9XTHVg/FzM2tWytZ7TIiigPLUE3lFM76jY4KRdlc9GBLM3tqDv7wjlWQ3X77jeEYmoFU/YduQxFCywadL0/i5Nno/Zuvv8Vdo/SugN1A5YRPK1WH51rcUPZ5mp6BkvMfxi/l70IMiWjMIZgFdK3IquTs9VolXPA6AXM2qs=','tKL3zqh0r25vzXpkY2Ql4PQHHvz8inaAEpQSVFN90Fb8AF/8ONzs3TarvZiI9NDJdse0Z0gSQIq2MHavFxBnsw==','seung-ho','18','Computer and Information Engineering'),(2017202019,'ZVyHVJekQYTLuDJpeb6Cxa14damUt/7ODF7Ewupee7gFUNDIqpvcQyA6M2ZSNgktIvbc2SQklzRlj/31u2PlDW0GsCcpD324mvoFQ4/v4RyeyyNZiId4V6JKi2LLI2kRoD1PQjy2LA7aYkcWlL4Pd/L3Gjam5dDNepsNDR5yIU0=','D01oLKmFquA1TZWQ5LxVzFhyj49buvNqYvPP9omcwXXba2tyTxN1LS4wjG4oOjHyNByoeEE8MPJ8+y1hTX0kQw==','jun-ho','19','Computer and Information Engineering'),(2017311020,'FMck4zvs9X+hXnr8MFgiaYnZYwln5jw9mjL/z+eJY9WWTyGv3ZvxFfUV6SeNR2RRCM9Kqz6F2g+qU6FdCZ2pmTNDDpSztfni5AG8a9LEsMctkEOEI6yOw/RN5wot/xJFn9mR+oYUanVhX3Gsnt4Jore61l+aUP5lzXkYD+PKWMM=','K86ScOw2yGRa+I1zJiQZvSACAJ9ZaGPT6NsLH4dj9BRb8TtDSTYjlj7v1l9k3m/psBHnqVzXWkWZwrcuZJ9nKg==','min-ji','20','Industrial Psychology'),(2017508013,'a4IZ8kYz1b0lsM+IXRmdm2DLA+4w6jh2/Q6WqOu8qkWduaRjpiyYbN8GAQ8v+ed2NTjPE6rc9x8Zc/FGINDn5ZI8FX1fkyvmsqdsS8Wv9fS4xPQw+ozwHghVV4gOl467hbjRMnq5N1YanBkCzY4K2TO8YtJUcspFIfeSZYLtTYI=','R1/4T3OEUGznv90meBkPKrYuwkmz32vOMKwI0e1zb1X5Lkt1vzCbNPLxMOz9zaINzzbZTxxciPpjtxSsy5pi7A==','ha-hyun','13','Business Administration'),(2017706011,'glppRIsPSpzgu4i1/K2+CFYtDWlM55H3so+uYRimhayrdZr3P852vTDLxs50Gz8z3laF/k6XQc9fjknQ8oz3bKWxh2CA4VKGVvsgnM+QcmEEut84OX/LOR7jJW+tBjPZXYdeKC+VRf903vcYuHYaOdsoKitavQL9go3GRovq+e0=','ZOegk8VotrJIeYJ8yxZAriuDlBhdzh4KyyjWj2hQiT9NldwDGuqpfAu7+NSE9j3OHFifvcUHVCYvnAjJ6cDEaQ==','su-hyun','11','Electronic Engineering'),(2017707014,'Qwh2N6hqP9E6F766lpZRiJx1KRWGhO4MvghC/Yz1iTMxvYgVEB4ZS7D4ABOxrk09DNez6uyU7MUDWoWWC1dCNGDMSlVk9zlrs7Gd4omZiioyPYY8jE1tYiVk0BDkEgna7fizUqexFoSTpsLbFI8LRe2PjwjKD7pB2RQxnYrA99I=','o4H6cGN5LPdNABtdqzn/eDknLRqRiXn45O3WOOmE8nJnsOu6/dK1rG3HPH69bmJr0VtLxaz/6z8nn8v1w1BJlQ==','hong-jae','14','Electronics & Communications Engineering'),(2017732015,'kncBAfaaj9o783sM1dwXTGDhcudKyO13cQEEtJI6vG2T7IfVFQjJTkihTdDY7g16zwQxS7SBJxPPoqcLev6DjEyGCdHpnCwYJVWUUnrtMcrZqHtg+0BXg5DXwX+1jTj5aCIb5OxCvA6U4PN00FRHMmARN8GPFdxZhUgR+3uXRDA=','2Rpw9XasnqXJSqHpate5TqTVy6YGGWOO0kns0ij+/QcXLzXgvpmzZdCw5GrW9JVMmSDywQ4d1f1m6zD6ec1qvQ==','young-suk','15','Electric Engineering'),(2017732016,'PA2i7QCRiUHAzt4Au08HnQDpuY2oUfrImc7WXKxOgESOafrABYxV+tsn0/4ICloU2aMcpt4ass/LlgEslq7tUlSo+hY2aIxSeSh1uMJ6VweiDATDSvUXTGw4mPwjH1/NHHzuHxCmRj44KgW/cbUDgLXo0nxxGYCOfnRD81b0phk=','DoGFYB4wrhtMT6VrEjtS8dL7qdbzXcdIuPcBXpw5qLup9KEw0jiS28twQPUG5n1ATxaBlFuPPzXm6LEe9YMo/Q==','ha-rim','16','Electric Engineering');
/*!40000 ALTER TABLE `user_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_wallet`
--

DROP TABLE IF EXISTS `user_wallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_wallet` (
  `id` int NOT NULL,
  `mnemonic` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `privateKey` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_wallet`
--

LOCK TABLES `user_wallet` WRITE;
/*!40000 ALTER TABLE `user_wallet` DISABLE KEYS */;
INSERT INTO `user_wallet` VALUES (1,'neck ensure envelope door erase else desert valley fiction sign crop flight','0x49370FEFe6d137a212e5aD9170EB4f2326719675','3b7d194804d43d42a1fbba86e0e8357f9e57835f5cab9685346996f58dd1dccf'),(2013742022,'exhaust beyond arctic sunset flash license bag friend glory paddle believe ethics','0x03B7db398f25eBd725D80cef4C70be4cB5fc08ad','501ff5dad6df1e437e786598b91132a5770255a31214433e3edb136f9f6acd46'),(2014734024,'fury casual number draw soul cage warfare bleak repair rude merry dumb','0xb1EF8B050c4D40335F7AA0418b3054bb20c0e475','1dcc4471da2c59f005cfdd96a5b812010eefdeaddd771a481caaee3bc634eaed'),(2015508023,'vanish real main tired include letter evoke decorate kidney shell desert chief','0xDd040C8B4cEBA0B2fc06649799F8093E044dE424','30dd4b18771321de5382f0d60446679b8808c77c9d3f109e5dbdf271f18a7b86'),(2015722017,'forest online film relief glance winter security prefer blush vacuum dismiss family','0xb9a00869d5f565542b3a5868634cA3136B9F6a3E','f7a4bbca1fa94f65773363a27b259238872042f4e9577f13f5b118b1a412e0bb'),(2015741021,'cube shop property gospel chuckle video explain neck crack clip wink walnut','0xf64326D20392C04b1bE66D47bCd9e364C58Fa43F','ed4ec54312e56d89568bca1693d5701e703b0cd37bb780dad4b4c3f0f754a71e'),(2016123456,'that zoo ride glass tip lesson metal milk burden world weapon vault','0xdB66E5274B2C071c9aa7a2CfbD16a8da312f6d43','537ee7c7984b912935c80c13ed98cc0f949addf0261ba8a675bc113788645f1e'),(2017127012,'envelope hurdle settle bless swamp retreat timber invite squirrel balcony arm strategy','0xE1B32B3AcCAd981EC9542f7bb84863D9A325e875','4700d043dc0e1ead44733156334292410eeddff2ec861364c08e013013bffe4d'),(2017202018,'electric middle puzzle million exist hybrid swim cash produce crisp trap sadness','0x791D113B0F7552c758Fd69F48398220689ee9617','0ce05bc6fda7c0b59254aa22f0bae93a1140b55216fb9d51158054a78046d30c'),(2017202019,'yellow display income horn jar element release home holiday mercy palace bulk','0xcF32A124e083ddfbFbEC51A43ec98fa8209D4eD3','e0e8278ef7e95fac2c26571a2d370904856ae26017684a11158e1a98d9024005'),(2017311020,'oppose proof mad love prison area square seek lady clever excite sunny','0x1ECa10D43A8A921c7b4a3DA37ff38EB678F3e86D','80b6d3a12ea3076848fd15c734973b06dd435d40391564bfff73d3d77092e21f'),(2017508013,'nurse soul road park praise minor repair alone rally ghost chapter artefact','0x8A2dEe0D7C070102B16C17D90B450b2b6790fE72','59c094ecfcd6b2df82e5d29b81fe83342314888a4d6796fa455ee7f597356b86'),(2017706011,'object resemble online food ignore apple final slender finger exit bridge awake','0x03A8b48cbDE277FBF1732fcAB4411ce2165Fc974','bd0c2daff442d738a5616206fb3bc0b71eb1bb3f1e54a8e1b6a6dd1a2ac5e5fa'),(2017707014,'gesture swap jungle monitor cement foam keep shiver erase ancient online salon','0xd3453173B111d8f0DA594D70533436caED80FFe2','0bb9f02cf0e5c212b22ac2dca854b764190d42fc82a38e9a2b5382c960559e2b'),(2017732015,'middle load oxygen pioneer size antenna claim lesson reward excuse weather observe','0x7e1CbBCDa5D7B4db0D484794dD55e7ae17354EcD','da91ea9f7d43fe57dabec0f1f01f43466651ce2561442c89fd26571a238860f3'),(2017732016,'deal stadium they mom coconut vocal stable cupboard artefact twenty pledge sponsor','0xD329cF5deB3Caf9aDD5e36Da19e97A318Dca4ad8','ef38af06eb16045c5f14c6f05b3064e6b9602eb37d3a8e21ad5a492ec1156b70');
/*!40000 ALTER TABLE `user_wallet` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-01 21:49:04
