import { Component, OnInit, Output } from '@angular/core';
import { AppStateService } from 'src/app/services/appState/app-state.service';
import { ModelService } from 'src/app/services/model/model.service';

@Component({
  selector: 'sfsx-book-trades',
  templateUrl: './book-trades.component.html',
  styleUrls: ['./book-trades.component.css']
})
export class BookTradesComponent implements OnInit {


  constructor(
    private serviceAppState: AppStateService,
    private serviceModel: ModelService
  ) { }

  sideLabel = ''
  price = 0
  orders = []
  isActive = false

  ngOnInit() {

    this.serviceAppState.currentMessage.subscribe((msg)=>{
      console.log(msg)
      if(msg == 'showBookData'){
        this.isActive =true
        let bookData = this.serviceAppState.getBookDataByPrice()
        console.log(bookData)
        this.price = parseFloat(bookData['price'])
        this.sideLabel = bookData['side'] == 'b' ? 'Buy' : 'Sell'
        this.orders = bookData['data'].filter(data=> data.price == this.price)
        this.evalLogs(this.orders)
        console.log(this.orders)
      }
      if(msg == 'showBookDataInactive'){
        this.isActive = false
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
