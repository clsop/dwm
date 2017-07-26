from ..schema import trip

endpoint = {
	"item_title": 'trip',

	"id_field": 'when',

	#"cache_control": 'max-age=10,must-revalidate',
	#"cache_expires": 10,

	"allowed_write_roles": ['driver'],
	"allowed_read_roles": ['driver', 'passenger'],

	"schema": trip.schema
}