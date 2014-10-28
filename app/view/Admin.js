Ext.define('OCHSignUp.view.Admin', {
     extend: 'Ext.form.Panel',
	 xtype: 'adminview',
	 alias: 'widget.adminview',
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
             title: 'Admin Console'
		 }],
         
	 },

});