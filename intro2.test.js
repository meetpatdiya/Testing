import {
  describe,
  it,
  expect,
  vi,
} from "vitest";
import { getUser, getName, readUserConfig, generateApiKey, apiConfig, LoggerClass } from "./userService.js";
import { normalMethod, getApi, getCurrentDate, createTrackingToken, max,fizzBuzz } from "./intro.js";
import db from "./db.js";
import axios from "axios";
import fs from "fs/promises";
import crypto from "crypto";

vi.mock("./db.js");
vi.mock("axios");
vi.mock("fs/promises");
vi.mock("crypto");
// mock entire imported module (npm/user made)
describe("module mocking", () => {
  it("gets user", async () => {
    db.query.mockResolvedValue([[{ id: 1, name: "meet" }]])
    const user = await getUser(1);
    expect(user).toEqual({ id: 1, name: "meet" });
    expect(db.query).toHaveBeenCalledWith('select * from users where id = 1');
  })

  // here axios returns data:{} so here data: is necessary
  it("axios", async () => {
    axios.get.mockResolvedValue({ data: { id: 1, name: "meet" } });
    const user = await getName(1);
    expect(user).toEqual({ id: 1, name: "meet" });
    expect(axios.get).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/users/1`);
  })

  it("mocks fs/promises for reading files", async () => {
    fs.readFile.mockResolvedValue('{"theme":"dark","notifications":true}');
    const config = await readUserConfig();
    expect(config).toEqual({ theme: "dark", notifications: true });
    expect(fs.readFile).toHaveBeenCalledWith('user-config.json', 'utf-8');
  })

  it("mocks crypto to control random behavior", () => {
    const mockBuffer = Buffer.from('0123456789abcdef0123456789abcdef');
    crypto.randomBytes.mockReturnValue(mockBuffer);
    const key = generateApiKey();
    expect(key).toBe(mockBuffer.toString('hex'));
    expect(crypto.randomBytes).toHaveBeenCalledWith(32);
  })

  it("partially mocks userService", async () => {
    // Use vi.doMock to isolate this mock to only this test case
    vi.doMock("./userService.js", async (importOriginal) => {
      const actual = await importOriginal();
      return {
        ...actual,
        generateApiKey: vi.fn().mockReturnValue("mocked-api-key")
      };
    });

    const mockedUserService = await import("./userService.js");

    expect(mockedUserService.generateApiKey()).toBe("mocked-api-key");
    expect(typeof mockedUserService.getUser).toBe("function");
    expect(mockedUserService.sum(1, 2)).toBe(3);

    // Clean up the module mock for future tests
    vi.doUnmock("./userService.js");
  })
})

describe("object/classes mocking", () => {
  it("1. Mocking an object's method with spyOn", async () => {
    const spy = vi.spyOn(normalMethod, 'norm').mockResolvedValue({ name: "mocked obj" });
    const result = await normalMethod.norm("test user");
    expect(result).toEqual({ name: "mocked obj" });
    expect(spy).toHaveBeenCalledWith("test user");
    spy.mockRestore();
  });

  it("2. Nested object mocks", () => {
    const spy = vi.spyOn(apiConfig.auth, 'getToken').mockReturnValue("mocked-nested-token");
    const token = apiConfig.auth.getToken();
    expect(token).toBe("mocked-nested-token");
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  it("3. Mocking a class method via prototype", () => {
    const spy = vi.spyOn(LoggerClass.prototype, 'logInfo').mockImplementation(() => { });
    const logger = new LoggerClass();
    logger.logInfo("test message");
    expect(spy).toHaveBeenCalledWith("test message");
    spy.mockRestore();
  });

  it("4. Mocking class constructors globally with vi.doMock", async () => {
    vi.doMock("./userService.js", async (importOriginal) => {
      const actual = await importOriginal();
      return {
        ...actual,
        LoggerClass: vi.fn().mockImplementation(function () {
          return {
            logInfo: vi.fn().mockReturnValue("completely mocked logger")
          };
        })
      };
    });

    const { LoggerClass: MockedLogger } = await import("./userService.js");
    const logger = new MockedLogger();

    expect(logger.logInfo()).toBe("completely mocked logger");
    vi.doUnmock("./userService.js");
  });
})
describe("fake timers", () => {
  it("timeout", () => {
    // useFakeTime is used to mock the timers
    vi.useFakeTimers();
    const fun = vi.fn();
    setTimeout(fun, 1000);
    expect(fun).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1000);
    expect(fun).toHaveBeenCalled();
    vi.useRealTimers();
  })
  it("interval", () => {
    vi.useFakeTimers();
    const job = vi.fn();
    setInterval(job, 1000);
    vi.advanceTimersByTime(3000);
    expect(job).toHaveBeenCalledTimes(3);
    vi.useRealTimers();
  })
  it("all timers", () => {
    // runalltimers is used to run all the timers at once
    vi.useFakeTimers();
    const fn = vi.fn();
    setTimeout(fn, 1000);
    setTimeout(fn, 5000);
    vi.runAllTimers();
    expect(fn).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  })
})

describe("mock environments", () => {
  it("get api key", () => {
    vi.stubEnv("API_KEY", "mocked-key");
    expect(getApi()).toBe("mocked-key");
    vi.unstubAllEnvs()
  })
  it("gets current time", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2023-01-01"));
    expect(getCurrentDate()).toEqual(new Date("2023-01-01").getTime());
    vi.useRealTimers();
  })
  it("creates tracking token", () => {
    vi.stubGlobal("crypto", {
      randomUUID: () => "test-uuid-123"
    });

    expect(createTrackingToken()).toBe("test-uuid-123");

    vi.unstubAllGlobals();
  });
  it("Maths", () => {
    const randomSpy = vi
      .spyOn(Math, "random")
      .mockReturnValue(0.5);

    expect(Math.random()).toBe(0.5);

    randomSpy.mockRestore();
  })
})

describe("parameterized testing", () => {
  it.each([[1, 2, 2], [10, 5, 10], [-1, -2, -1]])("max", (a, b, expected) => {
    expect(max(a, b)).toBe(expected)
  })
  it.each([[5, "Buzz"], [15, "FizzBuzz"], [3, "Fizz"], [1, "1"]])("fizzBuzz", (input, expected) => {
    expect(fizzBuzz(input)).toBe(expected)
  })
})
describe("snapshot",()=>{
  it("name snapshot",()=>{
    const result = {
      name:"Meet Soni",
      age:21,
      city:"Ahmedabad"
    }
    expect(result).toMatchSnapshot();
  })
})
console.log("Coverage Test")
console.log("npx vitest --coverage");
  // This command is used to check how much code was actually executed by my tests
  // You must test all branches of a func in if(){}else{}
