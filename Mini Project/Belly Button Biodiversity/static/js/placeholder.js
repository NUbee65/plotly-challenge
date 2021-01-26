
  /*
  // Create XMLHttpRequest object, with GET method.
  var xhr = new XMLHttpRequest(), 
      method = 'GET',
      overrideMimeType = 'application/json',
      url = '../../library/sample.json';  // Add the file URL.

xhr.onreadystatechange = function () {
  if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {

    // Parse JSON data.
    var birds = JSON.parse(xhr.responseText);

    var ele = document.getElementById('sel');
    for (var i = 0; i < birds.length; i++) {
    
      // Bind data to <select> element.
      ele.innerHTML = ele.innerHTML +
        '<option value="' + birds[i].ID + '">' + birds[i].Name + '</option>';
    }
  }
};
xhr.open(method, url, true);
xhr.send();
}


/*/ 


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

  // Beginning Gauge Chart
  // Enter a frequency between 0 and 9
  var level = 2;

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
    width: 1200
  };
  
  Plotly.newPlot('bubble', bubbleData, layout);
  // End Bubble Chart  

};


init();
*/