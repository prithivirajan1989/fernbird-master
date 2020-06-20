interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    // badge: {
    //   variant: 'info',
    //   text: 'NEW'
    // }
  },
  {
    divider: true
  },

  {
    title: true,
    name: 'Items',
  },
  {

  },
  {
    name: 'Products',
    url: '/products',
    icon: 'fa fa-cart-arrow-down'
  },
  {
    name: 'Stock Register',
    url: '/stocks',
    icon: 'fa fa-stack-exchange'
  },
 
  
 

 
      
  

  {
    divider: true
  },
  {
    divider: true
  },
  
  {
    title: true,
    name: 'Customers',
  },
  {

  },
  {
    name: 'Customers',
    url: '/customers',
    icon: 'fa fa-user'
  },
   
  {
    name: 'Sales Order',
    url: '/salesorder',
    icon: 'fa fa-shopping-cart'
  },
  // {
  //   name: 'Packages',
  //   url: '/custome',
  //   icon: 'fa fa-archive'
  // },
  {
    name: 'Delivery Challans',
    url: '/deliverychallan',
    icon: 'fa fa-truck'
  },

  {
    name: 'Invoices ',
    url: '/invoice',
    icon: 'fa fa-file-text'
  },

  {
    divider: true
  },
  {
    divider: true
  },
  
  {
    title: true,
    name: 'Vendors',
  },

  {
    name: 'Vendors ',
    url: '/suplier',
    icon: 'fa fa-shopping-basket'
  },
  
  {
    name: 'Purchase Orders ',
    url: '/purchase',
    icon: 'fa fa-shopping-bag'
  },
  {
    name: 'Bills ',
    url: '/bill',
    icon: 'fa fa-file-text-o'
  },
  // {
  //   title: true,
  //   name: 'Theme'
  // },
  // {
  //   name: 'Colors',
  //   url: '/theme/colors',
  //   icon: 'icon-drop'
  // },
  // {
  //   name: 'Typography',
  //   url: '/theme/typography',
  //   icon: 'icon-pencil'
  // },
  // {
  //   title: true,
  //   name: 'Components'
  // },
  // {
  //   name: 'Base',
  //   url: '/base',
  //   icon: 'icon-puzzle',
  //   children: [
  //     {
  //       name: 'Cards',
  //       url: '/base/cards',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Carousels',
  //       url: '/base/carousels',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Collapses',
  //       url: '/base/collapses',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Forms',
  //       url: '/base/forms',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Pagination',
  //       url: '/base/paginations',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Popovers',
  //       url: '/base/popovers',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Progress',
  //       url: '/base/progress',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Switches',
  //       url: '/base/switches',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Tables',
  //       url: '/base/tables',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Tabs',
  //       url: '/base/tabs',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Tooltips',
  //       url: '/base/tooltips',
  //       icon: 'icon-puzzle'
  //     }
  //   ]
  // },
  // {
  //   name: 'Inventory',
  //   url: '/buttons',
  //   icon: 'icon-cursor',
  //   children: [
  //     {
  //       name: 'Product List',
  //       url: '/buttons/buttons',
  //       icon: 'icon-cursor'
  //     },
  //     {
  //       name: 'Export Transport',
  //       url: '/buttons/dropdowns',
  //       icon: 'icon-cursor'
  //     },
  //     {
  //       name: 'Stock List',
  //       url: '/buttons/brand-buttons',
  //       icon: 'icon-cursor'
  //     },
  //     {
  //       name: 'Grading & Packing',
  //       url: '/buttons/brand-buttons',
  //       icon: 'icon-cursor'
  //     }
  //   ]
  // },
  // {
  //   name: 'Customers',
  //   url: '/customers',
  //   icon: 'icon-pie-chart'
  // },
  // {
  //   name: 'Invoice',
  //   url: '/invoice',
  //   icon: 'icon-pie-chart'
  // },
 
  
  
  

  
  // {
  //   name: 'Marketing',
  //   url: '/icons',
  //   icon: 'icon-star',
  //   children: [
  //     {
  //       name: 'Purchase',
  //       url: '/icons/coreui-icons',
  //       icon: 'icon-star',
  //       badge: {
  //         variant: 'success',
  //         text: 'NEW'
  //       },
  //       children: [
  //         {
  //           name: 'Order',
  //           url: '/icons/flags',
  //           icon: 'icon-star'
  //         },
  //         {
  //           name: 'Return',
  //           url: '/icons/flags',
  //           icon: 'icon-star'
  //         },
  //         {
  //           name: 'Recipt',
  //           url: '/icons/flags',
  //           icon: 'icon-star'
  //         },
  //       ]
  //     },
  //     {
  //       name: 'Sales',
  //       url: '/icons/flags',
  //       icon: 'icon-star',
  //       children: [
  //         {
  //           name: 'Ouotation',
  //           url: '/icons/flags',
  //           icon: 'icon-star'
  //         },
  //         {
  //           name: 'Order',
  //           url: '/icons/flags',
  //           icon: 'icon-star'
  //         },
  //         {
  //           name: 'Note',
  //           url: '/icons/flags',
  //           icon: 'icon-star'
  //         },
  //       ]
  //     },
  //     {
  //       name: 'Harvesting Contacting Form',
  //       url: '/icons/font-awesome',
  //       icon: 'icon-star',
  //       badge: {
  //         variant: 'secondary',
  //         text: '4.7'
  //       }
  //     },
  //   ]
  // },
  // {
  //   name: 'Account',
  //   url: '/notifications',
  //   icon: 'icon-bell',
  //   children: [
  //     {
  //       name: 'Account Leader',
  //       url: '/notifications/alerts',
  //       icon: 'icon-bell'
  //     },
  //     {
  //       name: 'Account Trade',
  //       url: '/notifications/badges',
  //       icon: 'icon-bell'
  //     },
  //     {
  //       name: 'Account Year',
  //       url: '/notifications/modals',
  //       icon: 'icon-bell'
  //     }
  //   ]
  // },
  // {
  //   name: 'HR & Payroll',
  //   url: '/widgets',
  //   icon: 'icon-calculator',
  //   badge: {
  //     variant: 'info',
  //     text: 'NEW'
  //   },
  //   children: [
  //     {
  //       name: 'Labour',
  //       url: '/notifications/modals',
  //       icon: 'icon-bell',
  //       children: [
  //         {
  //           name: 'Daily Wages',
  //           url: '/notifications/modals',
  //           icon: 'icon-bell'
  //         },
  //         {
  //           name: 'Weekly wages',
  //           url: '/notifications/modals',
  //           icon: 'icon-bell'
  //         }
  //       ]
  //     },
  //     {
  //       name: 'Staff',
  //       url: '/notifications/modals',
  //       icon: 'icon-bell',
  //       children: [
  //         {
  //           name: 'Monthly Salary',
  //           url: '/notifications/modals',
  //           icon: 'icon-bell'
  //         }
  //       ]
  //     },

  //   ]
  // },
  {
    divider: true
  },
  // {
  //   title: true,
  //   name: 'Extras',
  // },
  // {
  //   name: 'Pages',
  //   url: '/pages',
  //   icon: 'icon-star',
  //   children: [
  //     {
  //       name: 'Login',
  //       url: '/login',
  //       icon: 'icon-star'
  //     },
  //     {
  //       name: 'Register',
  //       url: '/register',
  //       icon: 'icon-star'
  //     },
  //     {
  //       name: 'Error 404',
  //       url: '/404',
  //       icon: 'icon-star'
  //     },
  //     {
  //       name: 'Error 500',
  //       url: '/500',
  //       icon: 'icon-star'
  //     }
  //   ]
  // },

  // {
  //   name: 'Reports',
  //   url:  '/settings/users',
  //   icon: 'icon-cursor',
   
  // },
  
];
