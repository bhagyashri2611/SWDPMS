import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbCallingService } from 'src/app/core/services/db-calling.service';
import { SiltQuantityModel } from 'src/app/core/models/ISiltquantityModel';
import Swal from 'sweetalert2';
import { AgGridAngular } from '@ag-grid-community/angular';
import * as XLSX from 'xlsx';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { CustomVFS } from 'src/app/core/services/pdfmakefonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import * as moment from 'moment';
@Component({
  selector: 'app-addnallavideos',
  templateUrl: './addnallavideos.component.html',
  styleUrls: ['./addnallavideos.component.scss'],
})
export class AddnallavideosComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  lstSearchResults: any = [];
  lstReportData: any = [];
  pagesize = 10;
  PageNumber = 1;

  columnDefs;
  context;
  gridApi;
  gridColumnApi;
  defaultColDef;
  rowSelection;
  frameworkComponents;

  Form: FormGroup;
  Zonelist: SiltQuantityModel[] = [];
  Parentlist: SiltQuantityModel[] = [];
  Workcodelist: SiltQuantityModel[] = [];
  CumulativeProgressList: SiltQuantityModel[] = [];
  Nallalist: SiltQuantityModel[] = [];
  uniqueZone: any[] = [];
  uniqueParentcode: any[] = [];
  uniqueWorkcode: any[] = [];
  fileName =
    'MajorNallaCumulativeProgressReport' +
    moment(new Date()).format('DDMMYYYY') +
    '.xlsx';
  imageSrc: string = '';
  fileSource: any;
  fType: String;
  fSize: String;
  fExtension: String;
  get f() {
    return this.Form.controls;
  }
  categoryList = [
    { Categoryid: 1, CategoryName: 'Before Cleaning' },
    { Categoryid: 2, CategoryName: 'While Cleaning' },
    { Categoryid: 3, CategoryName: 'After Cleaning' },
  ];
  constructor(
    private fb: FormBuilder,
    private dbCallingService: DbCallingService,
    private router: Router
  ) {
    let obj = {
      UserId: Number(sessionStorage.getItem('UserId')),
    };
    this.dbCallingService
      .GetMajorZonewiseDDLDataByUserID(obj)
      .subscribe((res) => {
        this.Zonelist = res.Data;
        if (this.Zonelist) {
          this.uniqueZone = [...new Set(this.Zonelist.map((s) => s.Zone))];
          if (this.uniqueZone) {
            if (this.uniqueZone.length === 1) {
              this.Form.patchValue({
                zone: this.uniqueZone[0],
              });
              this.getUniqueParentCode(this.uniqueZone[0]);
            }
          }
        } else {
          Swal.fire({
            text: 'No data found !',
            icon: 'warning',
          });
        }
      });
  }

  ngOnInit() {
    this.Form = this.fb.group({
      zone: ['', Validators.required],
      parentcode: ['', Validators.required],
      workcode: ['', Validators.required],
      nalla: ['', Validators.required],
      fromdate: ['', Validators.required],
      file: ['', Validators.required],
      filecategory: ['', Validators.required],
      // fileSource: ['',Validators.required]
    });
  }

  onZoneChange(event) {
    this.uniqueParentcode = [];
    this.uniqueWorkcode = [];
    this.Nallalist = [];
    this.Form.patchValue({
      parentcode: '',
      workcode: '',
      nalla: '',
    });
    this.getUniqueParentCode(event.target.value);
  }
  getUniqueParentCode(szone) {
    if (this.Zonelist) {
      this.uniqueParentcode = [
        ...new Set(
          this.Zonelist.filter((f) => f.Zone === szone).map((s) => s.Parentcode)
        ),
      ];
      if (this.uniqueParentcode) {
        if (this.uniqueParentcode.length === 1) {
          this.Form.patchValue({
            parentcode: this.uniqueParentcode[0],
          });
          this.getUniqueWorkCode(this.uniqueParentcode[0]);
        } else {
          this.Form.patchValue({
            parentcode: '',
            workcode: '',
          });
        }
      }
    }
  }

  onParentcodeChange(event) {
    this.uniqueWorkcode = [];
    this.Nallalist = [];
    this.Form.patchValue({
      workcode: '',
      nalla: '',
    });
    this.getUniqueWorkCode(event.target.value);
  }
  getUniqueWorkCode(sparentcode) {
    if (this.Zonelist && sparentcode) {
      this.uniqueWorkcode = [
        ...new Set(
          this.Zonelist.filter((f) => f.Parentcode === sparentcode).map(
            (s) => s.Workcode
          )
        ),
      ];

      if (this.uniqueWorkcode) {
        if (this.uniqueWorkcode.length === 1) {
          this.Form.patchValue({
            workcode: this.uniqueWorkcode[0],
          });
          this.getUniqueNall(this.uniqueWorkcode[0]);
        } else {
          this.Form.patchValue({
            workcode: '',
          });
        }
      }
    } else {
      this.Form.patchValue({
        workcode: '',
      });
    }
  }
  // onParentcodeChange(event) {
  //   if (this.Zonelist) {
  //     this.uniqueWorkcode = [... new Set(this.Zonelist.filter(f => f.Parentcode === event.target.value).map(s => s.Workcode))];
  //   }
  // }
  onWorkcodeChange(event) {
    this.Nallalist = [];
    this.Form.patchValue({
      nalla: '',
    });
    this.getUniqueNall(event.target.value);
  }

  getUniqueNall(sworkcode) {
    if (this.Zonelist && sworkcode) {
      this.Nallalist = this.Zonelist.filter((f) => f.Workcode === sworkcode);
    }
    if (this.Nallalist) {
      if (this.Nallalist.length === 1) {
        this.Form.patchValue({
          nalla: this.Nallalist[0].SiltQuantityID,
        });
      } else {
        this.Form.patchValue({
          nalla: '',
        });
      }
    }
  }
  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.fSize = event.target.files[0].size;
      this.fType = event.target.files[0].type;
      this.fExtension = event.target.files[0].name.substr(
        event.target.files[0].name.lastIndexOf('.') + 1
      );
      reader.readAsDataURL(file);
      reader.onload = () => {
        // this.imageSrc = reader.result as string;
        // this.Form.patchValue({
        this.fileSource = reader.result as string;
        // });
      };
    }
  }
  OnGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.defaultColDef = params.defaultColDef;
    this.context = params.context;
  }

  headerHeightSetter(params) {
    var padding = 20;
    var height = headerHeightGetter() + padding;
    this.gridApi.setHeaderHeight(height);
    this.gridApi.resetRowHeights();
  }

  onSubmit() {
    this.lstReportData = [];

    let imgData = this.fileSource;
    var spl = imgData.split('/')[1];
    var format = spl.split(';')[0];
    let stringconvert = imgData.replace('data:' + this.fType + ';base64,', '');
    console.log(stringconvert);
    //console.log(this.fSize,this.fType,this.fExtension,spl,format);
    let obj = {
      UserId: Number(sessionStorage.getItem('UserId')),
      Zone: this.Form.value.zone ? this.Form.value.zone : null,
      Parentcode: this.Form.value.parentcode
        ? this.Form.value.parentcode
        : null,
      Workcode: this.Form.value.workcode ? this.Form.value.workcode : null,
      SiltQuantityID: this.Form.value.nalla ? this.Form.value.nalla : null,
      ImageMappingDate: this.Form.value.fromdate,
      Image: stringconvert,
      FileExtention: this.fExtension,
      ImageCategoryID: this.Form.value.filecategory,
    };
    console.log(obj);
    if (
      this.Form.value.fromdate != '' &&
      this.Form.value.fromdate != undefined
    ) {
      if (new Date(this.Form.value.fromdate) <= new Date()) {
        Swal.fire({
          text: ' From Date Must be less than Today or Today only',
          icon: 'warning',
        });
      } else {
        this.dbCallingService.addNallaCleaningData(obj).subscribe(
          (res) => {
            if (res.ServiceResponse === 1) {
              Swal.fire({
                text: res.Msg,
                icon: 'success',
              });
            } else {
              Swal.fire({
                text: res.Msg,
                icon: 'warning',
              });
            }
          },
          (err) => {
            Swal.fire({
              text: err,
              icon: 'warning',
            });
          }
        );
      }
    } else {
      Swal.fire({
        text: 'Enter Date',
        icon: 'warning',
      });
    }
  }
  back() {
    this.router.navigateByUrl('/dashboard');
  }

  getAGGridReady() {
    this.columnDefs = [
      { headerName: 'Nalla ID', field: 'SiltQuantityID', maxWidth: 70 },
      { headerName: 'Zone', field: 'Zone', maxWidth: 70 },
      { headerName: 'Workcode', field: 'Workcode', maxWidth: 70 },
      { headerName: 'Ward', field: 'Ward', maxWidth: 70 },
      {
        headerName: 'Catchment Number',
        field: 'CatchmentNumber',
        maxWidth: 100,
      },
      { headerName: 'Nallah No', field: 'NallahNo', maxWidth: 100 },
      { headerName: 'Nallah System', field: 'NallahSystem', maxWidth: 100 },
      { headerName: 'Nallah Length', field: 'NallahLength', maxWidth: 100 },
      { headerName: 'Avg Width', field: 'AvgWidth', maxWidth: 70 },
      {
        headerName: 'Pre monsoon Desilt Quantity',
        field: 'PremonsoonDesiltQuantity',
        maxWidth: 100,
      },
      {
        headerName: 'During Monsoon Desilt Quantity',
        field: 'DuringMonsoonDesiltQuantity',
        maxWidth: 100,
      },
      {
        headerName: 'After Monsoon Desilt Quantity',
        field: 'AftrMonsoonDesiltQuantity',
        maxWidth: 100,
      },
      {
        headerName: 'Total Desilt Quantity',
        field: 'TotalDesiltQuantity',
        maxWidth: 100,
      },
      { headerName: 'Total Vehicle', field: 'TotalVehicle', maxWidth: 100 },
      {
        headerName: 'Total Net Weight (MT)',
        field: 'TotalActNetWeight',
        maxWidth: 100,
      },
      {
        headerName: '% of completion',
        field: 'PercentOfPremonsoon',
        maxWidth: 100,
      },
      {
        headerName: 'Total Billable Net Weight (MT)',
        field: 'BillableQuantity',
        maxWidth: 100,
      },
      {
        headerName: '% of completion (Billable)',
        field: 'BillablePercent',
        maxWidth: 100,
      },
    ];

    this.context = { componentParent: this };

    this.defaultColDef = {
      sortable: true,
      minWidth: 50,
      filter: true,
      resizable: true,
      wrapText: true,
      autoHeight: true,
      sortingOrder: ['asc', 'desc'],
      enableRowSelection: true,
      enableFullRowSelection: true,
      enableHighlighting: true,
      enableCellTextSelection: true,
      suppressMovable: true,
      headerComponentParams: {
        template:
          '<div class="ag-cell-label-container" role="presentation">' +
          '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
          '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
          '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
          '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
          '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
          '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
          '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
          '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
          '  </div>' +
          '</div>',
      },
    };
  }

  exportToExcel() {
    //debugger;
    if (this.lstReportData.length > 0) {
      let element = document.getElementById('excelexporttable');
      /* pass here the table id */
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      XLSX.writeFile(wb, this.fileName);
    } else {
      Swal.fire({
        text: 'No Data to export!',
        icon: 'error',
      });
    }
  }

  table(data, columns) {
    return {
      table: {
        headerRows: 1,
        widths: [
          20, 30, 30, 20, 30, 30, 50, 30, 30, 40, 40, 40, 40, 40, 40, 30, 30,
          30,
        ],
        //widths: [20, 30, 30,30, 30, 30, 50, 30, 30, 40, 40, 40, 40, 40, 40, 40, 40, 40],
        body: this.dbCallingService.buildTableBody(data, columns),
      },
    };
  }
  download() {
    const fileName =
      'MajorNallaCumulativeProgressReport_' +
      moment(new Date()).format('DDMMYYYY');
    const recordList = [];
    if (this.lstReportData) {
      this.lstReportData.forEach((rec) => {
        let eachRec = {
          'Nalla ID': rec.SiltQuantityID ? rec.SiltQuantityID : '',
          Zone: rec.Zone,
          Workcode: rec.Workcode,
          Ward: rec.Ward,
          'Catchment Number': rec.CatchmentNumber,
          'Nallah No': rec.NallahNo,
          'Nallah System': rec.NallahSystem,
          'Nallah Length': rec.NallahLength,
          'Avg Width': rec.AvgWidth,
          'Pre monsoon Desilt Quantity': rec.PremonsoonDesiltQuantity,
          'During Monsoon Desilt Quantity': rec.DuringMonsoonDesiltQuantity,
          'After Monsoon Desilt Quantity': rec.AftrMonsoonDesiltQuantity,
          'Total Desilt Quantity': rec.TotalDesiltQuantity,
          'Total Vehicle': rec.TotalVehicle,
          'Total Net Weight (MT)': rec.TotalActNetWeight,
          '% of completion': rec.PercentOfPremonsoon,
          'TOtal Billable Net Weight (MT)': rec.BillableQuantity,
          '% of completion (billable)': rec.BillablePercent,
        };
        recordList.push(eachRec);
      });
    }
    var docDefinition = {
      footer: function (currentPage, pageCount) {
        return currentPage.toString() + ' of ' + pageCount;
      },
      content: [
        {
          table: {
            widths: [100, '*', 100],
            header: 'center',
            body: [
              [
                {
                  rowSpan: 2,
                  image: CustomVFS.eps95logo,
                  fit: [80, 80],
                  alignment: 'center',
                },
                {
                  text: 'BRIHANMUMBAI MUNICIPAL CORPORATION',
                  alignment: 'center',
                  fontSize: '13',
                  bold: 'true',
                },
                { rowSpan: 2, text: 'SWD De-Silting', alignment: 'center' },
              ],
              [
                '',
                {
                  text:
                    'Progress report of Desilting From ' +
                    moment(this.Form.value.fromdate).format('DD-MMM-yyyy') +
                    ' To ' +
                    moment(this.Form.value.todate).format('DD-MMM-yyyy'),
                  alignment: 'center',
                },
                '',
              ],
            ],
            alignment: 'center',
          },
          pageSize: 'A4',
          pageOrientation: 'landscape',
        },

        this.table(recordList, Object.keys(recordList[0])),
      ],
      styles: {
        header: {
          fontSize: 12,
          bold: true,
          alignment: 'center',

          lineHeight: 1.25,
        },
        subheader: {
          fontSize: 8,
        },
        quote: {
          italics: true,
        },
        small: {
          fontSize: 6,
        },
        block: {
          margins: [0, 5],
        },
        tableHeader: {
          bold: true,
          color: 'black',
          alignment: 'center',

          fontSize: 8,
        },
        footnote: {
          fontSize: 6,
          margin: [0, 1, 0, 0],
        },
      },
      pageSize: 'A4',
      pageOrientation: 'landscape',
      defaultStyle: {
        //font: "Noto",
        fontSize: 10,
        alignment: 'center',
        lineHeight: 1.25,
      },
      preserveSpace: {
        preserveLeadingSpaces: true,
      },
    };
    pdfMake.createPdf(docDefinition).download(fileName + '.pdf');
  }
}
function headerHeightGetter() {
  var columnHeaderTexts = document.querySelectorAll('.ag-header-cell-text');

  var columnHeaderTextsArray = [];

  columnHeaderTexts.forEach((node) => columnHeaderTextsArray.push(node));

  var clientHeights = columnHeaderTextsArray.map(
    (headerText) => headerText.clientHeight
  );
  var tallestHeaderTextHeight = Math.max(...clientHeights);
  return tallestHeaderTextHeight;
}
