import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientTreeViewComponent } from './client-tree-view/client-tree-view.component';
import { HttpClientModule } from '@angular/common/http';
import {
  VirtualScrollService, ColumnChooserService, ToolbarService,
  FreezeService, InfiniteScrollService, FilterService, SortService, ContextMenuService
} from '@syncfusion/ej2-angular-treegrid';

@NgModule({
  declarations: [
    AppComponent,
    ClientTreeViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TreeGridModule,
    GridAllModule,
    HttpClientModule
  ],
  providers: [FreezeService, InfiniteScrollService, FilterService,
    VirtualScrollService, ColumnChooserService, ToolbarService,
    SortService, ContextMenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
