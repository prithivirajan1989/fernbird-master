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
    {   icon: 'fa fa-arrow-left',
        name: 'back',
        url: '/dashboard',
      
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
      name: 'Settings',
    },
    {
  
    },

    
    {
      name: 'Organization Profile',
      url: '/orgsettings',
      icon: 'fa fa-asterisk'
    },
     
    {
      name: 'Users & roles',
      url: '/orgsettings/users',
      icon: 'fa fa-asterisk'
    },

    {
        name: 'Warehouses',
        url: '/orgsettings/warehouse',
        icon: 'fa fa-asterisk'
      },
    
    
  
    {
      divider: true
    },
    

    
    // {
    //   name: ' Prefernces ',
    //   url: '/settings/forget_password',
    //   icon: 'fa fa-asterisk'
    // },

    {
        divider: true
      },

      // {
      //   name: 'Curencies',
      //   url: '/settings/sessions',
      //   icon: 'fa fa-asterisk'
      // },

    
    {
        name: 'Taxes',
        url: '/orgsettings/taxes',
        icon: 'fa fa-asterisk'
      },
    
   
    {
      divider: true
    },

    

      {
        divider: true
      },

      // {
      //   name: 'Templates',
      //   url: '/settings/sessions',
      //   icon: 'fa fa-asterisk'
      // },
      {
        name: 'SMS Notfications',
        url: '/orgsettings/smsintegration',
        icon: 'fa fa-asterisk'
      },
      
     

      {
        divider: true
      },

      {
        name: 'Online Payments',
        url: '/orgsettings/onlinePayments',
        icon: 'fa fa-asterisk'
      },
      // {
      //   name: 'Ingerations',
      //   url: '/settings/sessions',
      //   icon: 'fa fa-asterisk'
      // },

      {
        divider: true
      },

     
      {
        divider: true
      },

      {
        name: 'Data Backup',
        url: '/orgsettings/databackup',
        icon: 'fa fa-asterisk'
      },
      // {
      //   name: 'Subscription',
      //   url: '/settings/sessions',
      //   icon: 'fa fa-asterisk'
      // },

     
     
    
  ];
  