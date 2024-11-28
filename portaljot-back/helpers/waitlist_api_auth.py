from ninja_jwt.authentication import JWTAuth


def allow_annon(request):
    if not request.user.is_authenticated:
        return True


waitlist_api_auth_user_required = [JWTAuth()]
waitlist_api_auth_user_or_annon = [JWTAuth(), allow_annon]
