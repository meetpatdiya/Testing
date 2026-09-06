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

## Walking through `intro.test.js`

The file tests a small utility module (`intro.js`) and doubles as a tour of Vitest's core features.

**Basic function testing** — `max`, `fizzBuzz`, `calculateAverage`, and `calculateFactorial` are tested with plain `expect(...).toBe(...)` calls, including edge cases like no arguments, empty arrays, and invalid input (negative numbers, strings).

**Matchers beyond `toBe`** — the "Match Testing" block shows off a few other useful assertions:

```js
expect(getUser()).toEqual({ name: "Meet", age: 21 }); // deep equality for objects
expect(getUser()).toHaveProperty("name");              // checks a key exists
expect(() => throwError()).toThrow();                  // expects a function to throw
```

**Async testing** — `ayncName()` and `asyncError()` show the three ways Vitest handles promises: `await`-ing the result directly, using `.resolves` for a value you expect to succeed, and `.rejects` for one you expect to fail with a specific error message.

**Mocking with `vi.fn()`** — the biggest section. Mocks replace real (slow/expensive) dependencies with fake, trackable stand-ins. The file demonstrates:

- Tracking calls: `toHaveBeenCalled`, `toHaveBeenCalledTimes`, `toHaveBeenCalledWith`
- Faking return values: `mockReturnValue`, `mockResolvedValue`, `mockRejectedValue`
- Faking entire behavior: `mockImplementation`, for both sync and async logic

It ends with a combined, real-world-style example: a `registerUser` function that depends on `saveUser` and `sendEmail`. Both dependencies are mocked, and the test verifies not just the final result, but *how* those dependencies were called — a good pattern to copy for testing anything that talks to a database or external API.

## Running the tests

```bash
npm test
```

---

