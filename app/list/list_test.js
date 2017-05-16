'use strict';

describe('myApp.list module', function() {

  beforeEach(module('myApp.repository'));
  beforeEach(module('myApp.list'));

  var timeoutMock = function() {};
  var anyUrl = 'any url';
  var anyId = 'any id';
  var anyData = {data: {any: 'data'}};

  // @todo revise, rationalize, reuse the mocks if possible

  describe('list controller', function(){

    it('should initialize', inject(function($controller) {

      var ListCtrl = $controller('ListCtrl');

      expect(ListCtrl).toBeDefined();
      expect(ListCtrl.loading).toBeTruthy();
      expect(ListCtrl.error).toBeFalsy();
      expect(ListCtrl.archives).toEqual([]);

    }));

    describe('.isEmpty', function() {

      var ListCtrl;
      beforeEach(inject(function($controller) {
        ListCtrl = $controller('ListCtrl');
      }));

      it('should return true when items empty', function() {
        ListCtrl.archives = [];
        expect(ListCtrl.isEmpty()).toBeTruthy();
      });

      it('should return false when items not empty', function() {
        ListCtrl.archives = [1,2,3];
        expect(ListCtrl.isEmpty()).toBeFalsy();
      });

    });

    describe('.reload', function() {

      var $q, $controller, $rootScope, $scope, $timeout, archiveRepository;
      var deferred, repositoryMock;

      beforeEach(inject(function(_$q_, _$controller_, _$rootScope_, _$timeout_, _archiveRepository_) {
        $q = _$q_;
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $timeout = _$timeout_;
        archiveRepository = _archiveRepository_;

        deferred = $q.defer();
        repositoryMock = {
          list: function() {
            return deferred.promise;
          }
        };
      }));

      it('when loading', function() {
        var ListCtrl = $controller('ListCtrl', {
          archiveRepository: repositoryMock,
          $timeout: timeoutMock
        });
        ListCtrl.loading = false;
        ListCtrl.reload();
        expect(ListCtrl.loading).toBeTruthy();
      });

      it('after loading, on success', function() {
        var ListCtrl = $controller('ListCtrl', {
          archiveRepository: repositoryMock,
          $timeout: timeoutMock,
          $scope: $scope
        });
        ListCtrl.reload();
        deferred.resolve(anyData);
        $scope.$apply();
        expect(ListCtrl.archives).toEqual(anyData.data);
        expect(ListCtrl.loading).toBeFalsy();
        expect(ListCtrl.error).toBeFalsy();
      });

      it('after loading, on error', function() {
        var ListCtrl = $controller('ListCtrl', {
          archiveRepository: repositoryMock,
          $timeout: timeoutMock,
          $scope: $scope
        });
        ListCtrl.reload();
        deferred.reject();
        $scope.$apply();
        expect(ListCtrl.archives).toEqual([]);
        expect(ListCtrl.loading).toBeFalsy();
        expect(ListCtrl.error).toBeTruthy();
      });

    });

    describe('.viewUrl', function() {

      var $controller, archiveRepository;
      beforeEach(inject(function(_$controller_, _archiveRepository_) {
        $controller = _$controller_;
        archiveRepository = _archiveRepository_;
      }));

      it('should proxy', function() {

        spyOn(archiveRepository, 'getViewUrl').and.returnValue(anyUrl);

        var ListCtrl = $controller('ListCtrl', {
          $timeout: timeoutMock,
          archiveRepository: archiveRepository
        });

        var result = ListCtrl.viewUrl(anyId);
        expect(result).toEqual(anyUrl);
        expect(archiveRepository.getViewUrl).toHaveBeenCalled();

      });

    })

    xdescribe('.delete', function() {
      // @todo...
    })

  });

});
