import { ITransaction } from './../../interfaces/transaction.interface';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChallengeService } from 'src/app/services/challenge.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-buy-tokens-modal',
  templateUrl: './buy-tokens-modal.component.html',
  styleUrls: ['./buy-tokens-modal.component.scss']
})
export class BuyTokensModalComponent implements OnInit {

  tokensValue: string = '';
  tokensBalance: number = 0;
  moneyBalance: number = 0;

  @Output() closeModal = new EventEmitter<any>();

  constructor(private challengeService: ChallengeService,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.challengeService.getTokesValue().subscribe((value: number) => {
      this.tokensBalance = value;
    });

    this.challengeService.getMoneyBalance().subscribe((value: number) => {
      this.moneyBalance = value;
    })
  }

  buyTokens = (): void => {
    const tokensCost = 0.25 * parseInt(this.tokensValue);
    if (tokensCost < this.moneyBalance) {
      const newTransaction: ITransaction = {
        user: 'Carlos',
        value: parseInt(this.tokensValue),
        type: 'Buy',
        balance: this.tokensBalance + parseInt(this.tokensValue)
      }
      this.challengeService.addTransaction(newTransaction);
      this.challengeService.setTokensValue(this.tokensValue, tokensCost);
      this.tokensValue = '';
    } else {
      this.toastr.error('Not enought money.')
    }
  }

  onCancelClick = (): void => {
    this.closeModal.emit();
  }

}
