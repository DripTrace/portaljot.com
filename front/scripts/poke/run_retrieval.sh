#!/bin/bash

# Set the API_KEY environment variable (replace YOUR_API_KEY_HERE with your actual key)
export PRINTFUL_API_KEY="wtWkCCbnTAF1fSt0o1FkdUm8azvRxvN0kq9Mt953"

# # Step 1: Install Rust if not already installed
# if ! command -v cargo &> /dev/null
# then
#     echo "Rust not found. Installing Rust..."
#     curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
#     source "$HOME/.cargo/env"
# else
#     echo "Rust is already installed."
# fi

# # Step 2: Create a new Rust project if it doesn't already exist
# PROJECT_DIR="printful_project"
# if [ ! -d "$PROJECT_DIR" ]; then
#     echo "Creating new Rust project in $PROJECT_DIR..."
#     cargo new "$PROJECT_DIR"
# fi

# # Step 3: Navigate to the project directory
# cd "$PROJECT_DIR"

# Step 4: Add dependencies to Cargo.toml
echo "Adding dependencies to Cargo.toml..."
cat <<EOT >> Cargo.toml
[dependencies]
reqwest = { version = "0.11", features = ["json"] }
tokio = { version = "1", features = ["full"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
EOT

# Step 5: Write the Rust script to scripts/organize_printful.rs with environment variable support
echo "Writing Rust script to scripts/organize_printful.rs..."
cat <<'EOF' > scripts/organize_printful.rs
use reqwest::header::{AUTHORIZATION, CONTENT_TYPE};
use serde_json::{Value};
use std::fs::{self, File};
use std::io::Write;
use std::env;
use tokio;

const BASE_URL: &str = "https://api.printful.com/v2/catalog";

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Retrieve the API key from the environment variable
    let api_key = env::var("PRINTFUL_API_KEY").expect("API key not set in PRINTFUL_API_KEY");
    let categories_dir = "public/printful/categories";

    for entry in fs::read_dir(categories_dir)? {
        let entry = entry?;
        let path = entry.path();

        if path.is_file() && path.extension().unwrap_or_default() == "json" {
            let file_content = fs::read_to_string(&path)?;
            let category_data: Value = serde_json::from_str(&file_content)?;

            let category_name = path.file_stem().unwrap().to_str().unwrap();
            let category_dir = format!("{}/{}", categories_dir, category_name);
            fs::create_dir_all(&category_dir)?;

            if let Some(products) = category_data["data"].as_array() {
                for product in products {
                    let product_id = product["id"].as_i64().unwrap();
                    let product_title = product["title"].as_str().unwrap().replace(" ", "_");

                    if let Err(e) = fetch_and_save_variants(&category_dir, product_id, &product_title, &api_key).await {
                        eprintln!("Error fetching variants for product {}: {}", product_id, e);
                    }
                }
            }
        }
    }

    Ok(())
}

async fn fetch_and_save_variants(category_dir: &str, product_id: i64, product_title: &str, api_key: &str) -> Result<(), Box<dyn std::error::Error>> {
    let client = reqwest::Client::new();
    let url = format!("{}/products/{}/variants", BASE_URL, product_id);
    let response = client
        .get(&url)
        .header(AUTHORIZATION, format!("Bearer {}", api_key))
        .header(CONTENT_TYPE, "application/json")
        .send()
        .await?;

    if response.status().is_success() {
        let variants_data: Value = response.json().await?;
        let file_path = format!("{}/{}_variants.json", category_dir, product_title);
        let mut file = File::create(&file_path)?;
        let pretty_data = serde_json::to_string_pretty(&variants_data)?;
        file.write_all(pretty_data.as_bytes())?;

        println!("Saved variants for product {} in {}", product_title, file_path);
    } else {
        eprintln!("Failed to fetch variants for product {}. Status: {}", product_id, response.status());
    }

    Ok(())
}
EOF

# Step 6: Compile and run the Rust script with the environment variable set
echo "Compiling and running the Rust project..."
cargo run scripts/organize_printful.rs
