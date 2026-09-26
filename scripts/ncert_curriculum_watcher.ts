// =============================================================================
// Brainoro OS — Persistent NCERT Curriculum Watcher Service (Section 27)
// Continuous/Scheduled Background Service for Authoritative NCERT Audit & Sync
// Can run as a standalone server-side daemon or via cron/CI/CD.
// DOES NOT RELY ON AN OPEN BROWSER.
// =============================================================================

import fs from 'fs';
import path from 'path';
import { runServerWatcherSweep, WatcherSweepReport } from '../frontend/src/lib/services/cbseWatcherService';

const AUDIT_LOG_PATH = path.resolve(__dirname, '../logs/ncert_watcher_audit.jsonl');

function ensureLogDir() {
  const dir = path.dirname(AUDIT_LOG_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function appendAuditLog(report: WatcherSweepReport) {
  ensureLogDir();
  fs.appendFileSync(AUDIT_LOG_PATH, JSON.stringify(report) + '\n', 'utf-8');
}

async function runOnce(dryRun: boolean = false) {
  console.log('=============================================================================');
  console.log('BRAINORO OS — PERSISTENT NCERT CURRICULUM WATCHER (SERVER-SIDE)');
  console.log('Execution Mode: SINGLE SWEEP (dryRun=' + dryRun + ')');
  console.log('Timestamp: ' + new Date().toISOString());
  console.log('=============================================================================\n');

  const report = await runServerWatcherSweep({ dryRun });
  appendAuditLog(report);

  console.log('Sweep Summary:');
  console.log(' - Total Textbooks Checked: ' + report.total_textbooks_checked);
  console.log(' - In Exact Sync (Unchanged): ' + report.unchanged_count);
  console.log(' - Mismatches Detected: ' + report.mismatch_count);
  console.log(' - Automatically Reconciled: ' + report.updated_count);
  console.log(' - Statutory Recalls Processed: ' + report.recalled_count);
  console.log(' - Persistent Log Appended: ' + AUDIT_LOG_PATH);
  console.log('\n=============================================================================');
  console.log('SWEEP COMPLETED SUCCESSFULLY (ZERO CLIENT BROWSER DEPENDENCY)');
  console.log('=============================================================================\n');
  return report;
}

async function runDaemon(intervalMinutes: number = 60, dryRun: boolean = false) {
  console.log('[NCERT Watcher Daemon] Starting server-side polling every ' + intervalMinutes + ' minutes...');
  await runOnce(dryRun);
  setInterval(async () => {
    try {
      await runOnce(dryRun);
    } catch (err) {
      console.error('[NCERT Watcher Daemon Error]:', err);
    }
  }, intervalMinutes * 60 * 1000);
}

const args = process.argv.slice(2);
const isDaemon = args.includes('--daemon');
const isDryRun = args.includes('--dry-run');
const intervalArg = args.find(a => a.startsWith('--interval='));
const interval = intervalArg ? parseInt(intervalArg.split('=')[1], 10) : 60;

if (isDaemon) {
  runDaemon(interval, isDryRun).catch(console.error);
} else {
  runOnce(isDryRun).catch(err => {
    console.error('Watcher fatal error:', err);
    process.exit(1);
  });
}
