from enum import IntEnum, unique
import json

@unique
class LoginStatusCode(IntEnum):
	LoginNotFound = 100
	WrongLoginOrPass = 200
	MissingLogin = 300
	MissingPass = 400
	AlreadyLoggedIn = 500
