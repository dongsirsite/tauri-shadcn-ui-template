// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .setup(|app| {
            // 启动 Python FastAPI 服务
            let shell = app.shell();
            
            tauri::async_runtime::spawn(async move {
                let _output = shell
                    .sidecar("fastapi-server")
                    .expect("failed to create sidecar command")
                    .args(["8000"])
                    .spawn()
                    .expect("failed to spawn sidecar");
            });
            
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
