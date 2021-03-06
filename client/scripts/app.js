'use strict';

var app = angular.module('fitMunk', [
  'fm.services',
  'fm.lobby',
  'fm.navbar',
  'fm.dashboard',
  'fm.achievements',
  'fm.tournament',
  'ui.router'
])
  
.config(function($stateProvider, $locationProvider) {
  $stateProvider
    .state('dashboard',{
      url        : '/dashboard',
      template   : '<fm-dashboard></fm-dashboard>',
      controller : 'DashboardCtrl'
    })
    .state('lobby',{
      url        : '/lobby',
      template   : '<fm-lobby></fm-lobby>',
      controller : 'LobbyCtrl'
    })
    .state('achievements',{
      url           : '/achievements',
      templateUrl   : '../scripts/achievements/achievements.html',
      controller    : 'AchievementsCtrl'
    })
    .state('main',{
      url        : '',
      template   : '<fm-lobby></fm-lobby>',
      controller : 'LobbyCtrl'
    })
    .state('tournament', {
      url: '/tournament/:tournament_id',
      template: '<fm-tournament></fm-tournament>',
      controller: 'tournamentCtrl'
    })
});