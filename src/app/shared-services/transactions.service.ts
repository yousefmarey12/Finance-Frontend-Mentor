import { inject, Injectable } from "@angular/core";
import { Dropdown } from "../shared-interfaces/dropdown.interface";
import { Transaction } from "../components/pages/home/transactions/transactions.component";
import { DateService } from "./date.service";

@Injectable({providedIn: 'root'})
export class TransactionsService {
       dateService = inject(DateService)
    private func(arr: Transaction[], str: string) {
        if (str != 'All') {
            return arr.filter(el =>  {
                return el.category?.includes(str)
        })
        }
        else {
            return arr
        }
    }
    
     _transactions: Transaction[] = [
        {isCredit: false, person: "Bravo Zen Spa", amount: "25.00", date: "29 Aug 2024", category: 'Personal Care'},
        {isCredit: true, person: "Alpha Analytics", amount: "450.00", date: "27 Aug 2024", category: 'General'},
        {isCredit: false, person: "Echo Game Store", amount: "21.50", date: "22 Aug 2024", category: 'Lifestyle'},
        {isCredit: false, person: "Food Merchant", amount: "21.50", date: "20 Aug 2024", category: 'General'},
        {isCredit: false, person: "Delta Taxi", amount: "15.00", date: "19 Aug 2024", category: "Transportation"},
        {isCredit: false, person: "Online Shop", amount: "15.00", date: "15 Aug 2024", category: "General"},
        {isCredit: false, person: "Bravo Zen Spa", amount: "25.00", date: "13 Aug 2024", category: "Personal Care"},
        {isCredit: false, person: "Liam Hughes", amount: "10.00", date: "5 Aug 2024", category: "General"},
        {isCredit: true, person: "Alpha Analytics", amount: "1900.00", date: "3 Aug 2024", category: "General"},
        {isCredit: false, person: "Charlie Electronic Co...", amount: "100.00", date: "1 Aug 2024", category: "Bills"},
      ]

    private dropdownValuesCategory: Dropdown[] = [
        {title: 'All', code: '', alreadyUsed: false, fn: this.func},
        {title: 'Entertainment', code: '', alreadyUsed: false, fn: this.func},
        {title: 'Bills', code: '', alreadyUsed: false, fn: this.func},
        {title: 'Groceries', code: '', alreadyUsed: false, fn: this.func},
        {title: 'Dining Out', code: '', alreadyUsed: false, fn: this.func},
        {title: 'Transportation', code: '', alreadyUsed: false, fn: this.func},
        {title: 'Personal Care', code: '', alreadyUsed: false, fn: this.func},
        {title: 'Education', code: '', alreadyUsed: false, fn: this.func},
        {title: 'Lifestyle', code: '', alreadyUsed: false, fn: this.func},
        {title: 'Shopping', code: '', alreadyUsed: false, fn: this.func},
        {title: 'General', code: '', alreadyUsed: false, fn: this.func},
       
      ]
      private _dropdownValuesSort: Dropdown[] = [
        {title: 'Latest', code: '', alreadyUsed: false, 
          fn: arr => {
          arr.sort((a: any, b: any) => {
            let [[, dayA, monthA, yearA]] = a.date.matchAll(/(\d+) (\w+) ([0-9]{4})/g)
            monthA = monthA.toLowerCase()
            let [[, dayB, monthB, yearB]] = b.date.matchAll(/(\d+) (\w+) ([0-9]{4})/g)       
            monthB = monthB.toLowerCase()
           
            let dateA = new Date(+yearA, this.dateService.getDateMap().get(monthA.toString()), +dayA)
            let dateB = new Date(+yearB, this.dateService.getDateMap().get(monthB.toString()), +dayB)
            if (dateA < dateB) {
              return 1
            }
            else if (dateA > dateB) {
              return -1
            }
    
            return 0
          })
          return arr
        }},
        {title: 'Oldest', code: '', alreadyUsed: false, 
          fn: arr => {
            arr.sort((a: any, b: any) => {
              let [[, dayA, monthA, yearA]] = a.date.matchAll(/(\d+) (\w+) ([0-9]{4})/g)
              monthA = monthA.toLowerCase()
              let [[, dayB, monthB, yearB]] = b.date.matchAll(/(\d+) (\w+) ([0-9]{4})/g)    
              monthB = monthB.toLowerCase()
    
              let dateA = new Date(+yearA, this.dateService.getDateMap().get(monthA.toString()), +dayA)
              let dateB = new Date(+yearB, this.dateService.getDateMap().get(monthB.toString()), +dayB)
              if (dateA > dateB) {
                return 1
              }
              else if (dateA < dateB) {
                return -1
              }
      
              return 0
            })
            return arr
          }
        },
        {title: 'A to Z', code: '', alreadyUsed: false, 
          fn: arr => {
            arr.sort((a: any, b: any) => {
              let strA = a.person.toUpperCase()
              let strB = b.person.toUpperCase()
              if (strA > strB) {
                return 1
              }
              else if (strA < strB) {
                return -1
              }
      
              return 0
            })
            return arr
          }
          
        },
        {title: 'Z to A', code: '', alreadyUsed: false,  
            fn: arr => {
          arr.sort((a: any, b: any) => {
            let strA = a.person.toUpperCase()
            let strB = b.person.toUpperCase()
            if (strA < strB) {
              return 1
            }
            else if (strA > strB) {
              return -1
            }
    
            return 0
          })
          return arr
        }},
        {title: 'Highest', code: '', alreadyUsed: false, 
           fn: arr => {
          arr.sort((a: any, b: any) => {
    
            if (+a.amount < +b.amount) {
              return 1
            }
            else if (+a.amount > +b.amount) {
              return -1
            }
    
            return 0
          })
          return arr
        }},
        {title: 'Lowest', code: '', alreadyUsed: false,
          fn: arr => {
            arr.sort((a: any, b: any) => {
      
              if (+a.amount > +b.amount) {
                return 1
              }
              else if (+a.amount < +b.amount) {
                return -1
              }
      
              return 0
            })
            return arr
          }
         },
      ]
      getCategories() {
        return this.dropdownValuesCategory
      }
      getSorting() {
        return this._dropdownValuesSort
      }
      getTransactions() {
        return this._transactions
      }
}