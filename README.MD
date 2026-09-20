# Testing in JavaScript — Notes + Practical Walkthrough

A quick reference on software testing concepts, paired with a real test file (`intro.test.js`) written with **Vitest** to show the theory in action.

## What counts as testing?

- **Manual Testing** — a person clicks around the app and checks if things work as expected.
- **Automated Testing** — you write code that tests your code, so it runs itself.

## Granularity of tests

| Level | What it checks |
|---|---|
| Unit | One function/method in isolation |
| Integration | How multiple modules work together |
| System / E2E | The whole application, end to end |

Test counts usually follow the **testing pyramid**: `Unit > Integration > E2E`. Unit tests are cheap and fast, so you write a lot of them; E2E tests are slow and expensive, so you write fewer. That said, the right ratio depends on your app — some projects lean more heavily on integration tests.

Testing is just one phase inside the **SDLC**: Requirement → Analysis → Design → Coding → Testing → Deployment.

## Two mindsets

- **Black-box testing** — you only care about input vs. output, not how it's implemented internally.
- **White-box testing** — you inspect and verify the internal logic/components directly.

And two goals to keep separate:

- **Build the right product** — it should actually work.
- **Build the product right** — it should match what the client asked for.

Don't forget non-functional stuff either: your app should feel smooth and scale without lagging.

## Why bother with unit testing?

- Catches bugs early
- Makes refactoring safer
- Pushes you toward better code quality
- Acts as living documentation

You don't need 100% coverage — aim to cover critical modules reliably. Think of unit testing as an investment in quality, not a checkbox. Tests themselves should be **maintainable, robust, and trustworthy**, and named clearly — a confusing test name is almost as bad as no test.

## The AAA pattern

Every good test follows **Arrange → Act → Assert**:

1. **Arrange** – set up the data/environment
2. **Act** – perform the action being tested
3. **Assert** – check the result matches what you expected

(Like: turn on the TV → press the power button → verify it's on.)

## Two ways to build software

1. Code first, test later
2. **Test-Driven Development (TDD)** — write the test first, then the code to satisfy it

TDD naturally gives you 100% coverage on what you build and keeps you from over-engineering, since you only write enough code to pass the test.

## Frameworks

A testing framework bundles a test runner, assertion library, mocking tools, and coverage reporting. Common ones: Jest, Mocha, Jasmine, Vitest, Cypress, Playwright.

- **Jest** — the oldest, most widely used, but built for older/CommonJS-style JS.
- **Vitest** — newer, with native support for ESM, TypeScript, and JSX. That's what this repo uses.

---

## Project Files Overview

This repository serves as a practical guide and playground for testing with Vitest. Below is a short overview of what each file does:

### Source Files (The Code Under Test)
- **`intro.js`**: A collection of basic utility functions (math operations, async functions, objects) used to demonstrate foundational testing concepts.
- **`userService.js`**: A real-world-style service file that interacts with external dependencies (database via `db.js`, HTTP requests via `axios`, file system via `fs/promises`, and native modules like `crypto`). It also includes a `LoggerClass` and an `apiConfig` object to demonstrate advanced class and nested object mocking.
- **`db.js`**: A dummy database configuration and query file used as a dependency in `userService.js`.

### Test Files (The Examples)
- **`intro.test.js`**: A beginner-friendly test suite covering Vitest's core features. It demonstrates basic matchers (`toBe`, `toEqual`, `toThrow`), testing promises/async logic, and fundamental function mocking with `vi.fn()`.
- **`intro2.test.js`**: An advanced test suite focusing on complex mocking scenarios. It covers:
  - **Module Mocking**: Globally mocking external dependencies like `axios` and `fs/promises` using `vi.mock()`.
  - **Partial Mocking**: Isolating module mocks for a single test using `vi.doMock()`.
  - **Object & Class Mocking**: Spying on methods using `vi.spyOn()`, mocking class prototypes, and globally mocking constructors.
  - **Fake Timers**: Controlling time using `vi.useFakeTimers()` to test `setTimeout` and `setInterval` without actually waiting.

## Running the Tests

To run the test suite (Vitest runs in watch mode by default):

```bash
npm test
```
