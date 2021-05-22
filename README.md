# Lab8_Starter

## Authors 
- Emily Jewik 
- Vivian Yan 

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)

A   

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.

No because the message feature involves interaction with other components since it allows users to write to one another. 

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters

Yes because this feature can be tested without involving interaction with other components. 

1. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?

If the "headless" field is set to true, then our puppeteer tests would be able to run without a browser UI. 

2. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?

describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
    await page.click('img');
    await page.waitForTimeout(500);
  });

