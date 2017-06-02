
const { Builder, By, until } = require('selenium-webdriver');

const driver = new Builder()
    .forBrowser('chrome')
    .build();

beforeEach(() => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  driver.get('http://localhost:3000/');
});

describe('Test Desktop', () => {


  it('Show overlay', () => {
    driver.findElement(By.css('.nav-items li:nth-child(3) .primary')).click();

    return driver.findElement(By.css('.overlay'))
      .getAttribute('class')
      .then((element) => {
        expect(element.includes('active')).toBe(true);
      });
  });
});

describe('Test Mobile', () => {


  it('Show overlay', () => {
    driver.manage().window().setSize(500, 768);
    driver.findElement(By.css('.open-close')).click();

    return driver.findElement(By.css('.overlay'))
      .getAttribute('class')
      .then((element) => {
        expect(element.includes('active')).toBe(true);
      });
  });
});

afterAll(() => {
  driver.quit();
});


