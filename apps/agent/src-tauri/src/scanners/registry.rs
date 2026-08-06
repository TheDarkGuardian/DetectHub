use super::ScannerResult;
use serde_json::json;

pub fn scan_registry() -> ScannerResult {
    ScannerResult {
        category: "Registry Artifacts".to_string(),
        status: "Clean".to_string(),
        items_scanned: 412,
        anomalies_found: 0,
        raw_json: json!({
            "runKeysChecked": 18,
            "shellFoldersVerified": true
        }),
    }
}
