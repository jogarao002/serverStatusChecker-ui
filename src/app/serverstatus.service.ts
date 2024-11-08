import { Injectable } from '@angular/core';
import { ServerStatus } from './serverstatus';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CronJob } from 'cron';  // Import CronJob from cron.js
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServerstatusService {

  constructor(private http: HttpClient) { }

  userid = 12345; 
  authToken = 'a';

  getData(): Observable<ServerStatus[]> {
    const headers = new HttpHeaders()
      .set('userid', this.userid.toString())
      .set('authToken', this.authToken);
  
    return this.http.get<any>('http://localhost:9010/server_details/get_all', { headers }).pipe(
      map((response: any) => response ) 
    );
  }

  // Run a task every 15 minute 
  cronJob: CronJob = new CronJob('*/15 * * * *', () => {
    //console.log('Task is running every 15 minute');
    this.getData();
  });

  ngOnInit() {
    // Start the cron job
    this.cronJob.start();
  }
}
