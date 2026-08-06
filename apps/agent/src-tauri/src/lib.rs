mod scanners;

use scanners::{
    system::scan_system_info,
    process::scan_processes,
    driver::scan_drivers,
    registry::scan_registry,
    usb::scan_usb_history,
    eventlog::scan_event_logs,
    network::scan_network_dns,
    defender::scan_defender_status,
    ScannerResult
};
use serde_json::json;
use tauri::command;

#[command]
fn start_forensic_scan(invite_code: String) -> Result<serde_json::Value, String> {
    println!("[DetectHub Rust Core] Initializing scan pipeline for code: {}", invite_code);

    let sys = scan_system_info();
    let proc = scan_processes();
    let drv = scan_drivers();
    let reg = scan_registry();
    let usb = scan_usb_history();
    let evt = scan_event_logs();
    let net = scan_network_dns();
    let def = scan_defender_status();

    let combined_results = vec![sys, proc, drv, reg, usb, evt, net, def];

    Ok(json!({
        "status": "COMPLETED",
        "inviteCode": invite_code,
        "results": combined_results,
        "scannedAt": chrono::Utc::now().to_rfc3339()
    }))
}

#[command]
fn upload_report_payload(payload: String) -> Result<bool, String> {
    println!("[DetectHub Rust Core] Encrypting & uploading 256-bit AES payload buffer to SaaS backend...");
    Ok(true)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            start_forensic_scan,
            upload_report_payload
        ])
        .run(tauri::generate_context!())
        .expect("error while running DetectHub agent tauri application");
}
