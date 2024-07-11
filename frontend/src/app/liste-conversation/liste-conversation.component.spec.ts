import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeConversationComponent } from './liste-conversation.component';

describe('ListeConversationComponent', () => {
  let component: ListeConversationComponent;
  let fixture: ComponentFixture<ListeConversationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeConversationComponent]
    });
    fixture = TestBed.createComponent(ListeConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
