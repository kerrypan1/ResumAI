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
                'Eric',
<<<<<<< HEAD
                'Altay'
                
=======
                'Altay',
                "Catherine",
                "Arthur",
                "Cathryn"
>>>>>>> 2033b0980ed69162a4108621d4c17edf4a62520a
            ] 
        }
    )

if __name__ == "__main__":
    app.run(debug=True, port=8080)