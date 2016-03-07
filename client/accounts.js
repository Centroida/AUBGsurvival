Accounts.ui.config({
    requestPermissions: {},
    extraSignupFields: [{
        fieldName: 'name',
        fieldLabel: 'Name',
        inputType: 'text',
        visible: true,
        validate: function(value, errorFunction) {
          if (!value) {
            errorFunction("Please, write your first name");
            return false;
          } else {
            return true;
          }
        }
    },
    {
        fieldName: 'alive',
        fieldLabel: 'Status',
        inputType: 'text',
        visible: false,
    },
    {
        fieldName: 'token',
        fieldLabel: 'token',
        inputType: 'text',
        visible: false,
    },
    {
        fieldName: 'hunters',
        fieldLabel: 'hunters',
        inputType: 'array',
        visible: false
    },
    {
        fieldName: 'target',
        fieldLabel: 'target',
        inputType: 'text',
        visible: false,
    },

  ]
});
