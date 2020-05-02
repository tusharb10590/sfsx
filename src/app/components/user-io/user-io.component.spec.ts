import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIOComponent } from './user-io.component';

describe('UserIOComponent', () => {
  let component: UserIOComponent;
  let fixture: ComponentFixture<UserIOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserIOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserIOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
