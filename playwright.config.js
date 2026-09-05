// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: 'html',
  timeout: 40000,

  expect:{
    timeout:10000
  },
  
  use:{
    browserName : 'chromium',
    headless : false,
    //screenshot : 'only-on-failure',
  }
})