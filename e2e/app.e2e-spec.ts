import { NgrailsPage } from './app.po';

describe('ngrails App', function() {
  let page: NgrailsPage;

  beforeEach(() => {
    page = new NgrailsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
