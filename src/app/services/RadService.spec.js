describe('RadService service', function () {
  beforeEach(module('app'));
  it('should', angular.mock.inject(function (RadService) {
    expect(RadService.getData()).toEqual(3);
  }));
});
