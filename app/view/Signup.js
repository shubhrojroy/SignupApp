Ext.define('OCHSignUp.view.Signup', {
     extend: 'Ext.form.Panel',
	 xtype: 'signupview',
	 requires: [
        'Ext.TitleBar', 'Ext.form.FieldSet', 'Ext.dataview.List'
     ],
	 config:{
	     layout:{
				 align: 'stretch',
				 pack: 'center'
		},
	     items: [
		 {
		     docked: 'top',
             xtype: 'titlebar',
             title: 'SignUp Console'
		 },
		 {
		     items: [
			 {
                 xtype: 'fieldset',
                 items: [
                    {
                        xtype: 'textfield',
                        label: 'Employee ID',
						placeHolder: 'Use Employee ID',
                        id: 'empidTextField',
                        name: 'empidTextField',
                    },
                    {
                        xtype: 'emailfield',
                        label: 'Email',
						placeHolder: 'Or Oracle Email',
                        id: 'emailTextField',
                        name: 'emailTextField',
						autoComplete: true,
						
                    }]
             },
             {   
                     xtype: 'button',
                     id: 'checkinBtn',
                     ui: 'action',
                     padding: '10px',
			         text: 'CheckIn',
					 docked: 'bottom',

             }]
			 
		 }],
         
	 },

});