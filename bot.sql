-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mer. 09 juin 2021 à 23:36
-- Version du serveur : 10.3.27-MariaDB-0+deb10u1
-- Version de PHP : 7.3.27-1~deb10u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `bot`
--

-- --------------------------------------------------------

--
-- Structure de la table `moderation`
--

CREATE TABLE `moderation` (
  `CASE` int(255) NOT NULL COMMENT 'Numéro de Sanction',
  `TYPE` text NOT NULL COMMENT 'Type de Sanction',
  `USER` text NOT NULL COMMENT 'Nom D''utilisateur ',
  `USER ID` varchar(20) NOT NULL COMMENT 'ID de l''utilisateur',
  `MOD` text NOT NULL COMMENT 'Nom d''utilisateur du modérateur',
  `MOD ID` varchar(20) NOT NULL COMMENT 'ID du Modérateur',
  `REASON` text NOT NULL DEFAULT 'Aucune Raison' COMMENT 'Raison'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `money`
--

CREATE TABLE `money` (
  `ID` varchar(20) NOT NULL COMMENT 'Identifiant de l''utilisateur',
  `USER` text NOT NULL COMMENT 'Nom d''tilisateur',
  `MONEY` int(255) NOT NULL COMMENT 'Money',
  `BANK` int(255) NOT NULL COMMENT 'Money en Bank'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `warn`
--

CREATE TABLE `warn` (
  `CASE` int(255) NOT NULL COMMENT 'Numéro du warn',
  `USER` text NOT NULL COMMENT 'Nom D''utilisateur ',
  `USER ID` varchar(20) NOT NULL COMMENT 'ID de l''utilisateur',
  `MOD` text NOT NULL COMMENT 'Nom d''utilisateur du modérateur',
  `MOD ID` varchar(20) NOT NULL COMMENT 'ID du Modérateur',
  `REASON` text NOT NULL DEFAULT '\'Aucune Raison\'' COMMENT 'Raison'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `xp`
--

CREATE TABLE `xp` (
  `ID` varchar(20) NOT NULL COMMENT 'Identifiant de l''utilisateur',
  `USER` text NOT NULL COMMENT 'Nom d''tilisateur',
  `XP` int(255) NOT NULL COMMENT 'Nombre XP''s',
  `LEVEL` int(255) NOT NULL COMMENT 'Nombre de levels'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `xp`
--

INSERT INTO `xp` (`ID`, `USER`, `XP`, `LEVEL`) VALUES
('852155596270206976', 'CL#9878', 10, 1),
('665241810863390720', 'Xavaldar#1081', 70, 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `moderation`
--
ALTER TABLE `moderation`
  ADD PRIMARY KEY (`CASE`);

--
-- Index pour la table `warn`
--
ALTER TABLE `warn`
  ADD PRIMARY KEY (`CASE`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `moderation`
--
ALTER TABLE `moderation`
  MODIFY `CASE` int(255) NOT NULL AUTO_INCREMENT COMMENT 'Numéro de Sanction';

--
-- AUTO_INCREMENT pour la table `warn`
--
ALTER TABLE `warn`
  MODIFY `CASE` int(255) NOT NULL AUTO_INCREMENT COMMENT 'Numéro du warn';
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
