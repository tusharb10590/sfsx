export class Order {

  
    constructor(
      public tickerId,
      public traderName,
      public orderPrice,
      public noOfShares,
      public orderSide,
    ){}
  }