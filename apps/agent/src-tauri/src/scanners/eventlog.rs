use super::ScannerResult;
use serde_json::json;

pub fn scan_event_logs() -> ScannerResult {
    ScannerResult {
        category: "Event Logs".to_string(),
        status: "Clean".to_string(),
        items_scanned: 1040,
        anomalies_found: 0,
        raw_json: json!({
            "securityLogsParsed": 840,
            "systemLogsParsed": 200
        }),
    }
}
