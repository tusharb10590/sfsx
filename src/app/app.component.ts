import { Component } from '@angular/core';
import { ModelService } from './services/model/model.service';
import { AppStateService } from './services/appState/app-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sfsx';

  constructor(
    private serviceModel: ModelService,
    private servceAppState: AppStateService
  ){
    this.serviceModel.getLogs().then(res=>{
      console.log(res)
      let logs = res['activity_log']
      this.servceAppState.setLog(logs)
      this.servceAppState.changeMessage('initLogs')
    })
  }
}
