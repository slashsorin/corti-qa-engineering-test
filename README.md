# Corty QA Enginering Test
Testing the Pestore APIs using Playwright

## Steps to setup and run the tests

1. Clone the repository
2. `npm install` - inside the `corti-qa-engineering-test` directory
3. `npx playwright test` - this will run all the tests available in the `/tests` folder

OR

4. `npx playwright test simpleHappyPath.spec.ts` - this will run only the test suite inside the `simpleHappyPath.spec.ts` file

## Additional solution documentation

### What was implemented:

The solution showcases testing of the pet API endpoints for:

POST /pet

POST /pet{petId}/uploadImage

PUT /pet

DELETE /pet/{petId}

*ToDo: add coverage for the other endpoints & API sections inside the swagger documentation.*

### Tool used:
The Playwright test automation framework: https://playwright.dev/.

### What was implemented:
<ul>
<li>Testing valid, non-valid, and unsupported ID values and file types.</li>
<li>Tests parameterisation: running the same test multiple times with different inputs.</li>
<li>Testing flows: implemented one happy path flow: create pet, upload image to pet, update pet info, delete pet.</li>
<li>For defining/grouping the tests, I used the <i>describe</i> interface from Playwright using the <i>test</i> and <i>test.step</i> annotations. In certain scenarios we might need to use the <i>beforeEach, beforeAll, afterEach, afterAll</i> test hooks.</li>
</ul>

### Bonus:
#### CI/CD
The current implementation is able to be set & run via a CI/CD tool, eg. TeamCity.

I foresee the following steps in the setup:
<ul>
<li>The CI/CD server has access to clone the test repository</li>
<li>Framework setup/installation via <i>npm install</i></li>
<li>Running test: <i>npx playwright test</i></li>
<li>We can have a bunch of other optional steps depending of the setup:
<ul>
<li>We might want to setup/reset a DB before running tests</li>
<li>We might need to spin up an environment</li>
<li>A custom reporting step</li>
</ul>
</li>
</ul>

Other configurations:
<ul>
<li>
Automated triggers after a successful deployment of the app-in-test to a test environment.</li>
<li>Parameters for the test job: test environment name, etc.</li>
</ul>

#### Test rerun-ability & repeatability:
<ul>
<li>
As the good practices of test automation recommend, the tests should be re-runnable, independent from each other, focused to a single feature of the application under test (*all these, as much as possible).</li>
<li>In order to have re-runnable tests it is important to have a mechanism that handles the test data.</li>
<li>Example of such mechanisms:
<ul>
<li>Database reset to a known starting state (with pre-populated data in it)</li>
<li>On-the-fly test data creation before each test or test suite.</li>
<li>The test data handling mechanism is vital for the tests' assertions to pass.</li>
</ul></li>
</ul>

#### Reporting:
<ul>
<li>Playwright default HTML reporter</li>
<li>Slack or MS Teams per team channel notifications</li>
<li>In CI/CD, eg. TeamCity, the report can be saved in the Artifacts (test runs can also be followed via the Build Log)</li>
<li>3rd-party reporters for Playwright, eg. Monocart, Tesults, ReportPortal, etc.</li>
</ul>