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
    
        // Identify the panel div by ID (metadata) and panel-body
    // and assign the HTML object it the variable name panelBody
    var panelBody = d3.select('#metadata');

    // Clear out the panel panel-body before rebuilding the panel with new metadata
    panelBody.html('');

    // For each panelBody (item) in paneKeysValues,
    // append an HTML header (h6) to the HTML panel-body and
    // add text that corresponds to that item.    
    panelKeysValues.forEach(item => {
      panelBody.append("h6").text(item);
    });    
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

    // Extract simple Arrays from 3 of the 4 keys in the samplesData Object 
    var otuIdsArray = individualSampledata.otu_ids;
    var otuLabelsArray = individualSampledata.otu_labels;
    var sampleValuesArray = individualSampledata.sample_values;
    
    // Test that we extacted simple Arrays
    console.log("--- testing otuIdsArray ---");
    console.log(otuIdsArray);
    console.log("--- testing otuLabelsArray ---");
    console.log(otuLabelsArray);
    console.log("--- testing sampleValuesArray ---");
    console.log(sampleValuesArray);

    // Simple sort of sample_values Array    
    var sortedSampleValuesArray = sampleValuesArray.sort((firstValue, secondValue) => secondValue - firstValue);
    console.log("--- testing sortedSampleValuesArray ---");
    console.log(sortedSampleValuesArray)

    // Slice each of the 3 Arrays
    var slicedOtuIdsArray = otuIdsArray.slice(0, 10);
    var slicedOtuLabelsArray = otuLabelsArray.slice(0, 10);
    var slicedSampleValuesArray = sampleValuesArray.slice(0, 10);

    // Reversed slice each of the 3 Arrays
    var ReversedSlicedOtuIds = slicedOtuIdsArray.reverse();
    var ReversedSlicedOtuLabels = slicedOtuLabelsArray.reverse();
    var ReversedSlicedSampleValues = slicedSampleValuesArray.reverse();

    // Test that we correctly sliced and reversed the simple Arrays
    console.log("--- testing ReversedSlicedOtuIds ---");
    console.log(ReversedSlicedOtuIds);
    console.log("--- testing ReversedSlicedOtuLabels ---");
    console.log(ReversedSlicedOtuLabels);
    console.log("--- testing ReversedSlicedSampleValues ---");
    console.log(ReversedSlicedSampleValues);

    // Further modify ReversedSlicedOtuIds by adding a text heading (OTU)
    var modifiedOtuIds = [];
    ReversedSlicedOtuIds.forEach(item => {      
      modifiedOtuIds.append(`OTU ${ReversedSlicedOtuIds}`);
    });

    console.log("--- testing modifiedOtuIds ---");
    console.log(modifiedOtuIds);
    // END OF ASSAY DATA PROCESSING -- RETURN ONLY ASSAY DATA FOR SPECIFIED TEST SUBJECT


    // BEGINNING OF HORIZONTAL BAR CHART PLOT
    var barData = [{
      type: 'bar',    
      x: ReversedSlicedSampleValuesArray,
      y: ReversedSlicedOtuIdsArray,
      orientation: 'h'
    }];

    Plotly.newPlot('bar', barData);
    // END OF HORIZONTAL BAR CHART PLOT


    // BEGINNING OF BUBBLE CHART PLOT
    var trace1 = {
      x: [1, 2, 3, 4],
      y: [10, 11, 12, 13],
      text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
      mode: 'markers',
      marker: {
        color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
        size: [40, 60, 80, 100]
      }
    };
  
    var bubbleData = [trace1];
    
    var layout = {
      title: 'Bubble Chart Hover Text',
      showlegend: false,
      height: 600,
      width: 1200
    };
    
    Plotly.newPlot('bubble', bubbleData, layout);
    // END OF BUBBLE CHART PLOT

  });

  

};


  
  



































// Identify web element(s) on the page
// selectbtn = d3.select('#selDataset');

// Add event listeners to the web elements
// selectbtn.on('change', show);
