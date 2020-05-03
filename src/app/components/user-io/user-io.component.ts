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
  tickerBookData = null

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['100','110','150','160'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [85,70], label: 'Buy' },
    { data: [0,0,100,110], label: 'Sell' }
    
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
    console.log(event.active)
    console.log(event.active[0]._index)
    let index = event.active[0]._index
    let price = this.barChartLabels[index]
    let buyQty =  this.barChartData[0]['data'][index]
    let sellQty = this.barChartData[1]['data'][index]
    let side = buyQty == 0 ? 's' : 'b'
    let qty 
    console.log("P","B V", "S V");
    console.log(price,buyQty,sellQty , side);
    let bookData = {
      price: price,
      side:side
    }
    if(side == 's'){
      bookData['qty'] = sellQty
      bookData['data'] = this.tickerBookData['sell_book']
    }
    else{
      bookData['qty'] = buyQty
      bookData['data'] = this.tickerBookData['buy_book']

    }
    this.serviceAppStae.setBookDataByPrice(bookData)
    this.serviceAppStae.changeMessage('showBookData')
   
  }

  tickerValueChange($event){
    let value = $event.target.value
    console.log(value)
    if(value !== '-1'){
      this.selectedTicker = value
      this.getTickerBookData(this.selectedTicker)
      this.serviceAppStae.changeMessage('showBookDataInactive')
      
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
      this.getTickerBookData(this.order.tickerId);
  this.order = new Order(1,'',null,null,'b')

    })
    .catch(err=>{
      console.log(err);
    })

    
  }

  getTickerBookData(id){
    this.serviceModel.getBookDataId(id).then(res=>{
      console.log(res);
      this.tickerBookData = res;
      let result = this.aggreagteBookData()
      console.log(result)
      this.barChartLabels = result['labels']
      this.barChartData[0]['data'] = result['bData'];
      this.barChartData[1]['data'] = result['sData'];
      console.log(this.barChartData)

    })
  }

  aggreagteBookData(){
    let sellPrices = {} ;
    let buyPrices = {} ;
    if(this.tickerBookData){
      this.tickerBookData['buy_book'].forEach(item=>{
        // console.log(item)
        buyPrices[item['price']] = item['quantity'] + (buyPrices[item['price']] || 0)
      })
  
      this.tickerBookData['sell_book'].forEach(item=>{
        sellPrices[item['price']] = item['quantity'] + (sellPrices[item['price']] || 0)
      })

    }
    
    let buyData = []
    let sellData = []
    let labels = []
    for(let k in buyPrices){
      labels.push(k)
      buyData.push(buyPrices[k])
      sellData.push(0)
    }

    for(let k in sellPrices){
      labels.push(k)
      sellData.push(sellPrices[k])
      buyData.push(0)
    }
    
    console.log(buyPrices, sellPrices)
    return {labels:labels,bData:buyData,sData:sellData}
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
