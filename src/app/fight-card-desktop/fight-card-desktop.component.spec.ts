import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FightCardDesktopComponent } from './fight-card-desktop.component';

describe('FightCardDesktopComponent', () => {
  let component: FightCardDesktopComponent;
  let fixture: ComponentFixture<FightCardDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FightCardDesktopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FightCardDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
