export const SIDEBAR_NAV_ITEMS = [
  {
    title: true,
    name: 'Categories'
  },
  {
    name: 'Reecharge',
    url: '/reecharge',
    icon: 'icon-screen-smartphone',
    children: [
      {
        name: 'Mobile',
        url: '/reecharge/mobile',
        icon: 'icon-screen-smartphone'
      },
      {
        name: 'DTH',
        url: '/reecharge/dth',
        icon: 'icon-puzzle'
      },
      {
        name: 'Datacard',
        url: '/reecharge/datacard',
        icon: 'icon-puzzle'
      },
      {
        name: 'Broadband',
        url: '/reecharge/broadband',
        icon: 'icon-puzzle'
      },
      {
        name: 'Landline',
        url: '/reecharge/landline',
        icon: 'icon-puzzle'
      },
      {
        name: 'Electricity',
        url: '/reecharge/electricity',
        icon: 'icon-puzzle'
      },
      {
        name: 'Gas',
        url: '/reecharge/gas',
        icon: 'icon-puzzle'
      },
      {
        name: 'Metro',
        url: '/reecharge/metro',
        icon: 'icon-puzzle'
      },
      {
        name: 'Water',
        url: '/reecharge/water',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Travel',
    url: '/travel',
    icon: 'icon-screen-smartphone',
    children: [
      {
        name: 'Flight',
        url: '/travel/flight',
        icon: 'icon-puzzle'
      },
      {
        name: 'Bus',
        url: '/travel/bus',
        icon: 'icon-puzzle'
      },
      {
        name: 'Cab',
        url: '/travel/cab',
        icon: 'icon-puzzle'
      }
    ]
  }
];
