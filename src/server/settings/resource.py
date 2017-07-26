from .endpoint import user, trip

settings = {
	"DOMAIN": {
	    "user": user.endpoint,
	    "trip": trip.endpoint
	}
}