from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins="*")

@app.route("/api/users", methods=['GET'])

def users():
    return jsonify(
        {
            "users": [
                'Kerrry',
                'Eric is the goat',
                'Altay',
                'Yeonju',
                "Catherine",
                "Arthur",
                "Cathryn",
                'Daniel',
                'Katy',
                'Jesslyn',
                'Michelle',
                'Vivian',
            ] 
        }
    )

if __name__ == "__main__":
    app.run(debug=True, port=8080)