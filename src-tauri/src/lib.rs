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
                // 开发模式直接运行 Python 脚本
                #[cfg(debug_assertions)]
                let command = shell.command("python").args(["main.py", "8000"]);

                // 生产模式使用打包后的可执行文件
                #[cfg(not(debug_assertions))]
                let command = shell.sidecar("fastapi-server").unwrap().args(["8000"]);

                let _child = command.spawn().expect("failed to spawn server");
            });

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
