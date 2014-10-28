Ext.define('OCHSignUp.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar', 'Ext.field.Email', 'Ext.field.DatePicker'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
		    {
			    title: 'OCH SignMeUp',
				xtype: 'titlebar',
				docked: 'top'
			},
            {
                title: 'Signups',
                iconCls: 'home',

                styleHtmlContent: true,
                scrollable: true,
                xtype: 'signupview',                   

            },
            {
                title: 'Admin',
                iconCls: 'action',

                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Admin Console'
                    },
					{
					     xtype: 'button',
						 id: 'resetBtn',
						 ui: 'confirm',
						 text:'Start Signup',
						 docked: 'bottom'
						 
					},
					{  
					     xtype: 'button',
						 id: 'getcntBtn',
						 ui: 'action',
						 text:'Get Attended Count',		
						 docked: 'bottom'						 
					},
					{
					     xtype: 'button',
						 id: 'crtevntBtn',
						 ui: 'action',
						 text:'Create Event',	
						 docked: 'bottom'						 
					},
					{
					     xtype: 'button',
						 id: 'showallBtn',
						 ui: 'action',
						 text:'Show All',	
						 docked: 'bottom'						 
					}
                ]
            },
			{
			     title: 'Add Member',
				 iconCls: 'user',
				 xtype: 'formpanel',
				 id: 'addNewEmpForm',
				 items: [
				 {
				     docked: 'top',
					 xtype:'titlebar',
					 title: 'Add New Member'
				 },
				 {
                         xtype: 'fieldset',
                         items: [
                         {
                             xtype: 'textfield',
                             label: 'Employee ID',
                             id: 'empidField',
                             name: 'empid',
							 required: true
                         },
						 {   
						     xtype: 'textfield',
                             label: 'Employee Name',
                             id: 'empnameField',
                             name: 'empname',
							 required: true,
						 },
                         {
                             xtype: 'emailfield',
                             label: 'Employee Email',
							 placeHolder: 'xxx@oracle.com',
                             id: 'empemlField',
                             name: 'empeml',
							 required: true
						
                         },
						 {
						     xtype: 'emailfield',
                             label: 'Manager Email',
							 placeHolder: 'xxx@oracle.com',
                             id: 'mgremlField',
                             name: 'mgreml'
						 },
						 {
						     xtype: 'datepickerfield',
                             label: 'Employee Birthdate',
                             id: 'empbdayField',
                             name: 'dob',
							 label: 'Birthdate',
							 value: new Date()
						 },
						 {
						     xtype: 'selectfield',
							 id: 'ochyrField',
                             name: 'ochyr',
							 label: 'OCH Year',
							 value: '2014',
							 options: [{text: '2013', value: '2013'},{text: '2014', value: '2014'}],
							 required: true
						 }]
                 },
                 {   
                         xtype: 'button',
                         id: 'submitBtn',
                         ui: 'action',
                         padding: '10px',
			             text: 'Submit',
					     docked: 'bottom'
                 }
				 
				 ]
				 
			}
        ]
    }
});
