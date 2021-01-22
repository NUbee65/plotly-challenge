// var url = "http://127.0.0:1:5000/samples"
var url = "/samples"

d3.json(url).then((samplesData) => {
  console.log(samplesData)



/*
function init() {
  // Grab a reference to the dropdown select element
  $("#spinner").spinner();

  // d3.selectAll()



  // Use the list of sample names to populate the select options
  d3.json(url).then((samplesData) => {
    console.log(samplesData)
  }

    
    // your-code-here

    // Use the first sample from the list to build the initial plots




  function buildChart() {
      d3.json(url).then(function(data))
    }


    var data = [{
  type: 'bar',
  x: [20, 14, 23],
  y: ['giraffes', 'orangutans', 'monkeys'],
  orientation: 'h'
}];



  });
}

/*
   Hints: Create additional functions to build the charts,
          build the gauge chart, set up the metadata,
          and handle the event listeners

   Recommended function names:
    optionChanged() 
    
    

Plotly.newPlot('myDiv', data);

    buildGauge()
    
    buildMetadata()
*/

// Initialize the dashboard
// init();
