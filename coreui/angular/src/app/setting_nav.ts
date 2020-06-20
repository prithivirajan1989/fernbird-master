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
      name: 'Profile',
    },
    {
  
    },

    
    {
      name: 'Personal Information',
      url: '/settings',
      icon: 'fa fa-asterisk'
    },
     
    {
      name: 'Brand Logo',
      url: '/settings/',
      icon: 'fa fa-asterisk'
    },
    
    
  
    {
      divider: true
    },
    {
      divider: true
    },
    
    {
      title: true,
      name: 'Security',
    },
  
    
    
    {
      name: ' Change Password  ',
      url: '/settings/forget_password',
      icon: 'fa fa-asterisk'
    },

    {
      name: ' Active Sessions ',
      url: '/settings/sessions',
      icon: 'fa fa-asterisk'
    },
    
   
    {
      divider: true
    },
   
    
  ];
  