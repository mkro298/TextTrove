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

    print("DID NOT CHECK IF FILE IS THERE")

    if file:
        file_path = file.filename
        print("FILE NAME: " + file_path)
        file.save(file_path)
        summary = seperate_file(file_path)
        return {"summary": summary}


@app.route("/quiz")
def quiz():
    summary = seperate_file("catSample.pdf")
    q = generate(summary=summary)
    return {"questions": q}


if __name__ == "__main__":
    app.run(debug=True)