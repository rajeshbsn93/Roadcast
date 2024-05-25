import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProListComponent } from './contact-list.component';

describe('ProListComponent', () => {
  let component: ProListComponent;
  let fixture: ComponentFixture<ProListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
