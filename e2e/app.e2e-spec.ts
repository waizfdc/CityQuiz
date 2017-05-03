import { CityQuizPage } from './app.po';

describe('city-quiz App', () => {
  let page: CityQuizPage;

  beforeEach(() => {
    page = new CityQuizPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
