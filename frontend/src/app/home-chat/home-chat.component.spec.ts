import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeChatComponent } from './home-chat.component';

describe('HomeChatComponent', () => {
  let component: HomeChatComponent;
  let fixture: ComponentFixture<HomeChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeChatComponent]
    });
    fixture = TestBed.createComponent(HomeChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
