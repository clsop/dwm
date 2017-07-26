import json

class LoginStatus:
	def __init__(self, loginCode, message):
		self.LoginCode = loginCode
		self.Message = message

	def __str__(self):
		return json.dumps(self.__dict__, sort_keys=True, indent=4)
		