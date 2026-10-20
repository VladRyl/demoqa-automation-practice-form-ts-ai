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
    const testData = {
      firstName: 'User',
      lastName: 'Test',
      email: 'test.email@test.com',
      gender: 'Male',
      mobile: '1234567890',
      dateOfBirthInput: '01 Jan 1990',
      dateOfBirthModal: '01 January,1990',
      subjects: {
        input1: 'Maths',
        select1: 'Maths',
        input2: 'Computer',
        select2: 'Computer Science',
        expectedModal: 'Maths, Computer Science',
      },
      hobbies: ['Sports', 'Reading', 'Music'],
      expectedHobbiesModal: 'Sports, Reading, Music',
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
      1. Fill "First Name" with "${testData.firstName}" and "Last Name" with "${testData.lastName}".
      2. Enter email "${testData.email}".
      3. Select Gender "${testData.gender}".
      4. Enter Mobile number "${testData.mobile}".
      5. Set Date of Birth to "${testData.dateOfBirthInput}".
      6. Type "${testData.subjects.input1}" into Subjects and select "${testData.subjects.select1}" from the drop-down.
      7. Type "${testData.subjects.input2}" into Subjects and select "${testData.subjects.select2}" from the drop-down.
      8. Check Hobbies: ${testData.hobbies.join(', ')}.
      9. Upload file "${testData.filePath}" to Picture field.
      10. Fill Current Address with "${testData.address}".
      11. Select State "${testData.state}" and City "${testData.city}".
      12. Scroll down and click the "Submit" button.
    `);

    await agent.aiAssert(`
      The modal window titled "Thanks for submitting the form" is visible and contains:
      - Student Name: "${testData.firstName} ${testData.lastName}"
      - Student Email: "${testData.email}"
      - Gender: "${testData.gender}"
      - Mobile: "${testData.mobile}"
      - Date of Birth: "${testData.dateOfBirthModal}"
      - Subjects: "${testData.subjects.expectedModal}"
      - Hobbies: "${testData.expectedHobbiesModal}"
      - Picture: "${testData.fileName}"
      - Address: "${testData.address}"
      - State and City: "${testData.expectedStateCityModal}"
    `);

    await agent.ai('Click the "Close" button on the modal window.');
  });

});