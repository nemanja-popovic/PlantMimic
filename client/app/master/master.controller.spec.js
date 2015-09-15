'use strict';

describe('Controller: MasterCtrl', function () {
    
    // load the controller's module
    beforeEach(module('plantMimicApp'));
    
    var MasterCtrl, scope;
    
    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        MasterCtrl = $controller('MasterCtrl', {
            $scope: scope
        });
    }));
    
    it('should ...', function () {
        expect(1).toEqual(1);
    });
});
