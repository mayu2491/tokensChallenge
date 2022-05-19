import { ChallengeService } from 'src/app/services/challenge.service';
import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/interfaces/game.interface';
import { ITransaction } from 'src/app/interfaces/transaction.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-game-modal',
  templateUrl: './game-modal.component.html',
  styleUrls: ['./game-modal.component.scss']
})
export class GameModalComponent implements OnInit {

  selectedValue: string = '';
  tokensBalance: number = 0;

  games: Game[] = [
    {value: 4, name: 'Sonic Adventure Game'},
    {value: 6, name: 'Super Mario'},
    {value: 15, name: 'World of Warcraft'},
  ];
  constructor(private challengeService: ChallengeService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.challengeService.getTokesValue().subscribe((value: number) => {
      this.tokensBalance = value;
    });
  }

  playGame = (): void => {
    if (this.tokensBalance > parseInt(this.selectedValue)) {
      const newTransaction: ITransaction = {
        user: 'Carlos',
        value: parseInt(this.selectedValue),
        type: 'Spend',
        balance: this.tokensBalance - parseInt(this.selectedValue)
      }
      this.challengeService.addTransaction(newTransaction);
      this.challengeService.setTokensValue(this.selectedValue, 0, true);
      this.selectedValue = '';
    } else {
      this.toastr.error('Not enought tokens.')
    }
  }

}
