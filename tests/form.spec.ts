import { test, expect } from '@playwright/test';
import { PlaywrightAgent } from '@midscene/web/playwright';
import * as path from 'path';

test.describe('Practice Form Verification', () => {

  test('Test 1: Verify practice form page is loaded', async ({ page }) => {
    await page.goto('/automation-practice-form');
    const agent = new PlaywrightAgent(page);
    await agent.aiAssert('The Student Registration Form header is visible on the page');
  });

  test('Test 2: Verify all form fields are filled and submitted correctly', async ({ page }) => {
    test.setTimeout(180000);

    const testData = {
      firstName: 'User',
      lastName: 'Test',
      email: 'test.email@test.com',
      gender: 'Male',
      mobile: '1234567890',
      subjects: 'Maths, Computer Science',
      hobbies: 'Sports, Reading, Music',
      fileName: 'manul.jpg',
      filePath: path.join(__dirname, '../assets/manul.jpg'),
      address: 'Street',
      state: 'NCR',
      city: 'Delhi',
      expectedStateCityModal: 'NCR Delhi',
    };

    await page.goto('/automation-practice-form');
    const agent = new PlaywrightAgent(page);

    await agent.ai(`
      Fill First Name with "${testData.firstName}", Last Name with "${testData.lastName}",
      Email with "${testData.email}", Gender as "${testData.gender}", Mobile as "${testData.mobile}".
    `);

    await agent.ai(`
      Type "Maths" into Subjects and select "Maths".
      Type "Computer" into Subjects and select "Computer Science".
      Check Hobbies: Sports, Reading, Music.
    `);

    await page.setInputFiles('#uploadPicture', testData.filePath);

    await agent.ai(`
      Fill Address with "${testData.address}".
      Select State "${testData.state}" and City "${testData.city}".
      Click Submit button.
    `);

    await agent.aiAssert(`
      The modal "Thanks for submitting the form" is displayed with correct values:
      - Student Name: "${testData.firstName} ${testData.lastName}"
      - Student Email: "${testData.email}"
      - Gender: "${testData.gender}"
      - Mobile: "${testData.mobile}"
      - Subjects: "${testData.subjects}"
      - Hobbies: "${testData.hobbies}"
      - Picture: "${testData.fileName}"
      - Address: "${testData.address}"
      - State and City: "${testData.expectedStateCityModal}"
    `);
  });

});