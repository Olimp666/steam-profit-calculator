import json
from flask import Flask

app = Flask(__name__)

json_path = "./ids.json"
jsondata = json.loads(open(json_path, mode="r", encoding="utf-8").read())


@app.route("/getid/<name>")
def get_id(name):
    try:
        id = str(jsondata[name])
        return id
    except Exception as error:
        return str(-1)


@app.route("/json")
def get_json():
    try:
        return jsondata
    except Exception as error:
        return str(-1)


if __name__ == "__main__":
    app.run()
