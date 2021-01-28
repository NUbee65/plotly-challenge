


/*
//Beginning Horizontal Bar
var barData = [{
  type: 'bar',
  x: [20, 14, 23],
  y: ['giraffes', 'orangutans', 'monkeys'],
  orientation: 'h'
}];
  
Plotly.newPlot('bar', barData);
// End Horizontal Bar

// Beginning Gauge Chart
var washData = [{
    domain: { x: [0, 1], y: [0, 1] },
    value: 270,
    title: { text: "Washes Per Week" },
    type: "indicator",
    mode: "gauge+number"
}];

var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
Plotly.newPlot('gauge', washData, layout);
// End Guage Chart

// Beginning Bubble Chart
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
  width: 150
};

Plotly.newPlot('bubble', bubbleData, layout);
// End Bubble Chart
*/

/*

function init() {
  // Grab a reference to the dropdown select element
  // var dataset = selDataset.property("value");

  // Use the list of sample names to populate the select options
  d3.json(url).then((samplesData) => {
    
    console.log(samplesData);
    console.log(samplesData.metadata)
    console.log(samplesData.names)
    console.log(samplesData.samples)
    console.log(samplesData.samples[0])

  })    
  // Use the first sample from the list to build the initial plots
  

  // Beginning Horizontal Bar
  var barData = [{
    type: 'bar',    
    x: [24, 22, 21, 18, 17, 15, 12, 11, 9, 7],
    y: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
    orientation: 'h'
  }];
  
  Plotly.newPlot('bar', barData);
  // End Horizontal Bar



  // Beginning Bubble Chart
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
  // End Bubble Chart  

};


init();
*/