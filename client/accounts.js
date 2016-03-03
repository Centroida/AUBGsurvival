Accounts.ui.config({
    requestPermissions: {},
    extraSignupFields: [{
        fieldName: 'name',
        fieldLabel: 'Name',
        inputType: 'text',
        visible: true,
        validate: function(value, errorFunction) {
          if (!value) {
            errorFunction("Please write your first name");
            return false;
          } else {
            return true;
          }
        }
    },{
        fieldName: 'status',
        fieldLabel: 'Status',
        inputType: 'text',
        visible: false,
    },{
        fieldName: 'token',
        fieldLabel: 'token',
        inputType: 'text',
        visible: false,
    },{
        fieldName: 'assigned',
        fieldLabel: 'assigned',
        inputType: 'text',
        visible: false,
    },{
        fieldName: 'assignedTo',
        fieldLabel: 'assignedTo',
        inputType: 'array',
        visible: false,
    },{
        fieldName: 'statusAssigned',
        fieldLabel: 'statusAssigned',
        inputType: 'boolean',
        visible: false,
    },
    
    ]
});

 