// var url = "http://127.0.0:1:5000/samples"
var url = "/samples"

// ------------------------------------------------------------------------------------------------------
// BEGINNING OF PROOF OF BEING ABLE TO ACCESS VARIOUS PARTS OF THE DATASET
// ------------------------------------------------------------------------------------------------------
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
});
// END OF PROOF OF BEING ABLE TO ACCESS VARIOUS PARTS OF THE DATASET
// ------------------------------------------------------------------------------------------------------


// ------------------------------------------------------------------------------------------------------
// BEGINNING OF INITIALIZATION FUNCTION init()
// ------------------------------------------------------------------------------------------------------
// This includes extracting Subject IDs and populating them into the Selector
// This also includes choosing the default (starting) Subject IDs from which
// the panel metadata and all graphs are driven.

function init() {

  // Use D3 to capture the JSON data from the URL
  // which yields a nested object of arrays of objects
  // We also checked the data directly in Chrome with JSON viewer extension
  d3.json(url).then(function(samplesData) {

    // Use D3 to select / alias the selector button and option field
    var dropdownSelector = d3.select('#selDataset');

    // Extract array of Subject IDs from the names key in the samplesData object
    var subjectIds = samplesData['names'];

    // Sort the Subject IDs in ascending order
    var subjectIdsAscending = subjectIds.sort((a, b) => (a - b));

    // Iterate through each Subject ID in the array (subjectIds) 
    subjectIdsAscending.forEach(item => {      

      // Create a new option (drop down tag item)
      // which is appended to the drop down selector
      // Note: use of the method append() is permitted because it is modifying HTML
      var option = dropdownSelector.append('option');
      
      // Copy the subjectID value to the option tag's visible text 
      // field and to the option tag's value field (hidden from view 
      // but used to query the dataset and retrieve the selected record)
      // I had mistakenly tried to use the append method here.  Doh!
      option.text(item).property("value", item);
    });

    // Calculate lowest Subject ID value and assign that value to firstSampleId
    var minSubjectId = Math.min(...subjectIdsAscending);    
    var firstSampleId = minSubjectId;
    console.log("--- testing firstSampleId ---");
    console.log(firstSampleId);

    // Alternative method for extracting firstSampleId
    // var firstSampleId = subjectIdsAscending[0];

    // CRITICAL: pass value of firstSampleId outside of init function 
    // via function calls
    buildMetadata(firstSampleId);
    buildCharts(firstSampleId);

  // Curly bracket in line below ends D3 JSON function
  });
};
// END OF INITIALIZATION FUNCTION init()
// ------------------------------------------------------------------------------------------------------


// ------------------------------------------------------------------------------------------------------
// BEGINNING OF BUILDMETADATA FUNCTION buildMetadata()
// ------------------------------------------------------------------------------------------------------
// This builds and populates the Metadata Panel, and sends washing 
// frequency value to the Guage Plot function buildGauge

function buildMetadata(sampleId) {

  d3.json(url).then(function(samplesData) {
    var samplesMetadata = samplesData.metadata
    var individualMetadata = samplesMetadata.filter(obj => obj.id == sampleId);
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
    console.log(individualIDx);
    
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

    console.log("--- testing panelKeysValues ---");
    console.log(panelKeysValues);

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

    /* 
    // Alternative method -- far superior IMHO
    var result = individualMetadata[0]
    Object.entries(result).forEach(([key,value]) => {
      panelBody.append('h6').text(`${key.toUpperCase()}: ${value}`);
    });
    */

    // CRITICAL: Pass individualWfreq (washington frequency) value to 
    // AND activates the buildGauge() function below
    buildGauge(individualWfreq);
  
  // Curly bracket in line below ends D3 JSON function
  });
};
// END OF BUILDMETADATA FUNCTION buildMetadata()
// ------------------------------------------------------------------------------------------------------


// ------------------------------------------------------------------------------------------------------
// BEGINNING OF BUILDGAUGE FUNCTION buildGauge()
// ------------------------------------------------------------------------------------------------------

// Results from resorting this array are used by the gauge plot below
var textArray = ['', '0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9'];
reversedTextArray = textArray.reverse();
console.log(reversedTextArray);

function buildGauge(washFrequency) {

   // Enter a frequency between 0 and 9
   var level = washFrequency;

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
     title: '<b>Belly Button Washing Frequency</b> <br>  Scrubs per Week 0-9',
     height: 450,
     width: 450,
     xaxis: {zeroline:false, showticklabels:false,
               showgrid: false, range: [-1, 1]},
     yaxis: {zeroline:false, showticklabels:false,
               showgrid: false, range: [-1, 1]}
   };

   Plotly.newPlot('gauge', data, layout);
}
// END OF BUILDGAUGE FUNCTION buildGauge()
// ------------------------------------------------------------------------------------------------------


// ------------------------------------------------------------------------------------------------------// END OF BUILDGAUGE FUNCTION buildGauge()
// BEGINNING OF BUILDCHARTS FUNCTION buildCharts()
// ------------------------------------------------------------------------------------------------------
function buildCharts(sampleId) {

  d3.json(url).then(function(samplesData) {
  
    // SAMPLE DATASET PROCESSING
    // ------------------------------------------------------------------

    // Return only assay data for selected (or default) Subject ID
    var assaysSamplesdata = samplesData.samples
    var assaysSampledataSlice = assaysSamplesdata.filter(obj => obj.id == sampleId);
    var individualSampledata = assaysSampledataSlice[0];
    console.log("--- testing individualSampledata ---");
    console.log(individualSampledata);

    // Extract simple Arrays from 3 of the 4 keys in the samplesData Object 
    var otuIdsArray = individualSampledata.otu_ids;
    var otuLabelsArray = individualSampledata.otu_labels;
    var sampleValuesArray = individualSampledata.sample_values;

    // Reassemble the 3 simple Arrays into an Array of Objects
    // This makes sorting coherent and less error prone
    var sampleArrayOfObjects = otuIdsArray.map((otuIdsArray, index) => {
      return {
        otu_ids: otuIdsArray,
        otu_labels: otuLabelsArray[index],
        sample_values: sampleValuesArray[index]
      }
    });
    console.log("--- testing sampleArrayOfObjects ---");
    console.log(sampleArrayOfObjects)

    // DATA PROCESSING SPECIFIC TO HORIZONTAL BAR CHART
    // ------------------------------------------------------------------

    // PROOF that the sort operation works by sorting a descending dataset into an ascending one
    var ascendingSample = sampleArrayOfObjects.slice().sort((a, b) => (a.sample_values > b.sample_values) ? 1 : -1);
    console.log("--- testing ascendingSample ---");
    console.log(ascendingSample);

    // SORT the dataset (Array of Objects) by one key (sample_values) in descending order
    var descendingSample = sampleArrayOfObjects.slice().sort((a, b) => (a.sample_values > b.sample_values) ? -1 : 1)
    console.log("--- testing descendingSample ---");
    console.log(descendingSample);

    // EXTRACT an array for each of the keys in the Array of Objects
    // Each of these 3 Arrays are now sorted by their sample_values in 
    // descending order
    var otuIds = descendingSample.map(obj => obj.otu_ids);
    var otuLabels = descendingSample.map(obj => obj.otu_labels);
    var sampleValues = descendingSample.map(obj => obj.sample_values);

    console.log("--- testing otuIds Array ---");
    console.log(otuIds);
    console.log("--- testing otuLabels Array ---");
    console.log(otuLabels);
    console.log("--- testing sampleValues Array ---");
    console.log(sampleValues);

    // Slice each of the 3 Arrays -- the top 10 greatest sample_values
    var slicedOtuIds = otuIds.slice(0, 10);
    var slicedOtuLabels = otuLabels.slice(0, 10);
    var slicedSampleValues = sampleValues.slice(0, 10);

    // Reversed slice each of the 3 Arrays
    // Seemingly counterintuitive but necessary for the plotly horizontal bar plot
    var ReversedSlicedOtuIds2 = slicedOtuIds.reverse();
    var ReversedSlicedOtuLabels2 = slicedOtuLabels.reverse();
    var ReversedSlicedSampleValues2 = slicedSampleValues.reverse();

    // Test that we correctly sliced and reversed the simple Arrays
    console.log("--- testing ReversedSlicedOtuIds ---");
    console.log(ReversedSlicedOtuIds2);
    console.log("--- testing ReversedSlicedOtuLabels ---");
    console.log(ReversedSlicedOtuLabels2);
    console.log("--- testing ReversedSlicedSampleValues ---");
    console.log(ReversedSlicedSampleValues2);

    // Further modify ReversedSlicedOtuIds by concatenating a text heading (OTU)
    var modifiedOtuIds2 = [];
    ReversedSlicedOtuIds2.forEach(item => {      
      modifiedOtuIds2.push(`OTU ${item}`);
    });

    console.log("--- testing modifiedOtuIds2 ---");
    console.log(modifiedOtuIds2);

    // CALCULATE THE NUMBER OF OTUS FOR AN INDIVIDUAL SUBJECT'S SAMPLE
    // ------------------------------------------------------------------

    var individualSampleLength = otuIdsArray.length;
    console.log("--- testing individualSampleLength ---");
    console.log(individualSampleLength);
    
    
    // CALCULATE MAX AND MIN MEASUREMENT VALUES FOR AN INDIVIDUAL SUBJECT'S SAMPLE
    // ------------------------------------------------------------------
        
    var maxSampleValue = Math.max(...sampleValuesArray);
    var minSampleValue = Math.min(...sampleValuesArray);
        
    console.log("--- testing maxSampleValue ---");
    console.log(maxSampleValue);
    console.log("--- testing minSampleValue ---");
    console.log(minSampleValue);

    // DATA PROCESSING SPECIFIC TO BUBBLE CHART
    // ------------------------------------------------------------------

    // SORT the dataset (Array of Objects) by one key (otu_ids) in ascending order
    // CRITICAL: to ensure colors transition laterally across the OTU IDs axis
    var sampleAscendingIDs = sampleArrayOfObjects.slice().sort((a, b) => (a.otu_ids > b.otu_ids) ? 1 : -1)
    console.log("--- testing sampleAscendingIDs ---");
    console.log(sampleAscendingIDs);

    // Extract simple Arrays from all 3 of the keys in the sampleAscendingIDs Object 
    var otuIdsArrayZ = sampleAscendingIDs.map(obj => obj.otu_ids);
    var otuLabelsArrayZ = sampleAscendingIDs.map(obj => obj.otu_labels);
    var sampleValuesArrayZ = sampleAscendingIDs.map(obj => obj.sample_values);

    console.log("--- testing otuIdsArrayZ ---");
    console.log(otuIdsArrayZ);
    console.log("--- testing otuLabelsArrayZ ---");
    console.log(otuLabelsArrayZ);
    console.log("--- testing sampleValuesArrayZ ---");
    console.log(sampleValuesArrayZ);


    // CREATE SCALAR VALUES FOR BUBBLE CHART PLOT RELATIVE CIRCLE SIZE
    // ------------------------------------------------------------------

    // Set marker (circle) size with maximum relative value = 1000
    // Calculate maximum Sample Value across All Samples
    var assaysSamplesdata = samplesData.samples;
    console.log("--- testing assaysSamplesdata ---");
    console.log(assaysSamplesdata)

    var maxSampleValues = [];
    assaysSamplesdata.forEach(sampleValuesArrayX => {
      var maxSampleValueX =  Math.max(...sampleValuesArrayX['sample_values']);
      maxSampleValues.push(maxSampleValueX);
    });

    console.log("--- testing maxSampleValues Array ---");
    console.log(maxSampleValues);

    var maxValueAbsolute =  Math.max(...maxSampleValues); 

    console.log("--- Maximum Sample Value Across All Samples ---");
    console.log(maxValueAbsolute);

    // Create relative values maxing out at 1000 using the sample_values as inputs
    // relative to the absolute maximum value

    scaleValues = []
    sampleValuesArrayZ.forEach(sampleValue => {
      var sampleScaleValueX = sampleValue / maxValueAbsolute * 1000;
      scaleValues.push(sampleScaleValueX);
    });

    console.log("--- testing sampleScaleValues ---");
    console.log(scaleValues);
    

    // PREPARE BUBBLE CHART ARRAY OF COLORS AND OPACITY VALUES FOR CIRCLES
    // ------------------------------------------------------------------

    // Using a JS library called RainbowVis-JS, set the number of items using setNumberRange
    // and set the start and end colour using setSpectrum. Then you get the hex colour code 
    // with colourAt.

    var numberOfItems = individualSampleLength;
    var rainbow = new Rainbow();
    var colorArray = [];
    rainbow.setNumberRange(1, numberOfItems);
    rainbow.setSpectrum('blue', 'green');
    var s = '';
    for (var i = 1; i <= numberOfItems; i++) {
        var hexColour = rainbow.colourAt(i);
        var colorCode = s + '#' + hexColour;
        colorArray.push(colorCode);
    }
    console.log(s);
    console.log(colorArray);

    // The bubble chart required an array of values for opacity
    // instead of being able to assign a single value
    // I am fully aware that this is kind of a hack.
    opacityArray = [];    
    Object.values(sampleAscendingIDs).forEach(obj => {      
      opacityArray.push(.3);
    });

    console.log("--- testing opacityArray ---");
    console.log(opacityArray);


    // HORIZONTAL BAR CHART PLOT
    // ------------------------------------------------------------------
    var barData = [{
      type: 'bar',    
      x: ReversedSlicedSampleValues2,
      y: modifiedOtuIds2,
      orientation: 'h',
      marker: {color: 'royalblue'}
    }];

    var layout = {
      title: '<b>Belly Button Washing Frequency</b> <br>  Biota in Standard Units',
      xaxis: {autorange: true}
    };

    Plotly.newPlot('bar', barData, layout);


    // BUBBLE CHART PLOT
    // ------------------------------------------------------------------

    var trace1 = {
      // x: [1,2,3,4],
      // y: [10,11,12,13],
      x: otuIdsArrayZ,
      y: sampleValuesArrayZ,
      text: otuLabelsArrayZ,
      mode: 'markers',
      marker: {
        // color: ["#0000ff", "#0303fc", "#0606f9", "#0a0af5"],
        color: colorArray,
        opacity: opacityArray,
        // size: [40,60,80,100]
        size: scaleValues
      }
    };
  
    var bubbleData = [trace1];
    
    var layout = {
      title: '<b>Relative OTU Concentrations for Individual Subject',
      xaxis: {
        title: {
          text: '<b>Operational Taxonomic Unit (OTU) ID'
        }
      },
      yaxis: {
        title: {
          text: '<b>Standard Biota Measurement Units'
        }
      },      
      showlegend: false,
      height: 600,
      width: 1200
    };
    
    Plotly.newPlot('bubble', bubbleData, layout);

  // Curly bracket in line below ends D3 JSON function
  });
};
// END OF BUILDCHARTS FUNCTION buildCharts()
// ------------------------------------------------------------------------------------------------------


// ------------------------------------------------------------------------------------------------------// END OF BUILDGAUGE FUNCTION buildGauge()
// BEGINNING OF OPTIONCHANGED FUNCTION optionChanged()
// ------------------------------------------------------------------------------------------------------
function optionChanged(newSampleId) {
  console.log("Sample ID value changed, aka input value, captured by optionChanged() function")
  console.log(newSampleId);
  
  buildCharts(newSampleId);
  buildMetadata(newSampleId);
};
// END OF OPTIONCHANGED FUNCTION optionChanged()
// ------------------------------------------------------------------------------------------------------

init();
