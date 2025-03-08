import { Component, computed, inject, OnInit } from '@angular/core';
import { DisplayMoney } from '../../../shared-pipes/display-number.pipe';
import { InputFieldComponent } from '../../util-components/input-field/input-field.component';
import { RecurringBillComponent } from './recurring-bill/recurring-bill.component';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { MediaQueryService } from '../../../shared-services/media-query.service';
import { DropdownComponent } from '../../util-components/dropdown/dropdown.component';
import { Dropdown } from '../../../shared-interfaces/dropdown.interface';
import { IconDropdownComponent } from '../../util-components/icon-dropdown/icon-dropdown.component';
interface RecurringBill {
  amount: string,
  title: string,
  day: string,
  isPaid: boolean
}
@Component({
  selector: 'app-bills-page',
  standalone: true,
  imports: [DisplayMoney, InputFieldComponent, RecurringBillComponent, CommonModule, DropdownComponent, IconDropdownComponent],
  templateUrl: './bills-page.component.html',
  styleUrl: './bills-page.component.css'
})
export class BillsPageComponent implements OnInit {
  #mediaQueryService = inject(MediaQueryService)
    isMobile = toSignal(this.#mediaQueryService.mediaQuery('max', 'md'));
    isDesktop = toSignal(this.#mediaQueryService.mediaQuery('min', 'lg'));
    isTablet  = computed(() => (!this.isMobile() && !this.isDesktop()))
  private _bills: RecurringBill[] = []
  totalPaid: string = ''
  totalDue: string = ''
  numberOfPaid: string = ''
  numberOfDue: string = ''
  
  ngOnInit(): void {
    this._bills = this.bills
    let amount = 0;
    let num = 0
    this.bills.forEach((bill) => {
      if (!bill.isPaid) {
        num++;
        amount += +bill.amount
      }
    })
    this.totalDue = amount.toString();
    this.numberOfDue = num.toString();
    amount = 0;
    num = 0;
    this.bills.forEach((bill) => {
      if (bill.isPaid) {
        num++;
        amount += +bill.amount
      }    
    })
    this.totalPaid = amount.toString(); 
    this.numberOfPaid = num.toString()
  }
  bills: RecurringBill[] = [
    {title: "Elevate Education", day: "1st", amount: "250.00", isPaid: true},
    {title: "Bravo Zen Spa", day: "3rd", amount: "70.00", isPaid: true},
    {title: "Charlie Electric Company", day: "5th", amount: "10.00", isPaid: false},
    {title: "Delta Taxi", day: "6th", amount: "30.00", isPaid: false},
    {title: "Echo Game Store", day: "12th", amount: "5.00", isPaid: true},
    {title: "Echo Game Store", day: "16th", amount: "10.00", isPaid: true},
    {title: "Tango Gas Company", day: "22nd", amount: "225.00", isPaid: true},
    {title: "Juliet Restaurant", day: "28th", amount: "950.00", isPaid: true},
  ]



  dropdown: Dropdown = {
    code: '',
    title: 'Latest',
    alreadyUsed: false
  }

  sortResults(ev: Dropdown) {
    if (ev.fn) {
      ev.fn()
    }
  }
  filterResults(str: string) {
    this.bills = this._bills.filter((val) => {
      if (val.title.includes(str)) {
        return true
      }
      return false;
    })
  }
  dropdownValues: Dropdown[] = [
    {
    code: '',
    title: 'Latest',
    alreadyUsed: false,
    fn: () => {
      this.bills.sort((a, b) => parseInt(a.day) - parseInt(b.day))
    }
    },
    {
      code: '',
      title: 'A to Z',
      alreadyUsed: false,
      fn: () => {
        this.bills.sort((a, b) => {
          let str1 = a.title.toUpperCase()
          let str2 = b.title.toUpperCase()

          if (str1 < str2) {
            return -1
          }
          else if (str1 > str2) {
            return 1
          }

          return 0;
        })
      }
    },
    {
      code: '',
      title: 'Z to A',
      alreadyUsed: false,
      fn: () => {
        this.bills.sort((a, b) => {
          let str1 = a.title.toUpperCase()
          let str2 = b.title.toUpperCase()

          if (str1 < str2) {
            return 1
          }
          else if (str1 > str2) {
            return -1
          }

          return 0;
        })
      }
    },
    {
      code: '',
      title: 'Highest',
      alreadyUsed: false,
      fn: () => {
        this.bills.sort((a, b) => {
          return parseInt(b.amount) - parseInt(a.amount)
        })
      }
    },
    {
      code: '',
      title: 'Lowest',
      alreadyUsed: false,
      fn:() => {
        this.bills.sort((a, b) => {
          return parseInt(a.amount) - parseInt(b.amount)
        })
      }
     
    }
]
  
}
