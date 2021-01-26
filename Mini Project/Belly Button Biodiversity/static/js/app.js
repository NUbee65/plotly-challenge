// var url = "http://127.0.0:1:5000/samples"
var url = "/samples"

var textArray = ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9', ''];
reversedTextArray = textArray.reverse();
console.log(reversedTextArray);




function populateSelect() {

  d3.json(url).then(function(samplesData) {

    console.log(samplesData);

    var subjectIds3 = samplesData['names'];
    console.log("testing subjectIds3");
    console.log(subjectIds3);    

    var subjectIds2 = Object.values(samplesData)[0][0];
    console.log("testing subjectIds2");
    console.log(subjectIds2);
    
    var subjectIds = samplesData(p => p.names);
    console.log("testing subjectIds");
    console.log(subjectIds);

    // Iterate through each object in an array of objects
    subjectIds3.forEach((item) => {

      // Use D3 to select the table body
      var selectValue = d3.select('selDataset');

      // Append one cell for the ufo incidentcity
      selectValue.append('option').text(item);

  });
};

populateSelect();


    
    // var subjectIds = Object.values(samplesData)[1];
    
/*
    var ele = document.getElementById('selDataset');
    for (var i = 0; i < subjectIds.length; i++) {
    
      // Bind data to <select> element.
      ele.innerHTML = ele.innerHTML +
        '<option value="' + Object.values(subjectIds)[i] + '</option>';
*/
  
  
  




// Identify web element(s) on the page
selectbtn = d3.select('#selDataset');

// Add event listeners to the web elements
// selectbtn.on('change', FUNCTION_TBD);