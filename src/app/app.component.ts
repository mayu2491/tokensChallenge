import { Component, OnInit } from '@angular/core';
import { ChallengeService } from './services/challenge.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-challenge';

  tokensBalance: number = 0;
  moneyBalance: number = 0;
  buyTokensModal: boolean;
  showHistoryTable: boolean;
  showGameScreen: boolean;

  constructor(private challengeService: ChallengeService) {
    this.buyTokensModal = false;
    this.showHistoryTable = false;
    this.showGameScreen = false;
  }
  ngOnInit(): void {
    this.challengeService.getTokesValue().subscribe((value: number) => {
      this.tokensBalance = value;
    });

    this.challengeService.getMoneyBalance().subscribe((value: number) => {
      this.moneyBalance = value;
    })
  }

  showModal = (): void => {
    this.buyTokensModal = !this.buyTokensModal;
    if(this.showHistoryTable) {
      this.showHistoryTable = false;
    }
    if(this.showGameScreen) {
      this.showGameScreen = false;
    }
  }

  openHistory = (): void => {
    this.showHistoryTable = !this.showHistoryTable;
    if(this.buyTokensModal) {
      this.buyTokensModal = false;
    }
    if(this.showGameScreen) {
      this.showGameScreen = false;
    }
  }

  openGames = (): void => {
    this.showGameScreen = !this.showGameScreen
    if(this.buyTokensModal) {
      this.buyTokensModal = false;
    }
    if(this.showHistoryTable) {
      this.showHistoryTable = false;
    }
  }
}
