describe('AvatarService service', function () {
  beforeEach(module('app'));
  it('should', angular.mock.inject(function (AvatarService) {
    expect(AvatarService.getData()).toEqual(3);
  }));
});
