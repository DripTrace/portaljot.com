#!/bin/bash

# API Key for Gemini
API_KEY="AIzaSyB2lP73Ce_V-mo8pjP5DlA0J0ylFaI3B6M"

# Download and encode video file in base64
VIDEO_URL='https://storage.cdn-luma.com/lit_lite_inference_v1.6-xl/5dcd829f-dea3-47ea-a9ba-4ec7ecc191f8/151d86fb-b7b8-4d0b-8ab9-4af90a7ce250_video0e936164199f547629c4b537665a4f087.mp4'
VIDEO_FILE=$(mktemp)
curl -s "$VIDEO_URL" -o "$VIDEO_FILE"
BASE64_VIDEO=$(base64 < "$VIDEO_FILE" | tr -d '\n')

# Create JSON payload
JSON_PAYLOAD=$(mktemp)
cat <<EOF > "$JSON_PAYLOAD"
{
  "contents": [{
    "parts": [
      {"text": "Describe what is happening in this video:"},
      {
        "inlineData": {
          "mimeType": "video/mp4",
          "data": "$BASE64_VIDEO"
        }
      }
    ]
  }],
  "generationConfig": {
    "temperature": 0.4,
    "topK": 32,
    "topP": 1,
    "maxOutputTokens": 4096
  }
}
EOF

# Make the API request using the API key
echo "Analyzing video with Gemini API..."
RESPONSE=$(curl -s -X POST \
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-002:generateContent?key=${API_KEY}" \
    -H "Content-Type: application/json" \
--data @"$JSON_PAYLOAD")

echo "API Response:"
echo "${RESPONSE}" | jq .

# Clean up temporary files
rm "$VIDEO_FILE" "$JSON_PAYLOAD"

# #!/bin/bash

# # Service account details
# SERVICE_ACCOUNT_EMAIL="firebase-adminsdk-e8yx9@portaljot-com.iam.gserviceaccount.com"
# PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
# MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCMtkzv2VY3mGbS
# T/dM9YFBF/OtWL2ps696m5ciXukUiWHHcO9L7zhVdmYvOzXW8SmRKLUvu/bhAsVJ
# qzJ47RsRR56X4OMwY6Wdx4RQOykHeM6t+LXyoQ8WYomToZEyANovtfRlY79upob1
# Aj9AG343GNUXtEINHtS2yVZm4fvRLZvn3rTr+TwIWGCeN/zLIFVNPgYbO1gQ8VHb
# 0mtOBHTuU2E2KxUpnTnUFAewpFybP3G/05GaB/qtKueUwd0gkX6U0S5ZHEuB2vIa
# hcS3lxL69t2CT8OvAoMPXiGUfvpoFkbLjoypNn8O0MffIi2M1xuk61Hg9EAnEwaw
# ddvgiv7fAgMBAAECggEAIEr8ODVgQI0U1+JrRnm3arl0/oz1phsrRA+uLUCr7D8l
# NhDYkkw52P89r0w+7G/XUs2NW4GfRH+OyHvmLvN3eU0+++ssKKBN03qFBqa1IVZb
# 1HhWRXMqE8CUg1GakWe5qyZuitBMEDhek58q5esJWdq0mOaRHBK9zZ9CWYU2dghS
# 9cRvXdbNBF++1dDojc9r6QWgpk42wURIhumtFtm4+K/X165/4QeegcFqgLBiUHwY
# SFF7PK9IS0ypWowPnUZcAkHkc8JDKf1ETFJyhLw6wnjYE6QEc7X4DxzvYaV9IXvm
# L654w4Fc7EkcJhykeQYygsuXVysd/v92Xt3SUWgYFQKBgQDApIlRbrkNSAh9uOEo
# Ded514lZDMj17XIA4MEDEzwwO9EBY6lY8nGeXyUM9XbSHmy1xbOVv6ua7o+4+2r2
# j98RvLFnEs6O7FtyO06aWvjDiSOy1YksV4F6EOKcO+GnEz1iT5S4aKE7wXWI9gV/
# v4EhD7LiokhaVd3FE27w0oZQYwKBgQC6/X2oSEVZ0bPnq0teqapsmKpo2weRoHRI
# K09LXtxjzd+LkKozb8Ok5Zp5x8z5Ufdxg06wDGSUDmrDlhKrneWgjRk4zNlGFN19
# 0cYBiNWABK+x2FsNgRQW6DgyD/sa23AgjIr5YiMhue5U0ivx7uOonHyOwRW6zc36
# FAhWFeraVQKBgCz7fpEEQLOoOUtaC0E2FfHucUTY5mf+fNtVn9we9rPwk7o2UknR
# utQXNWiUPJ2NuyaqtmdmLSTtRaQVGQHf0F+s5uPBkXfwGt5OmOkUCvhlom9Uy0YO
# XM5q+O8wUF2Z8YBuQrTYwaVZZB+KCvisd/OHXebrq+dkG3e0NPiIwBIvAoGBAJQT
# TUDICnM4Rxk8YrER9q2Mr9XdLT87KxpDgcWT1z8Jtu7UnpOg+/NHB29Ms5r0N9ki
# PFvZVISSbiV4YEya+06KreB3B9AhkcyjJAPvEfMQwvk49dHZ18jUGDw8v4LjJwX/
# hcY62stIa92rmbU6kfniAhkh+k010Nkqp/dT3+kJAoGAF8/9Dp6BVyrR6oeO7fmE
# XYJeBUzhSRXTsz9EKEW4l23vFYq+JSfUEa6Je7TgxVWGH/gDGw4EXxdOIp+R7nl0
# ZRtZFloRjJtzw2Cu2Gah0KHGJ1FUve4CcUTzdKHEu+tRkeuVcXuWgPTpklUK2/hi
# nKSfGa/gls1vlq8H3L28yUI=
# -----END PRIVATE KEY-----"

# # Define constants for JWT creation and token exchange
# TOKEN_URL="https://oauth2.googleapis.com/token"
# SCOPES="https://www.googleapis.com/auth/cloud-platform"
# AUDIENCE="https://oauth2.googleapis.com/token"

# # Create a signed JWT using the private key and service account email
# echo "Creating signed JWT..."

# # Create header
# HEADER=$(echo -n '{"alg":"RS256","typ":"JWT"}' | base64 | tr '+/' '-_' | tr -d '=\n')

# # Create claims
# NOW=$(date +%s)
# EXP=$(($NOW + 3600))
# CLAIMS=$(echo -n "{
#   \"iss\": \"${SERVICE_ACCOUNT_EMAIL}\",
#   \"scope\": \"${SCOPES}\",
#   \"aud\": \"${AUDIENCE}\",
#   \"exp\": ${EXP},
#   \"iat\": ${NOW}
# }" | base64 | tr '+/' '-_' | tr -d '=\n')

# # Save the private key to a temporary file
# PRIVATE_KEY_FILE=$(mktemp)
# echo "$PRIVATE_KEY" > "$PRIVATE_KEY_FILE"
# chmod 600 "$PRIVATE_KEY_FILE"

# # Create input for signature
# UNSIGNED_JWT="${HEADER}.${CLAIMS}"
# echo -n "$UNSIGNED_JWT" > "${PRIVATE_KEY_FILE}.input"

# # Create signature
# SIGNATURE=$(openssl dgst -sha256 -sign "$PRIVATE_KEY_FILE" "${PRIVATE_KEY_FILE}.input" | base64 | tr '+/' '-_' | tr -d '=\n')

# # Combine to create final JWT
# JWT="${UNSIGNED_JWT}.${SIGNATURE}"

# # Clean up temporary files
# rm "$PRIVATE_KEY_FILE" "${PRIVATE_KEY_FILE}.input"

# # Exchange the signed JWT for an access token
# echo "Getting access token..."
# TOKEN_RESPONSE=$(curl -s "${TOKEN_URL}" \
#     -H "Content-Type: application/x-www-form-urlencoded" \
#     -d "grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer" \
# -d "assertion=${JWT}")

# echo "Token Response:"
# echo "${TOKEN_RESPONSE}"

# ACCESS_TOKEN=$(echo "${TOKEN_RESPONSE}" | jq -r .access_token)

# if [ "$ACCESS_TOKEN" != "null" ] && [ -n "$ACCESS_TOKEN" ]; then
#     echo "Access token obtained successfully."

#     # Download and encode video file in base64
#     VIDEO_URL='https://storage.cdn-luma.com/lit_lite_inference_v1.6-xl/5dcd829f-dea3-47ea-a9ba-4ec7ecc191f8/151d86fb-b7b8-4d0b-8ab9-4af90a7ce250_video0e936164199f547629c4b537665a4f087.mp4'
#     VIDEO_FILE=$(mktemp)
#     curl -s "$VIDEO_URL" -o "$VIDEO_FILE"
#     BASE64_VIDEO=$(base64 < "$VIDEO_FILE" | tr -d '\n')

#     # Create JSON payload
#     JSON_PAYLOAD=$(mktemp)
#   cat <<EOF > "$JSON_PAYLOAD"
# {
#   "contents": [{
#     "parts": [
#       {"text": "Describe what is happening in this video:"},
#       {
#         "inlineData": {
#           "mimeType": "video/mp4",
#           "data": "$BASE64_VIDEO"
#         }
#       }
#     ]
#   }],
#   "generationConfig": {
#     "temperature": 0.4,
#     "topK": 32,
#     "topP": 1,
#     "maxOutputTokens": 4096
#   }
# }
# EOF

#     # Make the API request
#     echo "Analyzing video with Gemini API..."
#     RESPONSE=$(curl -s -X POST \
#         'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-vision-latest:generateContent' \
#         -H "Authorization: Bearer $ACCESS_TOKEN" \
#         -H "Content-Type: application/json" \
#     --data @"$JSON_PAYLOAD")

#     echo "API Response:"
#     echo "${RESPONSE}" | jq .

#     # Clean up temporary files
#     rm "$VIDEO_FILE" "$JSON_PAYLOAD"
# else
#     echo "Failed to obtain access token. Please check your credentials and try again."
# fi