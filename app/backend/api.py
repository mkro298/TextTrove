from flask import Flask, request
from scraping import *
from answer import *
from summerization import * 

app = Flask(__name__)

@app.route("/summ", methods=['POST'])
def summary():
    if 'file' not in request.files:
        return "no file"
    file = request.files['file']

    chapter = request.form.get('string', '')

    if file:
        file_path = file.filename
        file.save(file_path)
        if not chapter:
            summary = seperate_file(file_path)
        else:
            summary = seperate_file(file_path, chapter)
        return {"summary": summary}


@app.route("/quiz", methods=['POST'])
def quiz():
    summary = request.form.get('summary', '')

    if summary:
        q = generate(summary=summary)
        return {"questions": q}
    else:
        return "no summary"


if __name__ == "__main__":
    app.run(debug=True)