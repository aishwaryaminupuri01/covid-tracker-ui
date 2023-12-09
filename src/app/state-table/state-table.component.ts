import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { StateData } from './state-data.model'; // Update the path

@Component({
  selector: 'app-state-table',
  templateUrl: './state-table.component.html',
  styleUrls: ['./state-table.component.css']
})
export class StateTableComponent implements OnInit {
  statesData: StateData[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
      this.dataService.getListData().subscribe(data => {
        this.statesData = data;
    });
  }
  exportToCSV() {
    const csvData = this.convertToCSV(this.statesData);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'covid_report.csv';
    link.click();
  }
  private convertToCSV(data: any[]): string {
    const propertiesToInclude = ['positiveCasesViral','negativeRegularScore', 'recovered', 'death' ];
    const csvRows = [];
    const headerRow = ['State', ...propertiesToInclude]; // Include 'State' as the first column
    csvRows.push(headerRow.join(','));  
    for (const entry of data) {
      const stateKey = Object.keys(entry)[0];
      const stateData = entry[stateKey];
      const values = propertiesToInclude.map(prop => stateData[prop]);
      const row = [stateKey, ...values]; // Include the state key in each row
      csvRows.push(row.join(','));
    }  
    return csvRows.join('\n');
  }
}
