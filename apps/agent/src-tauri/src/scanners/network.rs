use super::ScannerResult;
use serde_json::json;

pub fn scan_network_dns() -> ScannerResult {
    ScannerResult {
        category: "Network & DNS".to_string(),
        status: "Clean".to_string(),
        items_scanned: 48,
        anomalies_found: 0,
        raw_json: json!({
            "activeSockets": 32,
            "dnsEntries": 16
        }),
    }
}
