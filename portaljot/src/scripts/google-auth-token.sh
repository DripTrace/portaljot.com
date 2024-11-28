com/lit_lite_inference_v1.6-xl/5dcd829f-dea3-47ea-a9ba-4ec7ecc191f8/151d86fb-b7b8-4d0b-8ab9-4af90a7ce250_video0e936164199f547629c4b537665a4f087.mp4' | base64 -w 0)"'"
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
    }')
    
    echo "API Response:"
    echo "${RESPONSE}" | jq .
else
    echo "Error: Failed to obtain access token."
    echo "Full response from token endpoint:"
    echo "${TOKEN_RESPONSE}"
fi

# Clean up
rm -rf "${TEMP_DIR}"
