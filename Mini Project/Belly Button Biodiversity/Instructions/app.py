import json
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():

    # use render_template to serve up the index.html
    return(render_template('index.html', samples_data=samples_data))

@app.route("/samples")
def samples():

    # open the json file, located at static/data/samples.json    
    with open('Instructions/StarterCode/static/data/samples.json') as f:
        
        # use json.load() to read in the file as json
        samples_data = json.load(f)
    

    # return that json through the Flask endpoint
    return jsonify(samples_data)
    
    return redirect('/')

if __name__ == "__main__":
    app.run(debug=True)