# *Endpoints*
-------------


| HTTP Method   | URI path      | Description                   |
| ------------- |:-------------:|   -----:                      |
| GET           | /             | Home                          |
| GET           | /signup       |Register page                  |
| GET           | /login        |Log in page                    |
| GET           |/search-recipes|List of recipes                |
| GET           | /recipe/:id   |Recipe info                    |
| GET           | /logout       |Log out                        |
| GET           | /profile      |Your profile once you logged in|


# *.env info*
-------------

PORT= "port where you are running the server"

SESS_SECRET = secret phrase

MONGODB_URI = mongoose server

APIKEY = spoonacular APi key
