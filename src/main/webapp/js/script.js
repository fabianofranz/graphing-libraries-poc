opts = {
  axesDefaults: { tickOptions: { formatString: '%.0f',  mark: "inside" } },
  axes: {
    xaxis:  {
        tickInterval: "5 seconds",
        min: '2010-01-01 00:00:00',
        max: '2010-01-01 00:00:00',
        renderer: $.jqplot.DateAxisRenderer,
        rendererOptions: { tickRenderer: $.jqplot.CanvasAxisTickRenderer },
        tickOptions: { formatString: "%H:%M:%S", angle: -90, fontSize: '7pt' }
      },
    yaxis:  {
        min: 0,
        max: 100,
        numberTicks: 6,
        tickOptions: { }
      }
  },
  seriesDefaults: { trendline: { show: false }, shadow: false },
  series: [ { markerOptions: { show: false }, fill: true, fillAndStroke: true, fillColor: "#e6f2fa" } ],
  grid: { shadow: false, gridLineColor: "#eee", borderColor: "#ddd" }
}

start = function() {

  var now = new Date();
  var maxDate = now.setSeconds(Math.floor(now.getSeconds() / 5) * 5);
  var minDate = maxDate - (60 * 1000);

  opts.axes.xaxis.min = minDate;
  opts.axes.xaxis.max = maxDate;

  chart1 = $.jqplot('chart1', [[maxDate, 0]], opts);

  window.setInterval(ticker, 1000);
  window.setInterval(collector, 500);
}

ticker = function() {

  var now = new Date();
  var endDate = new Date(opts.axes.xaxis.max - 5000);

  if (now >= endDate) {
    if (chart1.series[0].data.length > 0) {
      var cmpDate = new Date(opts.axes.xaxis.min);
      var doBreak = false;
      do {
        var testDate = new Date(chart1.series[0].data[0][0]);
        if (testDate < cmpDate) {
          chart1.series[0].data.shift();
        } else {
          doBreak = true;
        }
      }
      while ((chart1.series[0].data.length > 0) & !(doBreak));
    }

    opts.axes.xaxis.min += 5000;
    opts.axes.xaxis.max += 5000;
  
    chart1.axes.xaxis.min = opts.axes.xaxis.min;
    chart1.axes.xaxis.max = opts.axes.xaxis.max;

    chart1.replot();
  }
}

collector = function() {
  chart1.series[0].data.push([new Date(), Math.floor(Math.random() * 100)]);
  chart1.replot();
}

$.fn.sparkline.defaults.common.lineColor = "#81BCE6";
$.fn.sparkline.defaults.common.fillColor = "#e6f2fa";
$.fn.sparkline.defaults.common.barColor = "#81BCE6";
$.fn.sparkline.defaults.common.width = "70px";
$.fn.sparkline.defaults.common.height = "30px";

var s1 = [];
var s2 = [];

for (i = 1990; i <= 2012; i++) {
  s1.push([i, Math.random() * 1000]);
  s2.push([i, Math.random() * 1000]);
}

$(document).ready(function() {

	start();

	$("#sparkline1").sparkline("html", { type: "line" }); 
	$("#sparkline2").sparkline("html", { type: "line" }); 
	$("#sparkline3").sparkline("html", { type: "line" }); 
	$("#sparkline4").sparkline("html", { type: "bar", barColor: "#81BCE6" }); 
	$("#sparkline5").sparkline("html", { type: "bar", barColor: "#81BCE6" }); 
  $("#sparkline6").sparkline("html", { type: "bar", barColor: "#81BCE6" }); 
	$("#sparkline7").sparkline("html", { type: "pie", sliceColors: ['#cc6666', "#81BCE6"], height: "28px", width: "34px" }); 
  $("#sparkline8").sparkline("html", { type: "pie", sliceColors: ['#cc6666', "#81BCE6"], height: "28px", width: "34px" }); 
  $("#sparkline9").sparkline("html", { type: "pie", sliceColors: ['#cc6666', "#81BCE6"], height: "28px", width: "34px" }); 

   chart3 = $.jqplot('chart3', [[0]], {
   	  grid: { background: "transparent" },
       seriesDefaults: {
           renderer: $.jqplot.MeterGaugeRenderer,
           rendererOptions: {
               intervals: [2,3,4],
               intervalColors: ['#cc6666', '#E7E658', '#66cc66']
           }
       }
   });

  window.setInterval(function() {
    //alert(chart3.series[0].data[0][0]);
    chart3.series[0].data[0][0] = chart3.series[0].data[0][0] > 4.0 ? 0.0 : parseFloat(chart3.series[0].data[0][0]) + 0.1;
    chart3.series[0].data[0][1] = chart3.series[0].data[0][1] > 4.0 ? 0.0 : parseFloat(chart3.series[0].data[0][1]) + 0.1;
    chart3.replot();
  }, 200);

  plot1 = $.jqplot("chart2", [s2, s1], {
      // Turns on animatino for all series in this plot.
      animate: true,
      // Will animate plot on calls to plot1.replot({resetAxes:true})
      animateReplot: true,
      cursor: {
          show: true,
          zoom: true,
          looseZoom: true,
          showTooltip: false
      },
      seriesColors: [ "#81BCE6", "#FF7575" ],
      series:[
          {
            shadow: false,
              pointLabels: {
                  show: true
              },
              renderer: $.jqplot.BarRenderer,
              showHighlight: false,
              yaxis: 'y2axis',
              rendererOptions: {
                  animation: {
                      speed: 2500
                  },
                  barWidth: 15,
                  barPadding: -15,
                  barMargin: 0,
                  highlightMouseOver: false
              }
          },
          {
            fill: true, fillAndStroke: true, fillColor: "#e6f2fa", fillAlpha: 0.5,
            markerOptions: { show: true, size: 6, shadow: false },
            shadow: false,
              rendererOptions: {
                  animation: {
                      speed: 2000
                  }
              }
          }
      ],
      axesDefaults: {
          pad: 0
      },
      axes: {
          // These options will set up the x axis like a category axis.
          xaxis: {
              tickInterval: 1,
              drawMajorGridlines: false,
              drawMinorGridlines: true,
              drawMajorTickMarks: false,
              rendererOptions: {
              tickInset: 0.5,
              minorTicks: 1
          }
          },
          yaxis: {
            showTicks: false,
              tickOptions: {
                  formatString: "$%'d"
              },
              rendererOptions: {
                  forceTickAt0: true
              }
          },
          y2axis: {
            showTicks: false,
              tickOptions: {
                  formatString: "$%'d"
              },
              rendererOptions: {
                  // align the ticks on the y2 axis with the y axis.
                  alignTicks: true,
                  forceTickAt0: true
              }
          }
      },
      highlighter: {
          show: true,
          showLabel: true,
          tooltipAxes: 'y',
          sizeAdjust: 7.5 , tooltipLocation : 'ne'
      },
      grid: { shadow: false, gridLineColor: "#eee", borderColor: "#ddd" }

  });

  $("#chart4").barGraph();

});

     

/**
 * --------------------------------------------------------------------
 * jQuery-Plugin "barGraph"
 * by Siddharth S aka Tony Sundharam, lordtottuu@gmail.com
 * for Net Tuts, www.net.tutsplus.com

 * Copyright (c) 2009 Siddharth
 * Dual licensed under MIT and GPL
 * Usage Notes: Please refer to the Net Tuts article
 * Version: 1.0, 08.06.2009   
 * --------------------------------------------------------------------
**/

(function($){
  $.fn.barGraph = function(settings) {
  
  // Option variables
  var defaults = {  
        barOpacity : 0.8,
       barSpacing: 20,
       barWidth: 20, 
       cvHeight: 220,
       numYlabels: 8,
       xOffset: 20,
       labelColour: "#777", 
       disableGrid: false, 
       hideDataSource: true,
       scale: false,
       showValue: true, 
       showOutline: true,
       theme: "Ocean",
           };  
       
  // Merge the passed parameters with the defaults     
    var option = $.extend(defaults, settings);  
  
  // Cycle through each passed object
  this.each(function() { 
             
  // Canvas Variables
    var cv, ctx;
   
  // Graph variables
  var gValues = [];
  var xLabels = [];
  var yLabels = [];
  var maxVal, minVal, gWidth, gHeight, gTheme;
  var dataSource = $(this).attr("id");
   
  // Themes
  var thPink = ['#FFCCCC','#FFCCCC','#FFC0C0','#FFB5B5','#FFADAD','#FFA4A4','#FF9A9A','#FF8989','#FF6D6D'];
  var thBlue = ['#ACE0FF','#9CDAFF','#90D6FF','#86D2FF','#7FCFFF','#79CDFF','#72CAFF','#6CC8FF','#57C0FF'];
  var thGreen = ['#D1FFA6','#C6FF91','#C0FF86','#BCFF7D','#B6FF72','#B2FF6B','#AAFE5D','#A5FF51','#9FFF46'];
  var thAssorted = ['#FF93C2','#FF93F6','#E193FF','#B893FF','#93A0FF','#93D7FF','#93F6FF','#ABFF93','#FF9B93'];
  
  grabValues();
  initCanvas();
  minmaxValues(gValues);
  shadeGraphArea();
  drawXlabels();
    drawYlabels();
  if(!option.disableGrid) { drawGrid(); }
  if(option.showValue) { drawValue(); }
  drawGraph();
     
  function grabValues ()
   {
    // Access the required table cell, extract and add its value to the values array.
     // $("tr").children("td:odd").each(function(){
     // $("#"+dataSource).find("td:odd").each(function(){
     // $("#"+dataSource+" tr td:odd").each(function(){
     $("#"+dataSource+" tr td:nth-child(2)").each(function(){
     gValues.push($(this).text());
     });
   
     // Access the required table cell, extract and add its value to the xLabels array.
     $("#"+dataSource+" tr td:nth-child(1)").each(function(){
    xLabels.push($(this).text());
     });
     
    switch(option.theme)
    {
      case 'Ocean':
      gTheme = thBlue;
      break;
      case 'Foliage':
      gTheme = thGreen;
      break;
      case 'Cherry Blossom':
      gTheme = thPink;
      break;
      case 'Spectrum':
      gTheme = thAssorted;
      break;
    } 
   } 
  
  function initCanvas ()
   {
     $("#"+dataSource).after("<canvas id=\"bargraph-"+dataSource+"\" class=\"barGraph\"> </canvas> <br />");
     
    // Try to access the canvas element 
      cv = $("#bargraph-"+dataSource).get(0);
    cv.width=gValues.length*(option.barSpacing+option.barWidth)+option.xOffset+option.barSpacing;
    cv.height=option.cvHeight;
    gWidth=cv.width;
    gHeight=option.cvHeight-20;
   
    if (!cv.getContext) 
    { return; }
   
      // Try to get a 2D context for the canvas and throw an error if unable to
      ctx = cv.getContext('2d');
    if (!ctx) 
    { return; }
   }
     
    function drawGraph ()
   {
      for(index=0; index<gValues.length; index++)
        {
        ctx.save();
      if (option.showOutline)
      {
      ctx.fillStyle = "#777";
      ctx.strokeRect( x(index), y(gValues[index]), width(), height(gValues[index]));  
      }
      ctx.fillStyle = gTheme[getColour(index)];
        ctx.globalAlpha = option.barOpacity;
          ctx.fillRect( x(index), y(gValues[index]), width(), height(gValues[index]));  
      ctx.fillStyle = "#777";
      ctx.fillRect( option.xOffset, gHeight, gWidth, 1); 
        ctx.restore();
        }
   }
    
  function drawValue ()
      {
      for(index=0; index<gValues.length; index++)
        {
          ctx.save();
        ctx.fillStyle= "#777";
        ctx.font = "10px 'arial'";
        var valAsString = gValues[index].toString();
          var valX = (option.barWidth/2)-(valAsString.length*3);
          ctx.fillText(gValues[index], x(index)+valX,  y(gValues[index])-4);
        ctx.restore();
      }
      } 
    
  function shadeGraphArea ()
      {
      ctx.fillStyle = "#fff";
      ctx.fillRect(option.xOffset, 0, gWidth-option.xOffset, gHeight); 
      }
    
  function drawGrid ()
      {
      for(index=0; index<option.numYlabels; index++)
        {
       ctx.fillStyle = "#ddd";
       ctx.fillRect( option.xOffset, y(yLabels[index])+3, gWidth, 1);
      }
      }  
    
  function drawYlabels()
      {
     ctx.save(); 
       for(index=0; index<option.numYlabels; index++)
        {
        if (!option.scale)
        {
           yLabels.push(Math.round(maxVal/option.numYlabels*(index+1)));
        }
        else
        {
          var val= minVal+Math.ceil(((maxVal-minVal)/option.numYlabels)*(index+1));
            yLabels.push(Math.ceil(val));  
        }
       ctx.fillStyle = option.labelColour;
       var valAsString = yLabels[index].toString();
       var lblX = option.xOffset - (valAsString.length*7);
       ctx.fillText(yLabels[index], lblX, y(yLabels[index])+10);
        }
       if (!option.scale)
       {
            ctx.fillText("0", option.xOffset -7, gHeight+7);
       }
      else
      {
        var valAsString = minVal.toString();
        var lblX = option.xOffset - (valAsString.length*7);
        ctx.fillText(minVal, lblX, gHeight+7);  
      }
      ctx.restore();
      }  

  function drawXlabels ()
      {
     ctx.save();
     ctx.font = "10px 'arial'";
     ctx.fillStyle = option.labelColour;
     for(index=0; index<gValues.length; index++)
       {
     ctx.fillText(xLabels[index], x(index), gHeight+17);
     }
     ctx.restore();
      }
   
  function width ()
      {
     return option.barWidth;
      }
   
  function height (param)
      {
     return scale(param);
      }
   
  function x (param)
      {
     return (param*option.barWidth)+((param+1)*option.barSpacing)+option.xOffset;
      }
   
  function y (param)
      {
     return gHeight - scale (param) ;
      }
    
  function scale (param)
      {
     return ((option.scale) ? Math.round(((param-minVal)/(maxVal-minVal))*gHeight) : Math.round((param/maxVal)*gHeight));
      }
   
  function minmaxValues (arr)
     {
    maxVal=0;
    
      for(i=0; i<arr.length; i++)
      {
     if (maxVal<parseInt(arr[i]))
     {
     maxVal=parseInt(arr[i]);
       } 
      }
    minVal=maxVal;
    for(i=0; i<arr.length; i++)
      {
     if (minVal>parseInt(arr[i]))
     {
     minVal=parseInt(arr[i]);
       }  
    }
     maxVal*= 1.1;
       minVal = minVal - Math.round((maxVal/10));
   }
   
  function getColour (param)
      {
         return Math.ceil(Math.abs(((gValues.length/2) -param)));
    }
    
  if (option.hideDataSource) { $("#"+dataSource).remove();}
  
  });
              
  // returns the jQuery object to allow for chainability.
  return this;
  }
  
})(jQuery);


















