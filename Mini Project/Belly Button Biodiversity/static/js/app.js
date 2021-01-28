// var url = "http://127.0.0:1:5000/samples"
var url = "/samples"

var textArray = ['', '0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9'];
reversedTextArray = textArray.reverse();
console.log(reversedTextArray);


function populateSelect() {

  // Use D3 to capture the JSON data from the URL
  // which yields a nested object of arrays of objects
  // We also checked the data directly in Chrome with JSON viewer extension
  d3.json(url).then(function(samplesData) {

    // PRINT / TEST the entire dataset to the console
    // This shows 3 arrays each with 153 items
    // One (names) is a simple array with values
    // The other two (metadata, samples) are arrays of objects
    // The samples array is an array of objects of arrays
    console.log("--- testing Entire Dataset aka samplesData ---");
    console.log(samplesData);

    console.log("--- testing metadata ---");
    console.log(samplesData.metadata);

    console.log("--- testing samples ---");
    console.log(samplesData.samples);

    var subjectIds = samplesData['names'];
    console.log("--- testing subjectIds ---");
    console.log(subjectIds);    

    // Use D3 to select / alias the selector button and option field
    var selectList = d3.select('#selDataset');

    // Iterate through each object 
    subjectIds.forEach(item => {      

      // Create a new option (drop down tag item)
      // which is appended to the drop down selector 
      var option = selectList.append('option');
      
      // Copy the subjectID value to the option tag's visible text 
      // field and to the option tag's value field (hidden from view 
      // but used to query the dataset and retrieve the selected record)
      // I had mistakenly tried to use the append method here.  Doh!
      option.text(item).property("value", item);
    });
  });
}

populateSelect();

// BEGINNING OF FUNCTION TO CAPTURE DROPDOWN VALUE SELECTED
// Capture the inputValue from index.html, which has an embedded onchange listener
// This means we don't have the listener identification and event trigger in this file, app.js
// The html select object (#selDataset) triggers the named show() function >>> onchange="show(this.value)
function show(value){
  console.log("Value changed, aka input value, captured by show() function")
  console.log(value);
  // CRITICAL: The show function passes the captured input value to another function "extract"
  extract(value);
}
// BEGINNING OF FUNCTION TO CAPTURE DROPDOWN VALUE SELECTED

// BEGINNING OF FUNCTION TO USE DROPDOWN VALUE SELECTED
// CRITICAL: The "extract" function carries over the input value passed by the "show" function
function extract(inputValue) {
  console.log("Input value received by the extract() function")
  console.log(inputValue);

  // BEGINNING OF DATA PROCESSING
  d3.json(url).then(function(samplesData) {    

    // BEGINNING METADATA DATA PROCESSING -- RETURN ONLY METADATA FOR SPECIFIED TEST SUBJECT
    var samplesMetadata = samplesData.metadata
    var individualMetadata = samplesMetadata.filter(obj => obj.id == inputValue);
    console.log("--- testing individualMetadata ---");
    console.log(individualMetadata);

    // To extract the wfreq value, or any of the field data, we need to undeerstand that individualMetadata 
    // seems to be an array but that it is in actuality a single slice of a filtered object of arrays.  So, 
    // to get at it, we must first identify the position of the single array, which is 0.  Only then can we 
    // pull the wfreq value by naming the key.
    var individualAge = individualMetadata[0].age;
    var individualBBtype = individualMetadata[0].bbtype;
    var individualEthnicity = individualMetadata[0].ethnicity;
    var individualGender = individualMetadata[0].gender;
    var individualLocation = individualMetadata[0].location;
    var individualWfreq = individualMetadata[0].wfreq;
    var individualIDx = individualMetadata[0].id;
    
    console.log("--- testing individual metadata values ---");
    
    var panelItem1 = (`AGE: ${individualAge}`);
    var panelItem2 = (`BBTYPE: ${individualBBtype}`);
    var panelItem3 = (`ETHNICITY: ${individualEthnicity}`);
    var panelItem4 = (`GENDER: ${individualGender}`);
    var panelItem5 = (`LOCATION: ${individualLocation}`);
    var panelItem6 = (`WFREQ: ${individualWfreq}`);
    var panelItem7 = (`sample: ${individualIDx}`);    

    panelKeysValues = [
      panelItem1,
      panelItem2,
      panelItem3,
      panelItem4,
      panelItem5,
      panelItem6,
      panelItem7
    ];

    console.log(panelKeysValues);
    // END OF METADATA DATA PROCESSING


    // BEGINNING OF POPULATING SELECTED SAMPLE METADATA INTO WEB PAGE PANEL
    // Identify the table and tbody

    /*
    var panelBody = d3.select('#metadata');

    panelKeysValues.forEach(item => {
      var row = panelBody.append('tr');
      option.text(item).property("value", item);
    });
    */

    // END OF POPULATING SELECTED SAMPLE METADATA INTO WEB PAGE PANEL


    // BEGINNING OF GUAGE PLOT -- INCLUDING POPULATING SELECTED SAMPLE WFREQ INTO 
    
    // Enter a frequency between 0 and 9
    var level = individualWfreq;

    // Trig to calc meter point
    var degrees = 180 - (level * 20),
        radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    var data = [{ type: 'scatter',
      x: [0], y:[0],
        marker: {size: 28, color:'850000'},
        showlegend: false,
        name: 'washes',
        text: level,
        hoverinfo: 'text+name'},
      { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
      rotation: 90,
      text: reversedTextArray,
      textinfo: 'text',
      textposition:'inside',
      marker: {colors:['rgba(102, 153, 153)', 'rgba(0, 153, 153, .5)',
                      'rgba(51, 204, 204, .5)', 'rgba(0, 204, 255, .5)',
                      'rgba(0, 153, 255, .5)', 'rgba(0, 102, 255, .5)',
                      'rgba(51, 102, 255, .5)', 'rgba(51, 51, 204, .5)',
                      'rgba(102, 102, 153, .5)', 'rgba(0, 153, 51, 0)',]},
      labels: reversedTextArray,
      hoverinfo: 'label',
      hole: .5,
      type: 'pie',
      showlegend: false
    }];

    var layout = {
      shapes:[{
          type: 'path',
          path: path,
          fillcolor: '850000',
          line: {
            color: '850000'
          }
        }],
      title: '<b>Frequency</b> <br> Washes 0-9',
      height: 600,
      width: 600,
      xaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]},
      yaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]}
    };

    Plotly.newPlot('gauge', data, layout);
    // END OF GUAGE PLOT -- INCLUDING POPULATING SELECTED SAMPLE WFREQ INTO


    // BEGINNING ASSAY DATA PROCESSING -- RETURN ONLY ASSAY DATA FOR SPECIFIED TEST SUBJECT
    var assaysSamplesdata = samplesData.samples
    var assaysSampledataSlice = assaysSamplesdata.filter(obj => obj.id == inputValue);
    var individualSampledata = assaysSampledataSlice[0];
    console.log("--- testing individualSampledata ---");
    console.log(individualSampledata);

    var sampleValuesArray = individualSampledata.sample_values;
    console.log(sampleValuesArray);

    var sortedSampleValuesArray = sampleValuesArray.sort((firstValue, secondValue) => secondValue - firstValue);
    console.log(sortedSampleValuesArray)


    var otuIdsArray = individualSampledata.otu_ids
    var otuLabelsArray = individualSampledata.otu_labels
    
    /*
    // Delete keys that will not be searched for -- eliminating keys that are not arrays
    Object.keys(individualSampledata).forEach(function(key) => {
        if(individualSampledata.key){
            delete individualSampledata[key];
        }
    });

    */





    /*
    Object.keys(dictionary).forEach(function(key) {
         and here have an if condition to check if the key holds an array
     }); 
    */
    // use indexOf function on the sorted array


    // logic can be used to query a key to determine if it is an Array?



    // END OF ASSAY DATA PROCESSING -- RETURN ONLY ASSAY DATA FOR SPECIFIED TEST SUBJECT


    // BEGINNING METADATA DATA PROCESSING -- RETURN ONLY METADATA FOR SPECIFIED TEST SUBJECT

  });

  

};


  
  



































// Identify web element(s) on the page
// selectbtn = d3.select('#selDataset');

// Add event listeners to the web elements
// selectbtn.on('change', show);
