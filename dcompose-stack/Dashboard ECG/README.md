# Guideline for installation
Make sure to pull the latest commit on RADAR-Docker repository because the repository exposes port 5432 Postgresql inside docker-compose to outside world.

Make sure to import `medical_tests.sql` script to database for creating new table. 

## Prerequisite
1. Make sure to start ManagementPortal first before running the scripts
2. Make sure to install NodeJS
 
## Start ECGBackend
1. Go to folder `ECG Backend`
2. Run command `npm install`
3. Copy `.env.template` to `.env`
4. Modify params inside `.env` to match with Postgresql
5. Create folder `storage` in the same level with ECG Backend

## Start ECGFrontend
1. Go to folder `ECG Frontend`
2. Run command `npm install`
3. Copy `.env.template` to `.env`
4. Modify params inside `.env` to match with Vmware host API by running `ifconfig`, the other params leave unchanged