-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 03, 2025 at 04:31 AM
-- Server version: 8.3.0
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `influencer_campaign`
--

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
CREATE TABLE IF NOT EXISTS `brands` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id`, `name`, `email`, `created_at`, `updated_at`) VALUES
(1, 'Exhibit Technologies', 'info@exhibit.com', NULL, NULL),
(2, 'Glow Cosmetics', 'contact@glow.com', NULL, NULL),
(3, 'TechNova', 'hello@technova.com', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
CREATE TABLE IF NOT EXISTS `cache` (
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `campaigns`
--

DROP TABLE IF EXISTS `campaigns`;
CREATE TABLE IF NOT EXISTS `campaigns` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `budget` decimal(12,2) NOT NULL DEFAULT '0.00',
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `status` enum('active','completed','upcoming') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `brand_id` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `campaigns_brand_id_foreign` (`brand_id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `campaigns`
--

INSERT INTO `campaigns` (`id`, `name`, `budget`, `start_date`, `end_date`, `status`, `brand_id`, `created_at`, `updated_at`) VALUES
(1, 'Diwali Promo', 50000.00, '2025-11-01', '2025-11-20', 'active', 1, '2025-11-02 22:56:28', '2025-11-02 22:56:28'),
(2, 'Winter Sale', 80000.00, '2025-12-01', '2025-12-25', 'active', 1, '2025-11-02 22:56:28', '2025-11-02 22:56:28'),
(3, 'New Year Bash', 95000.00, '2025-12-26', '2026-01-05', 'upcoming', 1, '2025-11-02 22:56:28', '2025-11-02 22:56:28'),
(4, 'Valentine Specials', 70000.00, '2026-02-01', '2026-02-15', 'upcoming', 1, '2025-11-02 22:56:28', '2025-11-02 22:56:28'),
(5, 'Holi Celebration', 60000.00, '2026-03-01', '2026-03-20', 'active', 1, '2025-11-02 22:56:28', '2025-11-02 22:56:28'),
(6, 'Summer Sale', 85000.00, '2026-04-01', '2026-04-30', 'upcoming', 1, '2025-11-02 22:56:28', '2025-11-02 22:56:28'),
(7, 'Tech Launch 2026', 120000.00, '2026-05-10', '2026-05-25', 'upcoming', 1, '2025-11-02 22:56:28', '2025-11-02 22:56:28'),
(8, 'Monsoon Madness', 55000.00, '2026-06-15', '2026-07-05', 'upcoming', 1, '2025-11-02 22:56:28', '2025-11-02 22:56:28'),
(9, 'Raksha Bandhan Offers', 65000.00, '2026-08-01', '2026-08-15', 'upcoming', 1, '2025-11-02 22:56:28', '2025-11-02 22:56:28'),
(10, 'Festive Bonanza', 100000.00, '2026-09-20', '2026-10-10', 'upcoming', 1, '2025-11-02 22:56:28', '2025-11-02 22:56:28'),
(11, 'Holika Special', 80000.00, '2025-12-12', '2026-02-02', 'active', NULL, '2025-11-02 22:58:27', '2025-11-02 22:58:27');

-- --------------------------------------------------------

--
-- Table structure for table `campaign_influencer`
--

DROP TABLE IF EXISTS `campaign_influencer`;
CREATE TABLE IF NOT EXISTS `campaign_influencer` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `campaign_id` bigint UNSIGNED NOT NULL,
  `influencer_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `campaign_influencer_campaign_id_influencer_id_unique` (`campaign_id`,`influencer_id`),
  KEY `campaign_influencer_influencer_id_foreign` (`influencer_id`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `campaign_influencer`
--

INSERT INTO `campaign_influencer` (`id`, `campaign_id`, `influencer_id`, `created_at`, `updated_at`) VALUES
(1, 1, 5, '2025-11-02 22:56:28', '2025-11-02 22:56:28'),
(2, 1, 4, '2025-11-02 22:56:28', '2025-11-02 22:56:28'),
(3, 1, 1, '2025-11-02 22:56:28', '2025-11-02 22:56:28'),
(4, 2, 5, '2025-11-02 22:56:28', '2025-11-02 22:56:28'),
(5, 2, 1, '2025-11-02 22:56:28', '2025-11-02 22:56:28'),
(6, 2, 3, '2025-11-02 22:56:28', '2025-11-02 22:56:28'),
(7, 3, 5, '2025-11-02 22:56:28', '2025-11-02 22:56:28'),
(8, 3, 4, '2025-11-02 22:56:28', '2025-11-02 22:56:28'),
(9, 3, 6, '2025-11-02 22:56:28', '2025-11-02 22:56:28'),
(10, 4, 5, '2025-11-02 22:56:28', '2025-11-02 22:56:28'),
(11, 4, 1, '2025-11-02 22:56:28', '2025-11-02 22:56:28'),
(12, 5, 6, '2025-11-02 22:56:28', '2025-11-02 22:56:28'),
(13, 5, 2, '2025-11-02 22:56:28', '2025-11-02 22:56:28'),
(14, 6, 2, '2025-11-02 22:56:28', '2025-11-02 22:56:28'),
(15, 6, 5, '2025-11-02 22:56:28', '2025-11-02 22:56:28'),
(16, 7, 5, '2025-11-02 22:56:28', '2025-11-02 22:56:28'),
(17, 7, 3, '2025-11-02 22:56:28', '2025-11-02 22:56:28'),
(18, 7, 2, '2025-11-02 22:56:28', '2025-11-02 22:56:28'),
(19, 8, 1, '2025-11-02 22:56:28', '2025-11-02 22:56:28'),
(20, 8, 5, '2025-11-02 22:56:28', '2025-11-02 22:56:28'),
(21, 8, 6, '2025-11-02 22:56:28', '2025-11-02 22:56:28'),
(22, 9, 3, '2025-11-02 22:56:28', '2025-11-02 22:56:28'),
(23, 9, 1, '2025-11-02 22:56:28', '2025-11-02 22:56:28'),
(24, 10, 2, '2025-11-02 22:56:28', '2025-11-02 22:56:28'),
(25, 10, 4, '2025-11-02 22:56:28', '2025-11-02 22:56:28'),
(26, 4, 6, '2025-11-02 22:57:38', '2025-11-02 22:57:38');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `influencers`
--

DROP TABLE IF EXISTS `influencers`;
CREATE TABLE IF NOT EXISTS `influencers` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `followers` bigint UNSIGNED NOT NULL DEFAULT '0',
  `platform` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `influencers`
--

INSERT INTO `influencers` (`id`, `name`, `category`, `followers`, `platform`, `created_at`, `updated_at`) VALUES
(1, 'Sneha', 'fashion', 12000, 'Instagram', NULL, NULL),
(2, 'Aman', 'tech', 50000, 'YouTube', NULL, NULL),
(3, 'Priya', 'fitness', 30000, 'Instagram', NULL, NULL),
(4, 'Rohit', 'travel', 25000, 'Instagram', NULL, NULL),
(5, 'Ananya', 'beauty', 40000, 'TikTok', NULL, NULL),
(6, 'Vikram', 'tech', 60000, 'YouTube', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `queue` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `queue`, `payload`, `attempts`, `reserved_at`, `available_at`, `created_at`) VALUES
(1, 'default', '{\"uuid\":\"4725d77b-b3a4-4e15-ba09-36419d382b87\",\"displayName\":\"App\\\\Jobs\\\\SendAssignedEmailJob\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\SendAssignedEmailJob\",\"command\":\"O:29:\\\"App\\\\Jobs\\\\SendAssignedEmailJob\\\":2:{s:10:\\\"influencer\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:21:\\\"App\\\\Models\\\\Influencer\\\";s:2:\\\"id\\\";i:6;s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:8:\\\"campaign\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:19:\\\"App\\\\Models\\\\Campaign\\\";s:2:\\\"id\\\";i:4;s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}}\"},\"createdAt\":1762144058,\"delay\":null}', 0, NULL, 1762144058, 1762144058);

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
CREATE TABLE IF NOT EXISTS `job_batches` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_11_02_092910_create_brands_table', 1),
(5, '2025_11_02_093021_create_influencers_table', 1),
(6, '2025_11_02_093032_create_campaigns_table', 1),
(7, '2025_11_02_093113_create_campaign_influencer_table', 1),
(8, '2025_11_02_115059_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
