# Dependencies
import json
from flask import Flask, render_template, jsonify # url_for, send_file

# Assign name to application that will run on the web app server
app = Flask(__name__)

# Create main / home route
@app.route("/")
def index():

    # Use render_template to serve up the index.html
    return render_template('index.html')

# Create /samples API route]
@app.route("/samples")
def samples():    

    # Open the json file, located at static/data/samples.json    
    with open('static/data/samples.json') as samples_data_uploaded:
        
        # Use json.load() to read in the file as json
        samples_data = json.load(samples_data_uploaded)

    # Return the json dataset through the Flask endpoint.
    # (I originally tried to jsonify samples_data before I realized it was not
    # only not viable but also redundant. Thanks to Redeat for catching this.)
    return (samples_data)

# Run the application server
# Gracefully failover and restart in the event of a saved update
if __name__ == "__main__":
    app.run(debug=True)