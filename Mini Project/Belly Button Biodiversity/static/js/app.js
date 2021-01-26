// var url = "http://127.0.0:1:5000/samples"
var url = "/samples"

var textArray = ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9', ''];
reversedTextArray = textArray.reverse();
console.log(reversedTextArray);




function populateSelect() {

  // Use D3 to capture the JSON data from the URL
  // which yields a nested object of arrays of objects
  // We also checked the data directly in Chrome with JSON viewer extension
  d3.json(url).then(function(samplesData) {

    // Print / test the entire dataset to the console
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




d3.json(url).then(function(samplesData) {


  var selectElement = document.getElementById("selDataset");
  var selectRefinedElement = selectElement.getElementsByClassName("option");
  var selectValue = selectRefinedElement.text;

  // var selectElement = d3.select('#selDataset>option');
  // var selectValue = selectElement.property('value');
  console.log("--- testing selectValue ---");
  console.log(`selectValue = ${selectValue}`);

  var samplesMetadata = samplesData.metadata
  var individualMetadata = samplesMetadata.filter(obj => obj.id == 940);
  var individualWfreq = individualMetadata.wfreq
  console.log("--- testing individualMetadata ---");
  console.log(individualMetadata);
  console.log("--- testing individualWfreq ---");
  console.log(individualWfreq);

  var assaysSamplesdata = samplesData.samples
  var individualSampledata = assaysSamplesdata.filter(obj => obj.id == 940);
  console.log("--- testing individualSampledata ---");
  console.log(individualSampledata);  


  const data = {
    5: ['3','1','2'],
    8: ['E','F','D']
   }
   
   let dataSort = Object.keys(data).reduce((acc, item) => {
     acc[item] = data[item].sort()  
     return acc
   }, {})
   
   console.log(dataSort)

});



  
  
  



































// Identify web element(s) on the page
// selectbtn = d3.select('#selDataset');

// Add event listeners to the web elements
// selectbtn.on('change', FUNCTION_TBD);
