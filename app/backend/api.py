from flask import Flask
from scraping import *
from answer import *
from summerization import * 

app = Flask(__name__)

@app.route("/summ")
def summary():
    summary = seperate_file("catSample.pdf")
    print(summary)
    q = generate(summary=summary)
    return {"questions": q}


@app.route("/quiz")
def quiz():
    return 


if __name__ == "__main__":
    app.run(debug=True)