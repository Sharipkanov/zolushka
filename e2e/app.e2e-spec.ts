import { ZolushkaPage } from './app.po';

describe('zolushka App', () => {
  let page: ZolushkaPage;

  beforeEach(() => {
    page = new ZolushkaPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
