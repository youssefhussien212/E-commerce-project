from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app, origins='http://127.0.0.1:3000/popular')
    
    with app.app_context():
        from . import routes
        app.register_blueprint(routes.bp)

    return app
