// import "csv-parser";
// import "chart.js";
// import "utils/file-utils.js";

document.addEventListener("DOMContentLoaded", function(event) {
  var element = document.createElement("h1");
  element.innerHTML = "Hello World";
  document.body.appendChild(element);

  var canvas = document.createElement("canvas");
  document.body.appendChild(canvas);

  /*
  var context = canvas.getContext('2d');

  var data = {
    labels: [Locale.get('underWork'), Locale.get('waitingClient'), Locale.get('approved'), Locale.get('rejected'), Locale.get('blocked'), Locale.get('waitingReinspection'), Locale.get('finished')],
    datasets: [{
      data: [0, 0, 0, 0, 0, 0, 0],
      backgroundColor: [
        'rgba(0, 153, 0, 0.2)',
        'rgba(204, 102, 0, 0.2)',
        'rgba(204, 0, 153, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(102, 102, 153, 0.2)',
        'rgba(75, 192, 192, 0.2)'
      ],
      borderColor: [
        'rgba(0, 153, 0,1)',
        'rgba(204, 102, 0, 1)',
        'rgba(204, 0, 153, 1)',
        'rgba(255,99,132,1)',
        'rgba(255, 206, 86, 1)',
        'rgba(102, 102, 153, 1)',
        'rgba(75, 192, 192, 1)'
      ]
    }]
  };

  var chart = new Chart(this.context, {
    type: 'doughnut',
    data: this.data,
    options: this.options
  });
  */
  var data = FileUtils.readFile("https://raw.githubusercontent.com/dssg-pt/covid19pt-data/master/data.csv", true);
  console.log(data);
});

