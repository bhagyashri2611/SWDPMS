import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/core/models/IUser';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common.service';
import { UserService } from 'src/app/core/services/user.service';
import { AgGridAngular } from 'ag-grid-angular';
import { BtnCellRenderer } from './button-cell-renderer.component';
import { RoleService } from 'src/app/core/services/role.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import * as XLSX from 'xlsx';

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
    private roleService: RoleService,
    private commonService: CommonService
  ) {
    this.getRoles();
  }

  gridOptions = {
    // other grid options
    rowHeight: 40, // Set the desired row height (in pixels)
    getRowHeight: function (params) {
      // Optional: Customize row height per row, if needed
      return 40; // Return the desired row height (in pixels)
    },
  };

  ngOnInit(): void {
    this.columnDefs = [
      {
        headerName: 'Action',
        field: '_id',
        cellRenderer: 'btnCellRenderer',
        minWidth: 250,
      },
      {
        headerName: 'UserName',
        field: 'userName',
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
        headerName: 'Is DataEntry',
        field: 'isDataEntry',
      },
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
        field: 'roleName',
      },
      {
        headerName: 'Created On',
        field: 'createdOn',
        valueGetter: this.commonService.createdOnDateFormatter,
      },
      {
        headerName: 'Created By',
        field: 'createdBy',
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
      minWidth: 100,
      filter: true,
      resizable: true,
      sortingOrder: ['asc', 'desc'],
    };
  }
  roleList: any;

  download() {
    let fileName =
      'UserList' + moment(new Date()).format('DDMMYYYY') + '.xlsx';
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.rowData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName);
    debugger;
  }

  getRoles() {
    this.roleService.getRoles().subscribe((result) => {
      if (result.status === 200) {
        this.roleList = result.data;
        this.getUsers();
      }
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (result) => {
        if (result != null) {
          if (result.status === 200) {
            this.userList = result.data;

            this.userList.forEach((element) => {
              this.roleList.forEach((e) => {
                if (e._id == element.role) {
                  element.roleName = e.roleName;
                }
              });
            });
            debugger;
            this.rowData = this.userList;
          }
        } else {
          Swal.fire({
            title: 'Seesion Expired',
            text: 'Login Again to Continue',
            icon: 'warning',
            confirmButtonText: 'Ok',
          }).then((result) => {
            if (result.value) {
              this.logOut();
            }
          });
        }
      },
      (err) => {
        // this.notificationService.warn(':: ' + err);
      }
    );
  }

  logOut() {
    this.router.navigate(['/login/']);
    sessionStorage.clear();
    window.location.reload();
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
