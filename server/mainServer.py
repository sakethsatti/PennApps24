import sys
import os
from flask import Flask, jsonify, request, abort, make_response
from flask_cors import CORS


app = Flask(__name__)

CORS(app, supports_credentials=True)
print("this statement")


@app.route("/test")
def test_server():
    return jsonify({"message": "test successful!"})


if __name__ == "__main__":
    app.run(debug=True, port=8080)
