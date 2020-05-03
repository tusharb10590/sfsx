import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../../util/order';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(
    private httpClient: HttpClient
  ) { }

  readonly PORT = "3500"
  readonly HOST_URL = `http://localhost:${this.PORT}`
  readonly GET_TICKER = '/ticker'
  readonly GET_ORDER = '/order';
  readonly POST_ORDER = '/order';
  readonly GET_LOGS = '/logs'
  readonly GET_ORDER_ID = '/order/:id'

getAllTickers(){
  
  return this.httpClient.get(`${this.HOST_URL}${this.GET_TICKER}`).toPromise()
}

postNewOrder(order:Order){

  let bodyData = {
    "ticker":order.tickerId,
    "order":{
      "qty":order.noOfShares,
      "price":order.orderPrice,
      "side":order.orderSide,
      "name":order.traderName
    }
  }
  return this.httpClient.post(`${this.HOST_URL}${this.POST_ORDER}`,bodyData).toPromise()
}

getLogs(){
  return this.httpClient.get(`${this.HOST_URL}${this.GET_LOGS}`).toPromise()
}

}
