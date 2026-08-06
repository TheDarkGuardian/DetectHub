use super::ScannerResult;
use serde_json::json;

pub fn scan_processes() -> ScannerResult {
    ScannerResult {
        category: "Processes".to_string(),
        status: "Review".to_string(),
        items_scanned: 184,
        anomalies_found: 1,
        raw_json: json!([
            {
                "pid": 8412,
                "name": "cheatengine-x86_64.exe",
                "path": "C:\\Users\\VortexAdmin\\AppData\\Local\\Temp\\ce_v75\\cheatengine-x86_64.exe",
                "isSigned": false,
                "sha256": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
            }
        ]),
    }
}
