import { Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import { ServerStatus } from './serverstatus';
import { ServerstatusService } from './serverstatus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation:ViewEncapsulation.None
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'ServerStatusChecker';

  currentTime: string = '';

  formattedDate:string = '';

  private intervalId: any;

  serverStatus: ServerStatus[] = [];

  cols: any[]=[];

  slNo: any;
  constructor(private serverstatusService: ServerstatusService) { 
  }

  ngOnInit(): void {
    debugger
    // Fetch the server status list
    this.serverstatusService.getData().subscribe(
      (data: any) => {
        this.serverStatus = data.data; 
        if(data.data != undefined && data.data != null){
          let i = 1;
          for(let server of data.data){
            server.slNo = i++;
          }
        }
      },
      (error: any) => {
        //console.error('Error fetching data:', error);
        this.serverStatus = []; // If error occurs, set an empty array
      }
    );

    // Define columns for the table
    this.cols = [
        { field: 'slNo', header: 'S.NO' },
        { field: 'serverName', header: 'SERVER NAME' },
        { field: 'serverIpAddress', header: 'SERVER IP' },
        { field: 'serverPort', header: 'SERVER PORT' },
        { field: 'serverStatus', header: 'SERVER STATUS' }
    ];

    // Set the current time and start updating it every second
    this.updateTime();
    this.intervalId = setInterval(() => this.updateTime(), 1000);
  }


  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  updateTime(): void {
    const now = new Date();

    // Get hours, minutes, and seconds
    let hours: number = now.getHours();
    const minutes: number = now.getMinutes();
    const seconds: number = now.getSeconds();
    const ampm: string = hours >= 12 ? 'PM' : 'AM';
    
    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    // Format minutes and seconds with leading zero if necessary
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    // Get the full date in MM/DD/YYYY format
    this.formattedDate = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
    
    // Combine into a string with AM/PM
    this.currentTime = `${hours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;

  }
}
