# Playwright Automation Assignment - SauceDemo

This project contains automated End-to-End tests for `https://www.saucedemo.com/` using Playwright with TypeScript.

## Features
- **Framework**: Playwright with TypeScript.
- **Design Pattern**: Page Object Model (POM) for clean, maintainable test scripts.
- **Test Data**: Data-driven testing utilizing an external JSON file (`data/testData.json`).
- **Browser Execution**: Configured strictly to run tests on **Chromium**.
- **Coverage**: 22 automated test scripts covering:
  - Login flows (Positive & Negative)
  - Product Inventory (Sorting, Validations, Add/Remove Cart)
  - Cart Management
  - Checkout Flows (Validations, E2E Order Completion)

## Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- npm (Node Package Manager)

## Setup Instructions

1. **Clone the repository** (or download the source files):
   ```bash
   git clone <repository_url>
   cd playwright
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install Playwright Browsers** (Chromium):
   ```bash
   npx playwright install chromium
   ```

## Execution Instructions

To execute all the test scripts sequentially or in parallel using Chromium:

**Run in Headless Mode (Default):**
```bash
npx playwright test
```

**Run in Headed Mode (Watch the browser execute the actions):**
```bash
npx playwright test --headed
```

**Run a Specific Test File:**
```bash
npx playwright test tests/login.spec.ts
```

## View HTML Report
After execution, Playwright automatically generates an HTML report (and will launch it if any test fails). To view it manually:

```bash
npx playwright show-report
```

## Project Structure

```text
├── data/
│   └── testData.json         # External test data for credentials, products, and checkout info
├── pages/
│   ├── CartPage.ts           # POM for cart screen
│   ├── CheckoutPage.ts       # POM for checkout screens (step one, two, complete)
│   ├── InventoryPage.ts      # POM for main product listing screen
│   └── LoginPage.ts          # POM for login screen
├── tests/
│   ├── cart.spec.ts          # Cart validation tests
│   ├── checkout.spec.ts      # Checkout flow tests
│   ├── inventory.spec.ts     # Product sorting and inventory tests
│   └── login.spec.ts         # Login tests (Positive and Negative scenarios)
├── playwright.config.ts      # Configuration tailored for Chromium
├── package.json              # Node.js dependencies
└── README.md                 # Project documentation
```


## Screenshots
<img width="1366" height="736" alt="output1" src="https://github.com/user-attachments/assets/c88b7bae-a5e1-45df-90a0-b04e1b70db3e" />


<img width="1366" height="729" alt="output2" src="https://github.com/user-attachments/assets/e55e22ee-2b55-4d90-be73-d06c23d57795" />


<img width="1366" height="730" alt="output3" src="https://github.com/user-attachments/assets/0909585e-2345-4deb-91d3-9878be0ff668" />


<img width="1366" height="482" alt="output4" src="https://github.com/user-attachments/assets/00a93c32-2146-4f87-a8ab-2f6ff9cd6936" />
