describe('BuktiRadService service', function () {
  beforeEach(module('app'));
  it('should', angular.mock.inject(function (BuktiRadService) {
    expect(BuktiRadService.getData()).toEqual(3);
  }));
});
