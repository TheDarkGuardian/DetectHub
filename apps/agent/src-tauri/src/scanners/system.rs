use super::ScannerResult;
use serde_json::json;

pub fn scan_system_info() -> ScannerResult {
    ScannerResult {
        category: "System Information".to_string(),
        status: "Clean".to_string(),
        items_scanned: 14,
        anomalies_found: 0,
        raw_json: json!({
            "computerName": "DESKTOP-VORTEX99",
            "osVersion": "Windows 11 Pro 23H2",
            "build": "22631.3880",
            "tpmEnabled": true,
            "secureBoot": true,
            "biosVendor": "ASUSTeK COMPUTER INC."
        }),
    }
}
