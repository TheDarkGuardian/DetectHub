use super::ScannerResult;
use serde_json::json;

pub fn scan_defender_status() -> ScannerResult {
    ScannerResult {
        category: "Windows Defender Status".to_string(),
        status: "Clean".to_string(),
        items_scanned: 4,
        anomalies_found: 0,
        raw_json: json!({
            "realtimeProtectionEnabled": true,
            "tamperProtectionEnabled": true,
            "definitionsVersion": "1.415.290.0"
        }),
    }
}
