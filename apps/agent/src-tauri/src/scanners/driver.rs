use super::ScannerResult;
use serde_json::json;

pub fn scan_drivers() -> ScannerResult {
    ScannerResult {
        category: "Drivers".to_string(),
        status: "Flagged".to_string(),
        items_scanned: 92,
        anomalies_found: 1,
        raw_json: json!([
            {
                "name": "memrw64.sys",
                "path": "C:\\Windows\\System32\\drivers\\memrw64.sys",
                "isSigned": false,
                "publisher": "Unverified Third-Party"
            }
        ]),
    }
}
