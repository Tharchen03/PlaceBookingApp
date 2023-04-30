import { Component } from '@angular/core';
interface expenseData{
  expenseName:string
  expenceAmout:number;
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
expenseName:string=''
expenceAmout:any;
totalExpenses:number=0;
expensesArray:expenseData[]=[
// {expenseName:'',expenceAmout:0},
// {expenseName:'',expenceAmout:0},
];
array: any;
index=0;
newArray=[];
//Total=0;

  constructor() {}

  clearInputs(){
    this.expenseName='';
    this.expenceAmout='';
  }
  addExpense(){
    this.expensesArray.push({expenseName:this.expenseName,expenceAmout: this.expenceAmout});
    //this.Total=this.Total+this.expenceAmout;
    this.addnewAmount();
    this.clearInputs();
  }
  addnewAmount(){
    this.totalExpenses=this.totalExpenses+this.expenceAmout;
  }
  // trash icon
  delete(){
    let expense = this.expensesArray[this.index]
    this.expensesArray=this.expensesArray.filter(clicked=>{
      return clicked !==expense;
    })
    //console.log(this.expensesArray)
  }
  // checkbox select option
  selector(i:number){
    this.index=i;
    this.newArray[this.index[0]]=this.expensesArray[this.index[0]]
    //console.log(this.index)
  }
}
