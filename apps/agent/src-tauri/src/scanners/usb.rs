use super::ScannerResult;
use serde_json::json;

pub fn scan_usb_history() -> ScannerResult {
    ScannerResult {
        category: "USB History".to_string(),
        status: "Clean".to_string(),
        items_scanned: 14,
        anomalies_found: 0,
        raw_json: json!([
            {
                "friendlyName": "SanDisk Ultra USB 3.0",
                "vendorId": "0781",
                "productId": "5581",
                "lastConnected": "2026-08-06 16:20:05"
            }
        ]),
    }
}
