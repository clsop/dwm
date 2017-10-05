schema = {
	"name": {
		"type": 'string',
		"minlength": 3,
		"maxlength": 20
	},
	"login": {
		"type": 'string',
		"minlength": 3,
		"maxlength": 10,
		"required": True,
		"unique": True
	},
	"passwd": {
		"type": 'string',
		"minlength": 6,
		"maxlength": 18,
		"required": True
	},
	"roles": {
		"type": 'list',
		"allowed": ['driver', 'passenger'],
		"minlength": 1,
		"maxlength": 2,
		"required": True
	}
}