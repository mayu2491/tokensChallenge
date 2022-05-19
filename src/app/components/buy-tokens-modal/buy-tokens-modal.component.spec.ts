import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyTokensModalComponent } from './buy-tokens-modal.component';

describe('BuyTokensModalComponent', () => {
  let component: BuyTokensModalComponent;
  let fixture: ComponentFixture<BuyTokensModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyTokensModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyTokensModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
