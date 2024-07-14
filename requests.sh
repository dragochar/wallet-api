#!/bin/bash
# This file is for testing the API

# Set API base URL
API_URL="http://localhost:3000/api/v1"

# Credentials
USERNAME="admin"
PASSWORD="secret"

# Test data
WALLET_ADDRESS="0x4afd18c9878b7180a97e003aab9c1285ace3f16c"
FROM_DATE="2024-01-01"
TO_DATE="2024-12-31"

# Test GET /points endpoint
echo "Testing GET /points endpoint"
curl -u $USERNAME:$PASSWORD "$API_URL/points?wallet_address=$WALLET_ADDRESS&from_date=$FROM_DATE&to_date=$TO_DATE"
echo -e "\n"



# Make executale, and then run in termianl with:
# chmod +x requests.sh
# ./requests.sh