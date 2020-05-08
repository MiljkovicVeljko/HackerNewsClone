import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNewComponent } from './top-new.component';

describe('TopNewComponent', () => {
  let component: TopNewComponent;
  let fixture: ComponentFixture<TopNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
