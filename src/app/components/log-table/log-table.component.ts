import { Component, OnInit, Output } from '@angular/core';
import { AppStateService } from 'src/app/services/appState/app-state.service';
import { ModelService } from 'src/app/services/model/model.service';


@Component({
  selector: 'sfsx-log-table',
  templateUrl: './log-table.component.html',
  styleUrls: ['./log-table.component.css']
})
export class LogTableComponent implements OnInit {


  constructor(
    private serviceAppState: AppStateService,
    private serviceModel: ModelService
  ) { }

  logs:any = null
  tickerData = null;
  

  ngOnInit() {
    if(!this.tickerData){
      this.serviceModel.getAllTickers().then(res=>{
        console.log(res)
        this.tickerData = res
      })
    }
    this.serviceAppState.currentMessage.subscribe((msg)=>{
      console.log(msg)
      if(msg == 'addOrder'){
        console.log(this.serviceAppState.getLogs())
        this.logs = this.serviceAppState.getLogs()
        this.evalLogs(this.logs)
      }
      if(msg == 'initLogs'){
        console.log(this.serviceAppState.getLogs())
        this.logs = this.serviceAppState.getLogs()
        this.evalLogs(this.logs)
      }
    })
  }

  evalLogs(logs:any[]){
    logs.forEach(log=>{
      let date = (new Date(log['timeStamp']))
      // fts - formatted time stamp
      log['fts'] = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`
      
    })
    console.log(logs)
  }

}
