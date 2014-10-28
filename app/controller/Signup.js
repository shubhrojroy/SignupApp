Ext.define('OCHSignUp.controller.Signup', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            checkinBtn: '#checkinBtn',
			empTxtFld: '#empidTextField',
			emlTxtFld: '#emailTextField',
			resetBtn: '#resetBtn',
			getcntBtn: '#getcntBtn',
			submitBtn: '#submitBtn',
			empidFld: '#empidField',
			empnmFld: '#empnameField',
			empemlFld: '#empemlField',
			mgremlFld: '#mgremlField',
			empbdayFld: '#empbdayField',
			ochyrFld: '#ochyrField',
			addNewEmpForm: '#addNewEmpForm'
			
        },
        control: {
            checkinBtn: {
                tap: 'onCheckinButtonTap'
            },
			resetBtn: {
			     tap: 'onResetButtonTap'
			},
			getcntBtn: {
			     tap: 'onGetcntButtonTap'
			},
			submitBtn: {
			     tap: 'onSubmitButtonTap'
			},
            
        }
    },
	onSubmitButtonTap: function() {
         var values = this.getAddNewEmpForm().getValues();
         // Form Validation		 
		 if (values.empid == ''|| values.empname =='' || values.empeml ==''|| values.ochyr =='')
		    Ext.Msg.alert('OCH SighMeUp', 'Please complete all required fields!');
	     else if (!Ext.isNumeric(values.empid))
		    Ext.Msg.alert('OCH SighMeUp', 'Please enter valid Employee ID');
	     else if(values.empeml.indexOf("@oracle.com") == -1)
		    Ext.Msg.alert('OCH SighMeUp', 'Please enter valid Oracle Email');
	     else if(values.mgreml != '' && values.mgreml.indexOf("@oracle.com") == -1)
		    Ext.Msg.alert('OCH SighMeUp', 'Please enter valid Manager Email');
		 else
		 {
		     this.getAddNewEmpForm().reset();			 
		 // Make Ajax call to signupdml.php here
	    	 Ext.Ajax.request({
               url: 'http://localhost/SignupAppv2/php/signupdml.php?action=new',
               method: 'post',
			   params: {
                empid: values.empid,
				name: values.empname,
				email: values.empeml,
				mgreml: values.mgreml,
				dob: Ext.Date.format(values.dob,"m/d/Y"),
				ochyr: values.ochyr
               },
               success: function (res) {

                var Response = Ext.JSON.decode(res.responseText);
                if (Response.success == true) {
                    Ext.Msg.alert('OCH SighMeUp', Response.message + ' Checked In!', Ext.emptyFn);
                } else {
                    Ext.Msg.alert('OCH SighMeUp', 'Update Failed: '+ Response.message, Ext.emptyFn);
                }
               },
               failure: function (res) {
                 Ext.Msg.alert('OCH SighMeUp', 'Fatal Error: Checkin Failed!', Ext.emptyFn);
               }
             }); 
         }
	 },
	onCheckinButtonTap: function() {
	     var empid = this.getEmpTxtFld().getValue();
		 var email = this.getEmlTxtFld().getValue();
		 if (empid =='' && email == '')
	   	    Ext.Msg.alert('OCH SighMeUp', 'Please enter either Employee ID or Oracle Email', Ext.emptyFn);
		 else
		 {
		 this.getEmpTxtFld().setValue('');
         this.getEmlTxtFld().setValue('');		 
		 
		 // Make Ajax call to signupdml.php here
		 
		 Ext.Ajax.request({
            url: 'http://localhost/SignupAppv2/php/signupdml.php?action=checkin',
            method: 'post',
			params: {
                empid: empid,
				email: email
            },
            success: function (res) {

                var Response = Ext.JSON.decode(res.responseText);
                if (Response.success == true) {
                    Ext.Msg.alert('OCH SighMeUp', Response.message + ' Checked In!', Ext.emptyFn);
                } else {
                    Ext.Msg.alert('OCH SighMeUp', 'Update Failed: '+ Response.message, Ext.emptyFn);
                }
            },
            failure: function (res) {
                Ext.Msg.alert('OCH SighMeUp', 'Fatal Error: Checkin Failed!', Ext.emptyFn);
            }
        });
		
		}

	 },
	onResetButtonTap: function() {
	     Ext.Ajax.request({
            url: 'http://localhost/SignupAppv2/php/signupdml.php?action=reset',
            method: 'post',
            success: function (res) {

                var Response = Ext.JSON.decode(res.responseText);
                if (Response.success == true) {
                    Ext.Msg.alert('OCH SighMeUp', ' Ready for Friday Lunch Checkin. Expected Count: '+Response.message, Ext.emptyFn);
                } else {
                    Ext.Msg.alert('OCH SighMeUp', 'Setup Failed: '+Response.message, Ext.emptyFn);
                }
            },
            failure: function (res) {
                Ext.Msg.alert('OCH SighMeUp', 'Fatal Error: Setup Failed!', Ext.emptyFn);
            }
        });
	},
	onGetcntButtonTap: function() {
	     Ext.Ajax.request({
            url: 'http://localhost/SignupAppv2/php/signupdml.php?action=getcnt',
            method: 'post',
            success: function (res) {

                var Response = Ext.JSON.decode(res.responseText);
                if (Response.success == true) {
                    Ext.Msg.alert('OCH SighMeUp', 'Attended: '+Response.message , Ext.emptyFn);
                } else {
                    Ext.Msg.alert('OCH SighMeUp', 'Fetch Failed! ', Ext.emptyFn);
                }
            },
            failure: function (res) {
                Ext.Msg.alert('OCH SighMeUp', 'Fatal Error!', Ext.emptyFn);
            }
        });
	}
    	 
});