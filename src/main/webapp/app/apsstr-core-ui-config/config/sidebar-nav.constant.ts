export const SIDEBAR_NAV_ITEMS = [
  {
    title: true,
    name: 'Categories'
  },
  {
    name: 'Reecharge',
    url: '/',
    icon: 'icon-screen-smartphone',
    children: [
      {
        name: 'Mobile',
        url: '/cashback/mobile',
        icon: 'icon-screen-smartphone'
      },
      // {
      //   name: 'DTH',
      //   url: '/',
      //   icon: 'icon-puzzle'
      // },
      // {
      //   name: 'Datacard',
      //   url: '/',
      //   icon: 'icon-puzzle'
      // }
    ]
  },
  // {
  //   name: 'Travel',
  //   url: '/',
  //   icon: 'icon-cursor',
  //   children: [
  //     {
  //       name: 'Flight',
  //       url: '/',
  //       icon: 'icon-cursor'
  //     },
  //     {
  //       name: 'Hotel',
  //       url: '/',
  //       icon: 'icon-cursor'
  //     }
  //   ]
  // }
];
