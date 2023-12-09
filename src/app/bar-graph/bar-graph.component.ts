import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { StateData } from '../state-table/state-data.model'; // Update the path
import { Chart } from 'chart.js/auto'; // Use this import

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.css']
})
export class BarGraphComponent implements OnInit {
  barChartData: StateData[] = [];
  tooltipVisible = false;
  tooltipData = '';
  chart: Chart | undefined;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
      this.dataService.getListData().subscribe(data => {
        this.barChartData = data;
        this.createStackedBarChart();
    });
  }
  createStackedBarChart(): void {
    const ctx = document.getElementById('covidBarChart') as HTMLCanvasElement;
    ctx.height = 400; // Set the desired height
    ctx.width = 400;  // Set the desired width
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.barChartData.map(data => Object.keys(data)[0]),
        datasets: [
          {
            label: 'Positive Cases',
            backgroundColor: '#FF0000',
            data: this.barChartData.map(data => data[Object.keys(data)[0]].positiveCasesViral)
          },
          {
            label: 'Recovered',
            backgroundColor: '#2ecc71',
            data: this.barChartData.map(data => data[Object.keys(data)[0]].recovered)
          },
          {
            label: 'Deaths',
            backgroundColor: '#454545',
            data: this.barChartData.map(data => data[Object.keys(data)[0]].death)
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: { stacked: true },
          y: { stacked: true,
              ticks: {
                display: false  // Hide y-axis labels
              }
           }
        },
        plugins: {
          title: { display: true, text: 'Covid Bar Graph' }
        }
      }
    });
  }
}
