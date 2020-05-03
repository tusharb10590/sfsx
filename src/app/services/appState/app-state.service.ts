import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  constructor() { }
  private transction_log = []
  private bookDataByPrice = {};


  private messageSource = new BehaviorSubject('default');
  currentMessage = this.messageSource.asObservable();

  

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  getLogs(){
    return this.transction_log
  }

  setLog(logs:[]){
    this.transction_log = logs;
  }

  setBookDataByPrice(data:any){
      this.bookDataByPrice = data
  }

  getBookDataByPrice(){
      return this.bookDataByPrice
  }
  
}
