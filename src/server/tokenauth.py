from datetime import timedelta

from eve.auth import TokenAuth
import jwt

from settings import auth

class JWTAuth(TokenAuth):
	def check_auth(self, token, allowed_roles, resource, method):
		try:
			decodedToken = jwt.decode(token, auth.settings['JWT_SECRET'], algorithm=auth.settings['JWT_ALGORITHM'],
				leeway=auth.settings['JWT_LEEWAY'])
		except jwt.DecodeError as ex:
			return False
		except jwt.ExpiredSignatureError as ex:
			return False

		return any(role for role in allowed_roles if any(role in r for r in decodedToken[auth.settings['JWT_ROLES_CLAIM']]))
