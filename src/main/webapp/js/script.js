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

$(document).ready(function() {

	start();

	$("#sparkline1").sparkline("html", { type: "line" }); 
	$("#sparkline2").sparkline("html", { type: "line" }); 
	$("#sparkline3").sparkline("html", { type: "line" }); 
	$("#sparkline4").sparkline("html", { type: "bar", barColor: "#81BCE6" }); 
	$("#sparkline5").sparkline("html", { type: "bar", barColor: "#81BCE6" }); 
	$("#sparkline6").sparkline("html", { type: "pie", sliceColors: ['#cc6666', "#81BCE6"], height: "28px", width: "34px" }); 

   chart3 = $.jqplot('chart3', [[1]], {
   	  grid: { background: "transparent" },
       seriesDefaults: {
           renderer: $.jqplot.MeterGaugeRenderer,
           rendererOptions: {
               intervals: [2,3,4],
               intervalColors: ['#cc6666', '#E7E658', '#66cc66']
           }
       }
   });

});

    var s1 = [];
    var s2 = [];
 
 	for (i = 1990; i <= 2012; i++) {
 		s1.push([i, Math.random() * 1000]);
 		s2.push([i, Math.random() * 1000]);
 	}

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
   
























