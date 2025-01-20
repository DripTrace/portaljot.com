# #!/bin/bash

# # Set the API key (replace YOUR_API_KEY_HERE with your actual key)
# API_KEY="wtWkCCbnTAF1fSt0o1FkdUm8azvRxvN0kq9Mt953"

# # Define the base directory for categories
# CATEGORIES_DIR="public/printful/categories"

# # Loop through each category JSON file in the categories directory
# for category_file in "$CATEGORIES_DIR"/*.json; do
#     # Extract the category name from the file name
#     category_name=$(basename "$category_file" .json)
#     category_dir="${CATEGORIES_DIR}/${category_name}"

#     # Create a directory for the category if it doesn't exist
#     mkdir -p "$category_dir"

#     # Read the category JSON file and extract each product's ID and title
#     jq -c '.data[]' "$category_file" | while read -r product; do
#         product_id=$(echo "$product" | jq -r '.id')
#         product_title=$(echo "$product" | jq -r '.title' | sed 's/ /_/g')

#         # Create a subdirectory for each product inside the category directory
#         product_dir="${category_dir}/${product_title}"
#         mkdir -p "$product_dir"

#         # Define the correct URL to fetch the product's catalog variants
#         url="https://api.printful.com/v2/catalog-products/${product_id}/catalog-variants"

#         # Fetch the variants data with curl
#         echo "Fetching variants for product: ${product_title} (ID: ${product_id})"
#         response=$(curl -s -X GET "$url" \
#             -H "Authorization: Bearer $API_KEY" \
#             -H "Content-Type: application/json")

#         # Check for a valid response by looking for "data" in the JSON
#         if echo "$response" | jq -e '.data' > /dev/null 2>&1; then
#             # Loop through each variant in the response and save each as a separate JSON file
#             echo "$response" | jq -c '.data[]' | while read -r variant; do
#                 variant_id=$(echo "$variant" | jq -r '.id')
#                 variant_file="${product_dir}/variant_${variant_id}.json"
                
#                 # Save each variant to its own JSON file
#                 echo "$variant" | jq '.' > "$variant_file"
#                 echo "Saved variant $variant_id to ${variant_file}"
#             done
#         else
#             echo "Failed to fetch variants for product ${product_title} (ID: ${product_id}): $response"
#         fi
#     done
# done

#!/bin/bash

# # Set the API key
# API_KEY="wtWkCCbnTAF1fSt0o1FkdUm8azvRxvN0kq9Mt953"

# # Define the base directory for categories
# CATEGORIES_DIR="public/printful/categories"

# # First, clean up any existing nested category structures
# find "$CATEGORIES_DIR" -mindepth 2 -type d -exec rm -rf {} +

# # Process each category JSON file
# for category_file in "$CATEGORIES_DIR"/*.json; do
#     # Skip if no files found
#     [ -e "$category_file" ] || continue
    
#     # Extract the category name from the file name
#     category_name=$(basename "$category_file" .json)
#     category_dir="${CATEGORIES_DIR}/${category_name}"
    
#     echo "Processing category: $category_name"
    
#     # Create directory for the category if it doesn't exist
#     mkdir -p "$category_dir"
    
#     # Read the category JSON file and extract each product's ID and title
#     jq -c '.data[]' "$category_file" | while read -r product; do
#         product_id=$(echo "$product" | jq -r '.id')
#         product_title=$(echo "$product" | jq -r '.title' | sed 's/ /_/g')
        
#         # Define the URL to fetch the product's catalog variants
#         url="https://api.printful.com/v2/catalog-products/${product_id}/catalog-variants"
        
#         # Fetch the variants data
#         echo "Fetching variants for product: ${product_title} (ID: ${product_id})"
#         response=$(curl -s -X GET "$url" \
#             -H "Authorization: Bearer $API_KEY" \
#             -H "Content-Type: application/json")
        
#         # Check for a valid response
#         if echo "$response" | jq -e '.data' > /dev/null 2>&1; then
#             # Process each variant
#             echo "$response" | jq -c '.data[]' | while read -r variant; do
#                 variant_id=$(echo "$variant" | jq -r '.id')
#                 variant_file="${category_dir}/variant_${variant_id}.json"
                
#                 # Add product information to the variant
#                 enriched_variant=$(echo "$variant" | jq \
#                     --arg pid "$product_id" \
#                     --arg ptitle "$product_title" \
#                     '. + {
#                         "product_id": $pid,
#                         "product_title": $ptitle
#                     }')
                
#                 # Save the variant directly in the category directory
#                 echo "$enriched_variant" | jq '.' > "$variant_file"
#                 echo "Saved variant $variant_id to ${variant_file}"
#             done
#         else
#             echo "Error fetching variants for product ${product_title} (ID: ${product_id}): $response"
#         fi
#     done
# done

#!/bin/bash

# Set the API key
API_KEY="wtWkCCbnTAF1fSt0o1FkdUm8azvRxvN0kq9Mt953"

# Define the base directory for categories
CATEGORIES_DIR="public/printful/categories"

# First, clean up any existing nested category structures and variant files
find "$CATEGORIES_DIR" -mindepth 2 -type f -name "variant_*.json" -delete
find "$CATEGORIES_DIR" -mindepth 2 -type d -exec rm -rf {} +

# Process each category JSON file
for category_file in "$CATEGORIES_DIR"/*.json; do
    # Skip if no files found
    [ -e "$category_file" ] || continue
    
    # Extract the category name from the file name
    category_name=$(basename "$category_file" .json)
    category_dir="${CATEGORIES_DIR}/${category_name}"
    
    echo "Processing category: $category_name"
    
    # Create directory for the category if it doesn't exist
    mkdir -p "$category_dir"
    
    # Read the category JSON file and extract each product's sync_product data
    jq -c '.data[]' "$category_file" | while read -r product; do
        # Extract the catalog_product_id from the links section
        catalog_product_id=$(echo "$product" | jq -r '.catalog_product_id')
        product_title=$(echo "$product" | jq -r '.name' | sed 's/ /_/g')
        
        if [ "$catalog_product_id" != "null" ] && [ ! -z "$catalog_product_id" ]; then
            # Define the URL to fetch the product's catalog variants
            url="https://api.printful.com/v2/catalog-products/${catalog_product_id}/catalog-variants"
            
            echo "Fetching variants for product: ${product_title} (Catalog ID: ${catalog_product_id})"
            
            response=$(curl -s -X GET "$url" \
                -H "Authorization: Bearer $API_KEY" \
                -H "Content-Type: application/json")
            
            # Check if response contains data array
            if echo "$response" | jq -e '.data' > /dev/null 2>&1; then
                # Process each variant
                echo "$response" | jq -c '.data[]' | while read -r variant; do
                    variant_id=$(echo "$variant" | jq -r '.id')
                    variant_file="${category_dir}/variant_${variant_id}.json"
                    
                    # Add product information to the variant
                    enriched_variant=$(echo "$variant" | jq \
                        --arg pid "$catalog_product_id" \
                        --arg ptitle "$product_title" \
                        --arg cat "$category_name" \
                        '. + {
                            "catalog_product_id": $pid,
                            "product_title": $ptitle,
                            "category": $cat
                        }')
                    
                    # Save the variant
                    echo "$enriched_variant" | jq '.' > "$variant_file"
                    echo "Saved variant $variant_id to ${variant_file}"
                done
            else
                echo "Error or no data for product ${product_title} (Catalog ID: ${catalog_product_id}): $response"
            fi
        else
            echo "Skipping product ${product_title} - no catalog_product_id found"
        fi
    done
done