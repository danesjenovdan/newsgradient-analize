from flask import Flask, request
from flask_cors import CORS
import json
import datetime
from flask import send_from_directory

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploaded_data/'


@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'GET':
        return "<p>It works!</p>"
    if request.method == 'POST':
        # json
        request_data = request.get_json()
        # get timestamp
        ct = datetime.datetime.now()
        # print out
        # app.logger.info(json.dumps(request_data))
        # app.logger.info(str(ct))

        # create new json file
        out_file = open(UPLOAD_FOLDER + str(ct) + ".json", "w", encoding="utf8")
        json.dump(request_data, out_file, ensure_ascii=False)
        out_file.close()
        
        # return json
        return json.dumps(request_data, ensure_ascii=False)

@app.route("/extension/updates.json", methods=['GET'])
def updates():
    return send_from_directory('extension', 'updates.json')