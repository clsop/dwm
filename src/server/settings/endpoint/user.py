from ..schema import user

endpoint = {
	"item_title": 'user',

	"additional_lookup": {
		"url": 'regex("[\w]+")',
		"field": 'login'
	},

	"cache_control": 'max-age=10,must-revalidate',
	"cache_expires": 10,

	"resource_methods": ['GET', 'POST'],
	"item_methods": ['PUT'],
	"allowed_read_roles": ['driver', 'passenger'],

	"schema": user.schema
}