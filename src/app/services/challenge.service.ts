import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITransaction } from '../interfaces/transaction.interface';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  private tokensBalance: BehaviorSubject<number>;
  private transactionsHistory: BehaviorSubject<ITransaction[]>;
  private availableMoney: BehaviorSubject<number>;

  constructor() {
    this.tokensBalance = new BehaviorSubject<number>(0);
    this.transactionsHistory = new BehaviorSubject<ITransaction[]>([]);
    this.availableMoney = new BehaviorSubject<number>(30);
  }

  setTokensValue = (newValue: string, tokenCost?: number, spend?: boolean): void => {
    if (tokenCost && tokenCost !== 0) {
      const moneyBalance = this.availableMoney.getValue() - tokenCost;
      this.availableMoney.next(moneyBalance);
    }
    const currentValue = this.tokensBalance.getValue();
    this.tokensBalance.next(spend ? currentValue - parseInt(newValue) : currentValue + parseInt(newValue));
  }

  getTokesValue = (): Observable<number> => {
    return this.tokensBalance.asObservable();
  }

  getMoneyBalance = (): Observable<number> => {
    return this.availableMoney.asObservable();
  }

  addTransaction = (newTransaction: ITransaction): void => {
    const currentValue = this.transactionsHistory.getValue();
    const updatedValue = [...currentValue, newTransaction];
    this.transactionsHistory.next(updatedValue);
  }

  getTransactionsHistory = (): Observable<ITransaction[]> => {
    return this.transactionsHistory.asObservable();
  }

}
