# Hacı Arpaci - QA Task UI % API - Playwright/JavaScript

## Overview
This project contains automated UI and API tests for the QA Task using Playwright/JavaScript. 
The structure supports both web UI and REST API testing, with reusable page objects, helpers,
and test data management.

## Project Structure

```
├── pages/
│   ├── api/                # API /pet endpoints class
│   └── ui/                 # Page Object Model classes for UI
├── tests/
│   ├── api/                # API test cases
│   ├── ui/                 # UI test cases
│   └── testdata/           # Test data (JSON)
├── utils/                  # Helper and verification utilities
│   ├── UIVerifications.js     # UI assertion helpers
│   └── ApiVerifications.js    # API assertion helpers
├── playwright.config.js    # Playwright configuration
├── package.json            # Project dependencies and scripts
├── test-results/           # Playwright test results (gitignored)
├── playwright-report/      # Playwright HTML reports
```

## Getting Started

### Prerequisites
- Node.js >= 16.x
- npm >= 8.x

### Install Dependencies
```
npm install
```

### Install Browsers
```
npx playwright install
```

## Running Tests

### Run All UI and API Tests
```
npx playwright test
```

### Run Only UI Tests
```
npx playwright test tests/ui
```

### Run Only API Tests
```
npx playwright test tests/api
```

### Run UI Tests in Headed Chrome
```
npx playwright test tests/ui --headed --project=chromium
```

### Run UI Tests in Headed Firefox
```
npx playwright test tests/ui --headed --project=firefox
```

## Project Scripts
You can add custom scripts in `package.json` for common test runs, e.g.:
```json
{
  "scripts": {
    "test:ui": "npx playwright test tests/ui",
    "test:api": "npx playwright test tests/api",
    "test:chrome": "npx playwright test tests/ui --headed --project=chromium",
    "test:firefox": "npx playwright test tests/ui --headed --project=firefox"
  }
}
```
To run scripts, use for example: `npm run test:chrome` or `npm run test:api` etc.

## Test Data
- UI test data: `tests/testdata/ui/testDataUi.json`
- API test data: `tests/testdata/api/testDataApi.json`

## Utilities
- `utils/UIVerifications.js`: UI assertion helpers
- `utils/ApiVerifications.js`: API assertion helpers

## Reports
- After running tests, view the HTML report:
```
npx playwright show-report
```

## Notes
This framework includes all the features required in the TASK requirements section.
➔ A test case should be written using any programming language and framework (Python or Java + Selenium would be preferable): JavaScript and Playwright framework is selected as a modern framework.
➔ No BDD(Cucumber, Quantum, Codeception, etc.) frameworks are allowed
➔ The screenshot should be taken if the test fails one of the steps: It is configured in (playwright.config.js) file
➔ The test case should be able to run in Chrome and Firefox browsers and ensure that the browser is parametrically changeable: It is configured in (playwright.config.js) file
➔ Test code should fully meet POM requirements

---

**Author:** Haci Arpaci
