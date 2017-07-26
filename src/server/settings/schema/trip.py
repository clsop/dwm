schema = {
	"name": {
		"type": "string",
		"minlength": 4,
		"maxlength": 10
	},
	"when": {
		"type": "datetime",
		"required": True,
		"unique": True
	},
	"recuring": {
		"type": "dict",
		"required": False,
		"schema": {
			"day": {
				"type": "integer",
				"required": True
			},
			"until": {
				"type": "datetime",
				"required": True
			}
		}
	}
}