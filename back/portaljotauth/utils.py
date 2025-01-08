# import requests
# from jose import jwt

# def validate_google_token(id_token, client_id):
#     GOOGLE_CERTS_URL = "https://www.googleapis.com/oauth2/v1/certs"
#     certs = requests.get(GOOGLE_CERTS_URL).json()
#     for key, cert in certs.items():
#         try:
#             payload = jwt.decode(id_token, cert, algorithms=["RS256"], audience=client_id)
#             return payload
#         except jwt.ExpiredSignatureError:
#             raise ValueError("Token expired")
#         except jwt.JWTClaimsError as e:
#             raise ValueError(f"Invalid claims: {e}")
#     raise ValueError("Invalid token")
