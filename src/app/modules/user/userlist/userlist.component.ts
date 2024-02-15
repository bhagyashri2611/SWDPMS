import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/core/models/IUser';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common.service';
import { UserService } from 'src/app/core/services/user.service';
import { AgGridAngular } from 'ag-grid-angular';
import { BtnCellRenderer } from './button-cell-renderer.component';
import { RoleService } from 'src/app/core/services/role.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss'],
})
export class UserlistComponent implements OnInit {
  userList: User[];

  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  gridApi;
  gridColumnApi;
  sortingOrder;
  rowSelection;
  columnDefs;
  frameworkComponents;
  context;
  defaultColDef;
  selectedRows;
  selected;
  gridOption;
  rowData: any;

  constructor(
    private router: Router,
    private userService: UserService,
    private roleService: RoleService
  ) {}

  gridOptions = {
    // other grid options
    rowHeight: 40, // Set the desired row height (in pixels)
    getRowHeight: function (params) {
      // Optional: Customize row height per row, if needed
      return 40; // Return the desired row height (in pixels)
    },
  };

  ngOnInit(): void {
    this.getUsers();
    this.columnDefs = [
      {
        headerName: 'Action',
        field: '_id',
        cellRenderer: 'btnCellRenderer',
        minWidth: 250,
      },
      {
        headerName: 'First Name',
        field: 'firstName',
      },
      {
        headerName: 'Last Name',
        field: 'lastName',
      },
      {
        headerName: 'Mobile Number',
        field: 'mobileNo',
      },

      { headerName: 'Email Id', field: 'email' },
      {
        headerName: 'Is Active',
        field: 'isActive',
        valueFormatter: function (params) {
          console.log(params);
          return params.value === true ? 'Yes' : 'No';
        },
      },
      {
        headerName: 'User Role',
        field: 'role.roleName',
      },
    ];
    this.rowSelection = 'multiple';
    this.frameworkComponents = {
      btnCellRenderer: BtnCellRenderer,
    };
    this.context = { componentParent: this };

    this.defaultColDef = {
      sortable: true,
      flex: 1,
      width: 200,
      filter: true,
      resizable: true,
      sortingOrder: ['asc', 'desc'],
    };
  }
  getUserRole(id: any) {
    this.roleService.getRoleById(id).subscribe((result) => {
      let roleName;
      if (result.status === 200) {
        console.log(result.data[0]);
        roleName = result.data[0].roleName;
      }
      return roleName;
    });
  }
  getUsers() {
    console.log('calling  User List');
    this.userService.getUsers().subscribe(
      (result) => {
        if (result.status === 200) {
          this.userList = result.data;
          this.rowData = result.data;
        }
      },
      (err) => {
        // this.notificationService.warn(':: ' + err);
      }
    );
  }

  OnGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.defaultColDef = params.defaultColDef;
    this.context = params.context;
  }

  onQuickFilterChanged() {
    let val = (<HTMLInputElement>document.getElementById('quickFilter')).value;
    this.agGrid.api.setQuickFilter(val);
  }
  methodFromParent(cell) {
    alert('Parent Component Method from ' + cell.id + '!');
  }
  setRowData(params) {
    params.api.forEachNode(function (node) {
      if (
        node.data._id === '5f5fb46efe0da740ae7c0e49' ||
        node.data._id === '5f5f62c48d7da32bbc05dca2'
      ) {
        node.setSelected(true);
      }
    });
  }
  ngAfterViewInit() {
    this.selectAllAmerican();
  }

  selectAllAmerican() {
    this.agGrid.api.forEachNode(function (node) {
      if (
        node.data._id === '5f5fb46efe0da740ae7c0e49' ||
        node.data._id === '5f5f62c48d7da32bbc05dca2'
      ) {
        node.setSelected(true);
      }
    });
  }

  Add() {
    this.router.navigate(['user/create']);
  }
}
