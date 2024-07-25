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
            title, summary = seperate_file(file_path)
        else:
            title, summary = seperate_file(file_path, chapter)
        return {"summary": summary, "title": title}


@app.route("/quiz", methods=['POST'])
def quiz():
    file = request.files['file']
    chapter = request.form.get('chapter', '')

    if file:
        s, q = generate(file_name)
        return {"questions": q, "selected": s}
    else:
        return "no filename"
    

@app.route("/delete", methods=['POST'])
def delete():
    file_name = request.form.get('text', '')
    
    if file_name:
        delete_file(file_name=file_name)
    return f"Deleted file"

@app.route("/chapters", methods=['POST'])
def chapters():
    file = request.files['file']

    if file:
        file_path = file.filename
        file.save(file_path)
        toc = get_toc(file_name=file_path)
        return {"chapters" : toc} 

if __name__ == "__main__":
    app.run(debug=True)