import { NewProjectPage } from './app.po';

describe('money-tracker-ui App', function() {
  let page: MoneyTrackerUiPage;

  beforeEach(() => {
    page = new MoneyTrackerUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
