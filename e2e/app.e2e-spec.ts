import { MyappPage } from './app.po';

describe('myapp App', () => {
  let page: MyappPage;

  beforeEach(() => {
    page = new MyappPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
