/*
 Navicat Premium Data Transfer

 Source Server         : postgresql-docker
 Source Server Type    : PostgreSQL
 Source Server Version : 100006
 Source Host           : 192.168.1.109:5432
 Source Catalog        : managementportal
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 100006
 File Encoding         : 65001

 Date: 24/08/2024 09:50:58
*/


-- ----------------------------
-- Table structure for medical_tests
-- ----------------------------
DROP TABLE IF EXISTS "public"."medical_tests";
CREATE TABLE "public"."medical_tests" (
  "test_id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "time_of_test" timestamptz(6) NOT NULL,
  "notes" text COLLATE "pg_catalog"."default",
  "ecg" text COLLATE "pg_catalog"."default" NOT NULL,
  "subject_id" int4 NOT NULL
)
;
ALTER TABLE "public"."medical_tests" OWNER TO "postgresdb-user";

-- ----------------------------
-- Records of medical_tests
-- ----------------------------
BEGIN;
INSERT INTO "public"."medical_tests" ("test_id", "time_of_test", "notes", "ecg", "subject_id") OVERRIDING SYSTEM VALUE VALUES (67, '2024-08-18 14:06:48.053+00', '111', '1723990008066.csv', 1302);
INSERT INTO "public"."medical_tests" ("test_id", "time_of_test", "notes", "ecg", "subject_id") OVERRIDING SYSTEM VALUE VALUES (68, '2024-08-23 02:48:23.087+00', 'ssadasd', '1724381303107.csv', 1302);
INSERT INTO "public"."medical_tests" ("test_id", "time_of_test", "notes", "ecg", "subject_id") OVERRIDING SYSTEM VALUE VALUES (69, '2024-08-23 03:11:50.337+00', 'updated data', '1724382710351.csv', 1901);
COMMIT;

-- ----------------------------
-- Auto increment value for medical_tests
-- ----------------------------
SELECT setval('"public"."medical_tests_test_id_seq"', 69, true);

-- ----------------------------
-- Primary Key structure for table medical_tests
-- ----------------------------
ALTER TABLE "public"."medical_tests" ADD CONSTRAINT "medical_tests_pkey" PRIMARY KEY ("test_id");
