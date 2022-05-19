import { ChallengeService } from 'src/app/services/challenge.service';
import { ITransaction } from './../../interfaces/transaction.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: ['./transactions-history.component.scss']
})
export class TransactionsHistoryComponent implements OnInit {

  transactionsHistory: ITransaction[] = [];
  displayedColumns: string[] = ['user', 'value', 'type', 'balance'];

  constructor(private challengeService: ChallengeService) { }

  ngOnInit(): void {
    this.challengeService.getTransactionsHistory().subscribe((value: ITransaction[]) => {
      this.transactionsHistory = value;
    })
  }

}
