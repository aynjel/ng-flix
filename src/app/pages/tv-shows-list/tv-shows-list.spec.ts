import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowsList } from './tv-shows-list';

describe('TvShowsList', () => {
  let component: TvShowsList;
  let fixture: ComponentFixture<TvShowsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvShowsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvShowsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
