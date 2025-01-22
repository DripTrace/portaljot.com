#!/bin/bash

# Printful API key
API_KEY="wtWkCCbnTAF1fSt0o1FkdUm8azvRxvN0kq9Mt953"
BASE_URL_POKE="https://api.printful.com/v2/catalog-categories"

# Create the categories directory
mkdir -p public/printful/categories

# Fetch the list of categories
categories=$(curl -s -X GET "https://api.printful.com/v2/catalog-categories" -H "Authorization: Bearer $API_KEY")

# Check if the API call for categories was successful
if echo "$categories" | jq -e '.data' > /dev/null 2>&1; then
    # Iterate through each category
    echo "$categories" | jq -c '.data[]' | while read -r category; do
        # Extract category details
        category_id=$(echo "$category" | jq -r '.id')
        category_title=$(echo "$category" | jq -r '.title' | tr -d "'" | sed 's/ /_/g')

        # Create a JSON file named after the category title
        json_file="public/printful/categories/${category_title}.json"

        # Fetch items in this category by using the product endpoint and category ID as a filter
        items=$(curl -s -X GET "$BASE_URL_POKE?category_id=$category_id" -H "Authorization: Bearer $API_KEY")

        # Check if the API call for items was successful
        if echo "$items" | jq -e '.data' > /dev/null 2>&1; then
            # Write items to the JSON file
            echo "$items" > "$json_file"
            echo "Created $json_file with items from category $category_title"
        else
            # Log error message for debugging
            echo "Failed to fetch products for category $category_title (ID: $category_id). Response: $items"
        fi
    done
else
    # Print error message if the API call for categories failed
    echo "Failed to retrieve categories. Check your API key and permissions."
    echo "Response from Printful API: $categories"
    exit 1
fi

for file in public/printful/categories/*.json; do
    jq . "$file" > "${file}.tmp" && mv "${file}.tmp" "$file"
done

