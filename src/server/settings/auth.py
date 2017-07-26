from datetime import timedelta

settings = {
	"JWT_ALGORITHM": "HS256",
	"JWT_SECRET": "makemeahash",
	"JWT_ISSUER": "shanknet:dwm",
	"JWT_ROLES_CLAIM": "dwm:roles",
	"JWT_EXPIRATION": timedelta(hours=4),
	"JWT_LEEWAY": timedelta(seconds=10)
}