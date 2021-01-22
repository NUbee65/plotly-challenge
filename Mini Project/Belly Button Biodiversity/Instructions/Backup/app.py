import json
from flask import Flask, render_template, jsonify # url_for, send_file

app = Flask(__name__)

@app.route("/")
def index():

    # use render_template to serve up the index.html
    return render_template('index.html')

@app.route("/samples")
def samples():

    # return render_template(samples_data, context)

    # open the json file, located at static/data/samples.json    
    with open('static/data/samples.json') as samples_data_uploaded:
        
        # use json.load() to read in the file as json
        samples_data = json.load(samples_data_uploaded)

        # print(samples_data)  

    # return that json through the Flask endpoint
    return (samples_data)
    
    # return redirect('/')

if __name__ == "__main__":
    app.run(debug=True)