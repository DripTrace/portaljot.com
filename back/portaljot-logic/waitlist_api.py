# import helpers
# from ninja import NinjaAPI, Schema

# from ninja_extra import NinjaExtraAPI
# from ninja_jwt.authentication import JWTAuth
# from ninja_jwt.controller import NinjaJWTDefaultController

# # waitlist_api = NinjaExtraAPI()
# waitlist_api = NinjaExtraAPI(
#     version="2.0.0",  # Different version than other APIs
#     urls_namespace="waitlist_api_v2"  # Unique namespace
# )
# waitlist_api.register_controllers(NinjaJWTDefaultController)

# waitlist_api.register_controllers(NinjaJWTDefaultController)
# waitlist_api.add_router("/waitlists/", "waitlists.waitlist_api.router")


# class UserSchema(Schema):
#     username: str
#     is_authenticated: bool
#     # is not requst.user.is_authenticated
#     email: str = None


# @waitlist_api.get("/hello")
# def hello(request):
#     # print(request)
#     return {"message": "Hello World"}


# @waitlist_api.get("/me", response=UserSchema, auth=helpers.waitlist_api_auth_user_required)
# def me(request):
#     return request.user