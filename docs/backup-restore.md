# MP-GEA Backup & Disaster Recovery Runbook

## 1. Database Backup Strategy
- **Daily Automated MySQL Dump**:
  ```bash
  mysqldump -u mpgea_user -p'SecurePassword' mpgea_db | gzip > /backups/db/mpgea_db_$(date +%Y%m%d_%H%M%S).sql.gz
  ```
- Retain daily backups for 30 days, weekly backups for 12 weeks, monthly backups for 12 months.

## 2. File Storage Backup
- Backup the private uploads folder (`./storage/private`) via rsync or tar:
  ```bash
  tar -czf /backups/files/mpgea_files_$(date +%Y%m%d).tar.gz ./storage/private
  ```

## 3. Restoration Procedure
1. **Restore Database**:
   ```bash
   gunzip < /backups/db/mpgea_db_YYYYMMDD_HHMMSS.sql.gz | mysql -u mpgea_user -p'SecurePassword' mpgea_db
   ```
2. **Restore Files**:
   ```bash
   tar -xzf /backups/files/mpgea_files_YYYYMMDD.tar.gz -C ./storage/private
   ```
3. **Verify Integrity**: Run application health check and member verification test.
