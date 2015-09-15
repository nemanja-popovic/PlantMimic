'use strict';

angular.module('plantMimicApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('first-page', {
        url: '/',
        templateUrl: 'app/first-page/first-page.html',
        controller: 'FirstPageCtrl'
      });
  });