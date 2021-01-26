// var url = "http://127.0.0:1:5000/samples"
var url = "/samples"

var textArray = ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9', ''];
reversedTextArray = textArray.reverse();
console.log(reversedTextArray);




function populateSelect() {

  d3.json(url).then(function(samplesData) {

    console.log(samplesData);

    var subjectIds2 = Object.values(samplesData)[0][0];
    console.log("testing subjectIds2");
    console.log(subjectIds2);
    
    var subjectIds = samplesData(p => p.names);
    console.log("testing subjectIds");
    console.log(subjectIds);

  });
};



    
    // var subjectIds = Object.values(samplesData)[1];
    
/*
    var ele = document.getElementById('selDataset');
    for (var i = 0; i < subjectIds.length; i++) {
    
      // Bind data to <select> element.
      ele.innerHTML = ele.innerHTML +
        '<option value="' + Object.values(subjectIds)[i] + '</option>';
*/
  
  
  

populateSelect();
