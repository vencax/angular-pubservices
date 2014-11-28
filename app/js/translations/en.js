angular.module("app")

.config(function ($translateProvider) {

  $translateProvider.translations('en', {
    TITLE: 'Hello',
    LOADING: 'This is a paragraph',
    HOME: 'Hom',
    BUY: 'Buy',
    REMAINING: 'Remaining',
    EXPIRES: 'Expires',
    DESC: 'Description',
    SETTINGS: 'Settings',
    VALID_TICKETS: 'Valid tickets',
    NO_VALID_TICKETS: 'You have no valid ticket!',
    HISTORY: 'History',
    HISTORY_TITLE: 'Credit history',
    HISTORY_NOTYET: 'You have no history yet',
    IFYOUCANNOTLOGIN: 'If you cannot login, please contact us',
    FORGOTTEN_PWD: 'Have you forgotten your password',
    INPUTPWD: 'Please input your password',
    INPUTUSERNAME: 'Please input your username',
    LOGIN: 'Log in',
    LOGOUT: 'Logout',
    REGISTER_H1: 'Please fill in the form',
    REGISTER_NAME_REQ: 'Please input your name',
    REGISTER_EMAIL_REQ: 'Please input your email',
    REGISTER_EMAIL_INVALID: 'Email is invalid',
    REGISTER_EMAIL_ALREADYREG: 'Email is already registered',
    REGISTER_PWD_REQ: 'Please input your password',
    REGISTER_PWD_REPEAT_VALID: 'Please input your password once again for sure',
    REGISTER_PWD_REPEAT_NOTMATCH: 'Both passwords doesnot match',
    REGISTER_CHANGE_PWD_H1: 'Change your password',
    RIGHTSREMOVED: 'all rights removed'
  });

});
