from datetime import datetime
import os

import jwt
from werkzeug import check_password_hash
from flask import current_app as app, render_template, request, make_response
from flask_cors import CORS, cross_origin
from eve import Eve

from loginstatus import LoginStatus
from loginstatuscode import LoginStatusCode
from settings import main, db, resource, auth
from tokenauth import JWTAuth

# merge settings
settings = main.settings
settings.update(db.settings)
settings.update(resource.settings)
settings.update(auth.settings)

app = Eve(__name__, auth=JWTAuth,
	settings=settings, template_folder=os.path.realpath('.') + '/dist', static_folder=os.path.realpath('.') + '/dist')
CORS(app, resources={r'/api/*': {'origins': settings['DNS']}})

response_headers = {'Content-Type': 'application/json'}

def generateResponse():
	userLogin = request.form.get('login')
	passwd = request.form.get('passwd')

	if userLogin is None:
		return make_response(tuple([LoginStatus(LoginStatusCode.MissingLogin, "please provide a login").__str__(), 401, response_headers]))

	if passwd is None:
		return make_response(tuple([LoginStatus(LoginStatusCode.MissingPass, "please provide a password").__str__(), 401, response_headers]))
	
	user = app.data.driver.db['user'].find_one({'login': userLogin})

	if user is None:
		return make_response(tuple([LoginStatus(LoginStatusCode.LoginNotFound, "login not found").__str__(), 404, response_headers]))

	if not check_password_hash(user['passwd'], passwd.strip()):
		return make_response(tuple([LoginStatus(LoginStatusCode.WrongLoginOrPass, "wrong username or password").__str__(), 401, response_headers]))

	# create a signed jwt
	now = datetime.utcnow()
	tokenDict = {
		"iss": settings['JWT_ISSUER'],
		"exp": now + settings['JWT_EXPIRATION'],
		"iat": now
	}
	tokenDict[settings['JWT_ROLES_CLAIM']] = user['roles']
	token = jwt.encode(tokenDict, settings['JWT_SECRET'], algorithm=settings['JWT_ALGORITHM'])

	# success
	return make_response(tuple([token, 202, {'Content-Type': 'text/plain'}]))

@app.route('/', methods=['GET'])
def index():
	return render_template('index.html')

@app.route('/login', methods=['POST'])
@cross_origin(origins=settings['DNS'], methods="POST", send_wildcard=True, automatic_options=True)
def login():
	# already logged in check, check token is valid
	if request.headers.has_key('Authorization'):
		token = request.headers['Authorization'][7:]

		try:
			jwt.decode(token, settings['JWT_SECRET'], algorithm=settings['JWT_ALGORITHM'], leeway=settings['JWT_LEEWAY'])
			return make_response(tuple([LoginStatus(LoginStatusCode.AlreadyLoggedIn, "already logged in").__str__(), 400, response_headers]))
		except jwt.DecodeError as ex:
			print(ex)
		except jwt.ExpiredSignatureError as ex:
			# handle expired signature, create new based on credentials
			return generateResponse()

	return generateResponse()

if __name__ == '__main__':
    app.run()
