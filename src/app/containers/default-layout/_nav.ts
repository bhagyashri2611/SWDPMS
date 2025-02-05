import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    name: 'Master Data',
    iconComponent: { name: 'cil-list-rich' },
    children: [
      {
        name: 'Roads Master Data',
        url: '/location/list',
        iconComponent: { name: 'cil-chart-line' },
      },
      {
        name: 'Tasks',
        url: '/module/list',
        iconComponent: { name: 'cil-link' },
      },
      {
        name: 'Unit',
        url: '/unit/list',
        iconComponent: { name: 'cil-balance-scale' },
      },
      {
        name: 'User',
        url: '/user/list',
        iconComponent: { name: 'cil-user' },
      },
    ],
  },
  {
    name: 'Data Entry Attributes',
    iconComponent: { name: 'cil-notes' },
    children: [
      {
        name: 'Attributes List',
        url: '/location/dataentryassetpandmattributelist',
        iconComponent: { name: 'cil-list' },
      },
      {
        name: 'Attach Attributes',
        url: '/location/dataentrygrouplist',
        iconComponent: { name: 'cil-pin' },
      },
    ],
  },
  {
    name: 'Mega CC Project',
    iconComponent: { name: 'cil-list-rich' },
    children: [
      {
        name: 'Mega CC Roads',
        url: '/location/megacclist',
        iconComponent: { name: 'cil-chart-line' },
      },
      {
        name: 'Mega CC Roads Map',
        url: '/ol/display',
        iconComponent: { name: 'cil-map' },
    
      },
      {
        name: 'Mega CC Reports',
        iconComponent: { name: 'cil-chart-pie' },
        children: [
          // {
          //   name: 'Date Wise Task Details',
          //   url: '/location/report/taskdetailsreport',
          //   iconComponent: { name: 'cil-chart-line' },
          // },
       
          {
            name: 'Zone Wise Report',
            url: '/location/report/zonewisereport',
            iconComponent: { name: 'cil-chart-line' },
          },
          {
            name: 'Ward Wise Report',
            url: '/location/report/wardwisereport',
            iconComponent: { name: 'cil-chart-line' },
          },
          {
            name: 'Contractor Wise Report',
            url: '/location/report/contractorwisereport',
            iconComponent: { name: 'cil-chart-line' },
          },
          {
            name: 'Road Wise Report',
            url: '/location/report/roadwisereport',
            iconComponent: { name: 'cil-chart-line' },
          },
          {
            name: 'Contractor Remarks',
            url: '/location/report/contractorremarksreport',
            iconComponent: { name: 'cil-chart-line' },
          },
          {
            name: 'Defaulter List',
            url: '/location/report/locationdataentry',
            iconComponent: { name: 'cil-chart-line' },
          },
        ],
      },
    
    ]
  },
  {
    name: 'Non Mega CC Roads',
    iconComponent: { name: 'cil-list-rich' },
    children: [
      {
        name: 'Non Mega CC Roads',
        url: '/location/nonmegacclist',
        iconComponent: { name: 'cil-chart-line' },
      },
      // {
      //   name: 'Mega CC Roads Map',
      //   url: '/ol/display',
      //   iconComponent: { name: 'cil-map' },
    
      // },
      // {
      //   name: 'Mega CC Reports',
      //   iconComponent: { name: 'cil-chart-pie' },
      //   children: [
      //     // {
      //     //   name: 'Date Wise Task Details',
      //     //   url: '/location/report/taskdetailsreport',
      //     //   iconComponent: { name: 'cil-chart-line' },
      //     // },
       
      //     {
      //       name: 'Zone Wise Report',
      //       url: '/location/report/zonewisereport',
      //       iconComponent: { name: 'cil-chart-line' },
      //     },
      //     {
      //       name: 'Ward Wise Report',
      //       url: '/location/report/wardwisereport',
      //       iconComponent: { name: 'cil-chart-line' },
      //     },
      //     {
      //       name: 'Contractor Wise Report',
      //       url: '/location/report/contractorwisereport',
      //       iconComponent: { name: 'cil-chart-line' },
      //     },
      //     {
      //       name: 'Road Wise Report',
      //       url: '/location/report/roadwisereport',
      //       iconComponent: { name: 'cil-chart-line' },
      //     },
      //     {
      //       name: 'Contractor Remarks',
      //       url: '/location/report/contractorremarksreport',
      //       iconComponent: { name: 'cil-chart-line' },
      //     },
      //     {
      //       name: 'Defaulter List',
      //       url: '/location/report/locationdataentry',
      //       iconComponent: { name: 'cil-chart-line' },
      //     },
      //   ],
      // },
    
    ]
  },
  {
    name: 'Mastic Work',
    iconComponent: { name: 'cil-list-rich' },
    children: [
      {
        name: 'Mastic Work List',
        url: '/location/masticworklist',
        iconComponent: { name: 'cil-chart-line' },
      },
      {
        name: 'Mastic Road List',
        url: '/location/masticroadlist',
        iconComponent: { name: 'cil-chart-line' },
      }
    ]
  },
  {
    name: 'Data Entry',
    iconComponent: { name: 'cil-plus' },
    children: [
      {
        name: 'Data Entry',
        url: '/location/createdataentry',
        iconComponent: { name: 'cil-plus' },
      },
    ],
  },
];

export const OtherThanAdmin: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    name: 'Mega CC Project',
    iconComponent: { name: 'cil-list-rich' },
    children: [
      {
        name: 'Mega CC Roads',
        url: '/location/megacclist',
        iconComponent: { name: 'cil-chart-line' },
      },
      {
        name: 'Mega CC Roads Map',
        url: '/ol/display',
        iconComponent: { name: 'cil-map' },
    
      },
      {
        name: 'Mega CC Reports',
        iconComponent: { name: 'cil-chart-pie' },
        children: [
          // {
          //   name: 'Date Wise Task Details',
          //   url: '/location/report/taskdetailsreport',
          //   iconComponent: { name: 'cil-chart-line' },
          // },
       
          {
            name: 'Zone Wise Report',
            url: '/location/report/zonewisereport',
            iconComponent: { name: 'cil-chart-line' },
          },
          {
            name: 'Ward Wise Report',
            url: '/location/report/wardwisereport',
            iconComponent: { name: 'cil-chart-line' },
          },
          {
            name: 'Contractor Wise Report',
            url: '/location/report/contractorwisereport',
            iconComponent: { name: 'cil-chart-line' },
          },
          {
            name: 'Road Wise Report',
            url: '/location/report/roadwisereport',
            iconComponent: { name: 'cil-chart-line' },
          },
          {
            name: 'Contractor Remarks',
            url: '/location/report/contractorremarksreport',
            iconComponent: { name: 'cil-chart-line' },
          },
          {
            name: 'Defaulter List',
            url: '/location/report/locationdataentry',
            iconComponent: { name: 'cil-chart-line' },
          },
        ],
      },
    
    ]
  },
  {
    name: 'Non Mega CC Roads',
    iconComponent: { name: 'cil-list-rich' },
    children: [
      {
        name: 'Non Mega CC Roads',
        url: '/location/nonmegacclist',
        iconComponent: { name: 'cil-chart-line' },
      },
      // {
      //   name: 'Mega CC Roads Map',
      //   url: '/ol/display',
      //   iconComponent: { name: 'cil-map' },
    
      // },
      // {
      //   name: 'Mega CC Reports',
      //   iconComponent: { name: 'cil-chart-pie' },
      //   children: [
      //     // {
      //     //   name: 'Date Wise Task Details',
      //     //   url: '/location/report/taskdetailsreport',
      //     //   iconComponent: { name: 'cil-chart-line' },
      //     // },
       
      //     {
      //       name: 'Zone Wise Report',
      //       url: '/location/report/zonewisereport',
      //       iconComponent: { name: 'cil-chart-line' },
      //     },
      //     {
      //       name: 'Ward Wise Report',
      //       url: '/location/report/wardwisereport',
      //       iconComponent: { name: 'cil-chart-line' },
      //     },
      //     {
      //       name: 'Contractor Wise Report',
      //       url: '/location/report/contractorwisereport',
      //       iconComponent: { name: 'cil-chart-line' },
      //     },
      //     {
      //       name: 'Road Wise Report',
      //       url: '/location/report/roadwisereport',
      //       iconComponent: { name: 'cil-chart-line' },
      //     },
      //     {
      //       name: 'Contractor Remarks',
      //       url: '/location/report/contractorremarksreport',
      //       iconComponent: { name: 'cil-chart-line' },
      //     },
      //     {
      //       name: 'Defaulter List',
      //       url: '/location/report/locationdataentry',
      //       iconComponent: { name: 'cil-chart-line' },
      //     },
      //   ],
      // },
    
    ]
  },
  {
    name: 'Mastic Work',
    iconComponent: { name: 'cil-list-rich' },
    children: [
      {
        name: 'Mastic Work List',
        url: '/location/masticworklist',
        iconComponent: { name: 'cil-chart-line' },
      },
      {
        name: 'Mastic Road List',
        url: '/location/masticroadlist',
        iconComponent: { name: 'cil-chart-line' },
      }
    ]
  },
];

export const OtherThanAdminWithDataEntry: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    name: 'Mega CC Project',
    iconComponent: { name: 'cil-list-rich' },
    children: [
      {
        name: 'Mega CC Roads',
        url: '/location/megacclist',
        iconComponent: { name: 'cil-chart-line' },
      },
      {
        name: 'Mega CC Roads Map',
        url: '/ol/display',
        iconComponent: { name: 'cil-map' },
    
      },
      {
        name: 'Mega CC Reports',
        iconComponent: { name: 'cil-chart-pie' },
        children: [
          // {
          //   name: 'Date Wise Task Details',
          //   url: '/location/report/taskdetailsreport',
          //   iconComponent: { name: 'cil-chart-line' },
          // },
       
          {
            name: 'Zone Wise Report',
            url: '/location/report/zonewisereport',
            iconComponent: { name: 'cil-chart-line' },
          },
          {
            name: 'Ward Wise Report',
            url: '/location/report/wardwisereport',
            iconComponent: { name: 'cil-chart-line' },
          },
          {
            name: 'Contractor Wise Report',
            url: '/location/report/contractorwisereport',
            iconComponent: { name: 'cil-chart-line' },
          },
          {
            name: 'Road Wise Report',
            url: '/location/report/roadwisereport',
            iconComponent: { name: 'cil-chart-line' },
          },
          {
            name: 'Contractor Remarks',
            url: '/location/report/contractorremarksreport',
            iconComponent: { name: 'cil-chart-line' },
          },
          {
            name: 'Defaulter List',
            url: '/location/report/locationdataentry',
            iconComponent: { name: 'cil-chart-line' },
          },
        ],
      },
    
    ]
  },
  {
    name: 'Non Mega CC Roads',
    iconComponent: { name: 'cil-list-rich' },
    children: [
      {
        name: 'Non Mega CC Roads',
        url: '/location/nonmegacclist',
        iconComponent: { name: 'cil-chart-line' },
      },
      // {
      //   name: 'Mega CC Roads Map',
      //   url: '/ol/display',
      //   iconComponent: { name: 'cil-map' },
    
      // },
      // {
      //   name: 'Mega CC Reports',
      //   iconComponent: { name: 'cil-chart-pie' },
      //   children: [
      //     // {
      //     //   name: 'Date Wise Task Details',
      //     //   url: '/location/report/taskdetailsreport',
      //     //   iconComponent: { name: 'cil-chart-line' },
      //     // },
       
      //     {
      //       name: 'Zone Wise Report',
      //       url: '/location/report/zonewisereport',
      //       iconComponent: { name: 'cil-chart-line' },
      //     },
      //     {
      //       name: 'Ward Wise Report',
      //       url: '/location/report/wardwisereport',
      //       iconComponent: { name: 'cil-chart-line' },
      //     },
      //     {
      //       name: 'Contractor Wise Report',
      //       url: '/location/report/contractorwisereport',
      //       iconComponent: { name: 'cil-chart-line' },
      //     },
      //     {
      //       name: 'Road Wise Report',
      //       url: '/location/report/roadwisereport',
      //       iconComponent: { name: 'cil-chart-line' },
      //     },
      //     {
      //       name: 'Contractor Remarks',
      //       url: '/location/report/contractorremarksreport',
      //       iconComponent: { name: 'cil-chart-line' },
      //     },
      //     {
      //       name: 'Defaulter List',
      //       url: '/location/report/locationdataentry',
      //       iconComponent: { name: 'cil-chart-line' },
      //     },
      //   ],
      // },
    
    ]
  },
  {
    name: 'Mastic Work',
    iconComponent: { name: 'cil-list-rich' },
    children: [
      {
        name: 'Mastic Work List',
        url: '/location/masticworklist',
        iconComponent: { name: 'cil-chart-line' },
      },
      {
        name: 'Mastic Road List',
        url: '/location/masticroadlist',
        iconComponent: { name: 'cil-chart-line' },
      }
    ]
  },
  {
    name: 'Data Entry',
    iconComponent: { name: 'cil-plus' },
    children: [
      {
        name: 'Data Entry',
        url: '/location/createdataentry',
        iconComponent: { name: 'cil-plus' },
      },
    ],
  },
];


export const masticWork: INavData[] = [
  {
    name: 'Mastic Work',
    iconComponent: { name: 'cil-list-rich' },
    children: [
      {
        name: 'List',
        url: '/location/masticworklist',
        iconComponent: { name: 'cil-chart-line' },
      },
   
    ]
  },

];

