use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ScanProgress {
    pub step: String,
    pub progress_pct: u32,
    pub log_line: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ScannerResult {
    pub category: String,
    pub status: String,
    pub items_scanned: usize,
    pub anomalies_found: usize,
    pub raw_json: serde_json::Value,
}

pub mod system;
pub mod process;
pub mod driver;
pub mod registry;
pub mod usb;
pub mod eventlog;
pub mod network;
pub mod defender;
