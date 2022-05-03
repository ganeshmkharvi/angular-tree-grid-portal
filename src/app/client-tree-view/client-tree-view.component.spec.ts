import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTreeViewComponent } from './client-tree-view.component';

describe('ClientTreeViewComponent', () => {
  let component: ClientTreeViewComponent;
  let fixture: ComponentFixture<ClientTreeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientTreeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
