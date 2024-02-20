import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },

  {
    name: 'Master Data',
    iconComponent: { name: 'cil-chart-line' },

    children: [
      {
        name: 'Project',
        url: '/location/list',
        iconComponent: { name: 'cil-chart-line' },
      },
      {
        name: 'Module',
        url: '/module/list',
        iconComponent: { name: 'cil-description' },
      },
      {
        name: 'Unit',
        url: '/unit/list',
        iconComponent: { name: 'cil-description' },
      },
      {
        name: 'User',
        url: '/user/list',
        iconComponent: { name: 'cil-chart-line' },
      },
    ],
  },

  {
    name: 'Attributes',
    iconComponent: { name: 'cil-chart-line' },

    children: [
      // {
      //   name: 'P&M Attributes',
      //   url: '/location/assetpandmattributelist',
      //   iconComponent: { name: 'cil-chart-line' },
      // },
      {
        name: 'Data Entry Attributes',
        url: '/location/dataentryassetpandmattributelist',
        iconComponent: { name: 'cil-chart-line' },
      },
      {
        name: 'Data Entry Group List',
        url: '/location/dataentrygrouplist',
        iconComponent: { name: 'cil-chart-line' },
      },

    ],
  },

  {
    name: 'Data Entry',
    iconComponent: { name: 'cil-chart-line' },

    children: [
      {
        name: 'Data Entry',
        url: '/location/createdataentry',
        iconComponent: { name: 'cil-chart-line' },
      },
    ],
  },
  
];

export const navAEEEMajorItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    name: 'Silt Quantity',
    url: '/reports/slitqualitity',
    iconComponent: { name: 'cil-description' },
  },
  {
    name: 'Cumulative Major Nalla Report',
    url: '/reports/CumulativeMajorNallahReport',
    iconComponent: { name: 'cil-chart-line' },
  },
  // {
  //   name: 'Cumulative Minor Nalla Report',
  //   url: '/reports/CumulativeMinorNallahReport' ,
  //   iconComponent: { name: 'cil-chart-line' },
  // },

  {
    name: 'Workcode wise Report',
    url: '/reports/WorkcodeWiseReport',
    iconComponent: { name: 'cil-chart-line' },
  },
  {
    name: 'Major Nalla Progress Report',
    iconComponent: { name: 'cil-chart-line' },

    children: [
      {
        name: 'Pre-Monsoon',
        url: '/reports/MajorProgressPreMansoonReport',
      },
      {
        name: 'During-Monsoon',
        url: '/reports/MajorProgressDuringMansoonReport',
      },
    ],
  },
  // {
  //   name: 'Minor Nalla Progress Report',
  //   iconComponent: { name: 'cil-chart-line' },
  //   children: [
  //     {
  //       name: 'Pre-Monsoon',
  //       url: '/reports/MinorProgressPreMansoonReport'
  //     },
  //     {
  //       name: 'During-Monsoon',
  //       url: '/reports/MinorProgressDuringMansoonReport'
  //     }
  //   ]
  // },
  {
    name: 'Billable Silt Report',
    url: '/reports/BillableSiltReport',
    iconComponent: { name: 'cil-description' },
  },
  {
    name: 'Tripwise Silt Report',
    url: '/reports/TripwiseSiltReport',
    iconComponent: { name: 'cil-description' },
  },
  {
    name: 'View Site Vehicle Image',
    url: '/reports/ViewSiteVehicleImage',
    iconComponent: { name: 'cil-description' },
  },
  {
    name: 'View Nalla Loading Videos',
    url: '/reports/ViewNallahLoadingVideos',
    iconComponent: { name: 'cil-description' },
  },

  {
    name: 'Loading Trip Search Report',
    url: '/reports/loadingtrips',
    iconComponent: { name: 'cil-description' },
  },
];
export const navAEEEHighwayItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  // {
  //   name: 'Silt Quantity',
  //   url: '/reports/slitqualitity',
  //   iconComponent: { name: 'cil-description' },
  // },
  {
    name: 'Cumulative Major Nalla Report',
    url: '/reports/CumulativeMajorNallahReport',
    iconComponent: { name: 'cil-chart-line' },
  },
  // {
  //   name: 'Cumulative Minor Nalla Report',
  //   url: '/reports/CumulativeMinorNallahReport' ,
  //   iconComponent: { name: 'cil-chart-line' },
  // },

  {
    name: 'Workcode wise Report',
    url: '/reports/WorkcodeWiseReport',
    iconComponent: { name: 'cil-chart-line' },
  },
  {
    name: 'Major Nalla Progress Report',
    iconComponent: { name: 'cil-chart-line' },

    children: [
      {
        name: 'Pre-Monsoon',
        url: '/reports/MajorProgressPreMansoonReport',
      },
      {
        name: 'During-Monsoon',
        url: '/reports/MajorProgressDuringMansoonReport',
      },
    ],
  },
  // {
  //   name: 'Minor Nalla Progress Report',
  //   iconComponent: { name: 'cil-chart-line' },
  //   children: [
  //     {
  //       name: 'Pre-Monsoon',
  //       url: '/reports/MinorProgressPreMansoonReport'
  //     },
  //     {
  //       name: 'During-Monsoon',
  //       url: '/reports/MinorProgressDuringMansoonReport'
  //     }
  //   ]
  // },
  {
    name: 'Billable Silt Report',
    url: '/reports/BillableSiltReport',
    iconComponent: { name: 'cil-description' },
  },
  {
    name: 'Tripwise Silt Report',
    url: '/reports/TripwiseSiltReport',
    iconComponent: { name: 'cil-description' },
  },
  {
    name: 'View Site Vehicle Image',
    url: '/reports/ViewSiteVehicleImage',
    iconComponent: { name: 'cil-description' },
  },
  {
    name: 'View Nalla Loading Videos',
    url: '/reports/ViewNallahLoadingVideos',
    iconComponent: { name: 'cil-description' },
  },

  {
    name: 'Loading Trip Search Report',
    url: '/reports/loadingtrips',
    iconComponent: { name: 'cil-description' },
  },
];
export const navAEEEMinorItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  // {
  //   name: 'Silt Quantity',
  //   url: '/reports/slitqualitity',
  //   iconComponent: { name: 'cil-description' },
  // },
  // {
  //   name: 'Cumulative Major Nalla Report',
  //   url: '/reports/CumulativeMajorNallahReport',
  //   iconComponent: { name: 'cil-chart-line' },
  // },
  {
    name: 'Cumulative Minor Nalla Report',
    url: '/reports/CumulativeMinorNallahReport',
    iconComponent: { name: 'cil-chart-line' },
  },

  // {
  //   name: 'Workcode wise Report',
  //   url: '/reports/WorkcodeWiseReport',
  //   iconComponent: { name: 'cil-chart-line' },
  // },
  // {
  //   name: 'Major Nalla Progress Report',
  //   iconComponent: { name: 'cil-chart-line' },

  //   children: [
  //     {
  //       name: 'Pre-Monsoon',
  //       url: '/reports/MajorProgressPreMansoonReport'
  //     },
  //     {
  //       name: 'During-Monsoon',
  //       url: '/reports/MajorProgressDuringMansoonReport'
  //     }
  //   ]
  // },
  {
    name: 'Minor Nalla Progress Report',
    iconComponent: { name: 'cil-chart-line' },
    children: [
      {
        name: 'Pre-Monsoon',
        url: '/reports/MinorProgressPreMansoonReport',
      },
      {
        name: 'During-Monsoon',
        url: '/reports/MinorProgressDuringMansoonReport',
      },
    ],
  },
  {
    name: 'Billable Silt Report',
    url: '/reports/BillableSiltReport',
    iconComponent: { name: 'cil-description' },
  },
  {
    name: 'Tripwise Silt Report',
    url: '/reports/TripwiseSiltReport',
    iconComponent: { name: 'cil-description' },
  },
  {
    name: 'View Site Vehicle Image',
    url: '/reports/ViewSiteVehicleImage',
    iconComponent: { name: 'cil-description' },
  },
  {
    name: 'View Nalla Loading Videos',
    url: '/reports/ViewNallahLoadingVideos',
    iconComponent: { name: 'cil-description' },
  },

  {
    name: 'Loading Trip Search Report',
    url: '/reports/loadingtrips',
    iconComponent: { name: 'cil-description' },
  },
];

export const navItemsUser: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    name: 'Billable Silt Report',
    url: '/reports/BillableSiltReport',
    iconComponent: { name: 'cil-description' },
  },
  {
    name: 'Tripwise Silt Report',
    url: '/reports/TripwiseSiltReport',
    iconComponent: { name: 'cil-description' },
  },
  {
    name: 'View Site Vehicle Image',
    url: '/reports/ViewSiteVehicleImage',
    iconComponent: { name: 'cil-description' },
  },
  {
    name: 'View Nalla Loading Videos',
    url: '/reports/ViewNallahLoadingVideos',
    iconComponent: { name: 'cil-description' },
  },

  {
    name: 'Loading Trip Search Report',
    url: '/reports/loadingtrips',
    iconComponent: { name: 'cil-description' },
  },
];
