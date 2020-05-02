import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTradesComponent } from './book-trades.component';

describe('BookTradesComponent', () => {
  let component: BookTradesComponent;
  let fixture: ComponentFixture<BookTradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookTradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
