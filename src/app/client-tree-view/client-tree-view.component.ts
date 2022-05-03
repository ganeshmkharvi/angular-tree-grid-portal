import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { DropDownList, DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { SortEventArgs } from '@syncfusion/ej2-grids';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';
import { ClientTreeService } from '../services/client-tree.service';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-client-tree-view',
  templateUrl: './client-tree-view.component.html',
  providers: [],
  encapsulation: ViewEncapsulation.None
})

export class ClientTreeViewComponent implements OnInit {

  public data: any;
  public toolbar: string[] = [];
  public columnCount: Number = 0;
  public initialColumnCount: Number = 4;
  public filterSettings: Object = {};
  public templateOptions: object = {};
  public dropDownFilter: DropDownList = new DropDownList();
  public d1data: Object = {};
  public fields1: Object = {};
  public sortSettings: Object = {};
  public selectionSettings: Object = {};
  public contextMenuItems: Array<any> = [];
  public filterCol: boolean = true;
  public multiSort: boolean = true;
  public multiSelect: boolean = true;
  public taskId: number = 0;
  public subTaskId: number = 0;

  public socket: any = io('http://localhost:3001');


  @ViewChild('treegrid')
  public treegrid!: TreeGridComponent;

  @ViewChild('dropdown1')
  public dropdown1!: DropDownListComponent

  constructor(private api: ClientTreeService) {
    this.initData();
    var ref = this;
    this.socket.on("update", function (data: any) {
      ref.setData(data);
    });
    this.socket.on("message", function (data: any) {
      console.log(data);
    });

  }

  ngOnInit(): void {
    this.initSort();
    this.initContextMenuItems();
    this.initMultiSelection();
  }

  private initContextMenuItems() {
    this.contextMenuItems = [
      { text: 'FreezeCol', target: '.e-headercontent', id: 'freezeCol', hasCheckbox: true },
      { text: 'FilterCol', target: '.e-headercontent', id: 'filterCol', hasCheckbox: true },
      { text: 'MultiSort ', target: '.e-headercontent', id: 'multiSort', hasCheckbox: true },
      { text: 'MultiSelect', target: '.e-content', id: 'multiSelect', hasCheckbox: true },
      { text: 'DelRow', target: '.e-content', id: 'delRow', hasCheckbox: false }
    ];
  }

  setData(result: any) {
    this.data = result;
  }

  initData = () => {
    this.api.getTreeDataSource().subscribe((records: any) => {
      this.setData(records.result);
    });
  }

  private initMultiSelection() {
    this.selectionSettings = { type: 'Multiple', mode: 'Row' };
  }

  private initSort() {
    this.sortSettings = {
      columns: [{ field: 'TaskID', direction: 'Ascending' },
      { field: 'FIELD1', direction: 'Ascending' }]
    };
    this.toolbar = ['ColumnChooser'];
    this.columnCount = this.initialColumnCount;
    this.initFilter();
  }

  contextMenuOpen(arg?: BeforeOpenCloseEventArgs): void {
    this.addEnableOption(this.contextMenuItems.filter(x=>x.hasCheckbox === true ));
    //this.addClickHandler(this.contextMenuItems.filter(x=>x.hasCheckbox === false ));
  }
  
  addClickHandler(elements: any[]) {
    elements.forEach((element) => {
      element.addEventListener('change', () => {
        if(element.text === 'DelRow'){
        if(this.taskId >0 && this.subTaskId > 0 ){
         this.api.deleteSubTask(this.taskId, this.subTaskId);
        } else {
         this.api.deleteTask(this.taskId);
        }
      }
      });
    });
  }

  getIsChecked = (elementId: string) => {
    switch (elementId) {
      case 'filterCol':
        return this.filterCol;
      case 'multiSort':
        return this.multiSort;
      case 'multiSelect':
        return this.multiSelect;
      default:
        return this.columnCount === 0 ? false : true;
    }

  }

  addEnableOption = (elements: any[]) => {
    let id = (elements.find(x => x.hasCheckbox) as any).id;
    const element = document.querySelectorAll(`input#chk${id}`);
    if (!element || element.length === 0) {
      elements.forEach((element) => {
        const chkElement = document.createElement('input');
        let elementId: string = (element as any).id;
        let isChecked: boolean = this.getIsChecked(elementId);
        chkElement.setAttribute("id", `chk${elementId}`);

        if (isChecked) {
          chkElement.setAttribute("checked", isChecked.toString())
        } else {
          chkElement.removeAttribute('checked');
        }

        chkElement.setAttribute("type", 'checkbox');
        this.toggleCheckbox(chkElement, elementId);
        document.querySelector(`li#${elementId}`)?.appendChild(chkElement);
      });
    }
  }

  toggleCheckbox = (chkElement: HTMLInputElement, elementId: string) => {
    chkElement.addEventListener('change', () => {
      if (chkElement.getAttribute('checked') === 'true') {
        chkElement.removeAttribute("checked");
        this.toggleCheckProperties(elementId, false);
      } else {
        chkElement.setAttribute("checked", 'true');
        this.toggleCheckProperties(elementId, true);
      }
    });
  }

  private toggleCheckProperties(elementId: string, value: boolean) {
    switch (elementId) {
      case 'freezeCol':
        if (value) {
          this.columnCount = this.initialColumnCount;
        } else {
          this.columnCount = 0;
        }
        break;
      case 'filterCol':
        this.filterCol = value;
        break;
      case 'multiSort':
        this.multiSort = value;
        break;
      case 'multiSelect':
        this.multiSelect = value;
        this.selectionSettings = value ? { type: 'Multiple', mode: 'Row' } : { type: 'Single', mode: 'Row' };
        break;
    }
  }

  contextMenuClick(args?: MenuEventArgs): void {
    if (args?.item?.id === 'collapserow') {
      this.treegrid.collapseRow(this.treegrid.getSelectedRows()[0] as HTMLTableRowElement, this.treegrid.getSelectedRecords()[0]);
    } else if (args?.item?.id === 'expandrow') {
      this.treegrid.expandRow(this.treegrid.getSelectedRows()[0] as HTMLTableRowElement, this.treegrid.getSelectedRecords()[0]);
    } else if (args?.item?.id === 'collapseall') {
      this.treegrid.collapseAll();
    } else if (args?.item?.id === 'expandall') {
      this.treegrid.expandAll();
    } else if (args?.item?.id === 'filtercol') {
      this.treegrid.expandAll();
    }
  }

  private initFilter() {
    this.filterSettings = { type: 'FilterBar', hierarchyMode: 'Parent', mode: 'Immediate' };
    this.templateOptions = {
      create: (args: { element: Element; }) => {
        let dd: HTMLInputElement = document.createElement('input');
        dd.id = 'duration';
        return dd;
      },
      write: (args: { element: Element; }) => {
        let dataSource: string[] = ['All', '1', '3', '4', '5', '6', '8', '9'];
        this.dropDownFilter = new DropDownList({
          dataSource: dataSource,
          value: 'All',
          change: (e: ChangeEventArgs) => {
            let valuenum: any = +e.value;
            let id: any = <string>this.dropDownFilter.element.id;
            let value: any = <string>e.value;
            if (value !== 'All') {
              this.treegrid.filterByColumn(id, 'equal', valuenum);
            } else {
              this.treegrid.removeFilteredColsByField(id);
            }
          }
        });
        this.dropDownFilter.appendTo('#duration');
      }
    };
    this.fields1 = { text: 'mode', value: 'id' };
    this.d1data = [{ id: 'Parent', mode: 'Parent' },
    { id: 'Child', mode: 'Child' },
    { id: 'Both', mode: 'Both' },
    { id: 'None', mode: 'None' },];
  }

  change(e: ChangeEventArgs): void {
    let mode: any = <string>e.value;
    this.treegrid.filterSettings.hierarchyMode = mode;
    this.treegrid.clearFiltering();
    this.dropDownFilter.value = 'All';
  }

  public sort(args: SortEventArgs): void {
    if (args.requestType === 'sorting') {
      for (let columns of this.treegrid.getColumns()) {
        if (this && this.treegrid && this.treegrid.sortSettings && this.treegrid.sortSettings.columns) {
          for (let sortcolumns of this.treegrid?.sortSettings?.columns) {
            if (sortcolumns.field === columns.field) {
              //this.check(sortcolumns.field, true); break;
            } else {
              // this.check(columns.field, false);
            }
          }
        }
      }
    }
  }

  rowSelected(args: any) {
    if(args.row.getAttribute('aria-expanded') === 'true') {
      this.taskId =  args.row.firstChild.innerText;
    }

    if (args.row.getAttribute('aria-expanded') !== 'true') {
      this.subTaskId = args.row.firstChild.innerText;
      let notFound = true;
      let previousElement = args.row;
      
      do {
        previousElement = previousElement.previousSibling;
        if (previousElement.getAttribute('aria-expanded') === 'true') {
          notFound = false;
          this.taskId = previousElement.firstChild.innerText;
        }
      }
      while (notFound)
    }
  }

}
