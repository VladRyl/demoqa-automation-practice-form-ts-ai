import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 90000,
  use: {
    baseURL: 'https://demoqa.com',
    headless: false,
    viewport: { width: 1280, height: 720 },
    screenshot: 'on',
  },
});