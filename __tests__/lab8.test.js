describe('Basic user flow for SPA ', () => {
  beforeAll(async () => { // changed from beforeAll to beforeEach to run before every test case
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    await page.click('journal-entry');
    const url = await page.url();
    expect(url).toBe('http://127.0.0.1:5500/#entry1');
    
  });

  // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
  it('Test4: On first Entry page - checking page header title', async () => {
    const header = await page.$eval('body > header > h1', el => el.innerHTML);
    expect(header).toBe('Entry 1');

  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
 
    const entryPage = await page.$('entry-page');
    const entry = await entryPage.getProperty('entry');
    const entryContent = await entry.jsonValue();

    expect(entryContent.title).toBe('You like jazz?');
    expect(entryContent.date).toBe('4/25/2021');
    expect(entryContent.content).toBe('According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don\'t care what humans think is impossible.');
    expect(entryContent.image.src).toBe('https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455');
    expect(entryContent.image.alt).toBe('bee with sunglasses');

  }, 10000);

  // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
  it('Test6: On first Entry page - checking <body> element classes', async () => {
    const classAttr = await page.evaluate('document.querySelector("body").getAttribute("class")');
    expect(classAttr).toBe('single-entry');

  });

  // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    await page.click('img');
    const url = await page.url();
    expect(url).toBe('http://127.0.0.1:5500/#settings');

  });

  // implement test8: Clicking on the settings icon should update the header to be “Settings”
  it('Test8: On Settings page - checking page header title', async () => {
    const header = await page.$eval('body > header > h1', el => el.innerHTML);
    expect(header).toBe('Settings');

  });

      // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
  it('Test9: On Settings page - checking <body> element classes', async () => {
    const classAttr = await page.evaluate('document.querySelector("body").getAttribute("class")');
    expect(classAttr).toBe('settings');

  });

  // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    await page.goBack();
    const url = await page.url();
    expect(url).toBe('http://127.0.0.1:5500/#entry1');

  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button once should bring the user back to the home page', async() => {
    await page.goBack();
    const url = await page.url();
    expect(url).toBe('http://127.0.0.1:5500/');

  });

  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('Test12: When the user if on the homepage, the header title should be “Journal Entries”', async() => {
    const header = await page.$eval('body > header > h1', el => el.innerHTML);
    expect(header).toBe('Journal Entries');

  });


  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13: On the home page the <body> element should not have any class attribute', async() => {
    const classAttr = await page.evaluate('document.querySelector("body").getAttribute("class")');
    expect(classAttr).toBe('');

  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Verify the url is correct when clicking on the second entry', async() => {
    await page.click('journal-entry:nth-child(2)');
    const url = await page.url();
    expect(url).toBe('http://127.0.0.1:5500/#entry2');

  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: Verify the title is current when clicking on the second entry', async() => {
    const header = await page.$eval('body > header > h1', el => el.innerHTML);
    expect(header).toBe('Entry 2');
  });


  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16: Verify the entry page contents is correct when clicking on second entry', async() => {
    const entryPage = await page.$('entry-page');
    const entry = await entryPage.getProperty('entry');
    const entryContent = await entry.jsonValue();

    expect(entryContent.title).toBe('Run, Forrest! Run!');
    expect(entryContent.date).toBe('4/26/2021');
    expect(entryContent.content).toBe('Mama always said life was like a box of chocolates. You never know what you\'re gonna get.');
    expect(entryContent.image.src).toBe('https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg');
    expect(entryContent.image.alt).toBe('forrest running');
  });


  // create your own test 17
  it('Test17: Clicking on "Entry 2" will lead users back to homepage and URL should have no hash fragment' , async() => {
    await page.click('body > header > h1');
    const url = page.url();
    expect(url).toBe('http://127.0.0.1:5500/')

  });

  // create your own test 18
  it('Test18: Verify audio is not undefined in entry 10', async() => {
    await page.click('journal-entry:nth-child(10)');
    const entryPage = await page.$('entry-page');
    const entry = await entryPage.getProperty('entry');
    const entryContent = await entry.jsonValue();

    expect(entryContent.audio).not.toBe(undefined);

  }, 10000);


  // create your own test 19
  it('Test19: Verify clicking on the back button two times after the user has clicked the first journal entry and then clicked settings will take them back to the home page', async() => {
    await page.goto('http://127.0.0.1:5500');
    await page.click('journal-entry');
    await page.click('img');
    await page.goBack();
    await page.goBack();
    const url = page.url();
    expect(url).toBe('http://127.0.0.1:5500/');
  }, 15000);


  // create your own test 20
  it('Test20: Verify image is not undefined in entry 10', async() => {
    await page.click('journal-entry:nth-child(10)');
    const entryPage = await page.$('entry-page');
    const entry = await entryPage.getProperty('entry');
    const entryContent = await entry.jsonValue();

    expect(entryContent.image).not.toBe(undefined);

  }, 10000);

  
});
