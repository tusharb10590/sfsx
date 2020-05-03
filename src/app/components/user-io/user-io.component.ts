import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ModelService } from 'src/app/services/model/model.service';
import { AppStateService } from 'src/app/services/appState/app-state.service';

@Component({
  selector: 'sfsx-user-io',
  templateUrl: './user-io.component.html',
  styleUrls: ['./user-io.component.css']
})
export class UserIOComponent implements OnInit {

  isLoading = true;
  selectedTicker = null
  tickers: any = []
  bsStatus = false
  order: Order = new Order(1,'',null,null,'b')

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }
    // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  constructor(
    private serviceModel: ModelService,
    private serviceAppStae: AppStateService
  ) { }

  ngOnInit() {

    this.serviceModel.getAllTickers().then(res=>{
      console.log(res)
      this.tickers = res
    })
    .catch(err=>{
      console.log(err);
    })
  }


  chartData(event){
    console.log(event)
  }

  tickerValueChange($event){
    let value = $event.target.value
    console.log(value)
    if(value !== '-1'){
      this.selectedTicker = value
    }
  }

  addOrder(){
    this.order.orderSide = this.bsStatus ? 's' : 'b'
    console.log(this.order)
    this.serviceModel.postNewOrder(this.order).then(res=>{
      console.log(res);
      let logs = res['activity_log']
      this.serviceAppStae.setLog(logs)
      this.serviceAppStae.changeMessage('addOrder')
      this.bsStatus = false
  this.order = new Order(1,'',null,null,'b')

    })
    .catch(err=>{
      console.log(err);
    })

    
  }
}

class Order {

  
  constructor(
    public tickerId,
    public traderName,
    public orderPrice,
    public noOfShares,
    public orderSide,
  ){}
}
