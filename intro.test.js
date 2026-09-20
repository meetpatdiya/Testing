import {
  describe,
  test,
  it,
  expect,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
  vi,
} from "vitest";
import {
  max,
  fizzBuzz,
  calculateAverage,
  calculateFactorial,
  getUser,
  getName,
  getNumbers,
  getScore,
  throwError,
  ayncName,
  asyncError,
  normalMethod,
} from "./intro.js";

describe("max", () => {
  it("should return first agument", () => {
    //Arrange
    const a = 2;
    const b = 10;
    //Act
    const result = max(a, b);
    //Assert
    expect(result).toBe(10);
    // all in one line expect(max(4,5)).toBe(9)
  });
  it("only one", () => {
    expect(max(1)).toBe(1);
  });
  it("no test case", () => {
    expect(max()).toBe(undefined);
  });
  it("fizzbuzz", () => {
    expect(fizzBuzz(15)).toBe("FizzBuzz");
  });
});
describe("Fizzbuzz", () => {
  it("fizz", () => {
    expect(fizzBuzz(6)).toBe("Fizz");
  });
  it("buzz", () => {
    expect(fizzBuzz(10)).toBe("Buzz");
  });
  it("number", () => {
    expect(fizzBuzz(4)).toBe("4");
  });
});
describe("calculateTheAverage", () => {
  it("if empty then null", () => {
    expect(calculateAverage([])).toBe(NaN);
  });
  it("only one element", () => {
    expect(calculateAverage([1])).toBe(1);
  });
});
describe("calculateTheFactorial", () => {
  it("zero", () => {
    expect(calculateFactorial(0)).toBe(1);
  });
  it("one", () => {
    expect(calculateFactorial(1)).toBe(1);
  });
  it("3", () => {
    expect(calculateFactorial(4)).toBe(24);
  });
  it("-1", () => {
    expect(calculateFactorial(-1)).toBe(undefined);
  });
  it("hello", () => {
    expect(calculateFactorial("hello")).toBe(undefined);
  });
});
describe("Match Testing", () => {
  it("first", () => {
    expect(getScore()).toBe(85);
  });
  it("second", () => {
    expect(getUser()).toEqual({ name: "Meet", age: 21 });
  });
  it("third", () => {
    expect(getName()).toBeTruthy();
  });
  it("fourth", () => {
    expect(null).toBeNull();
  });
  it("fifth", () => {
    expect(getUser()).toHaveProperty("name");
  });
  it("sixth", () => {
    expect(() => throwError()).toThrow();
  });
});
describe("Async Tesint", () => {
  it("normal", async () => {
    const user = await ayncName();
    expect(user).toEqual({ id: 11, name: "hey" });
  });
  it("resolvePattern", async () => {
    await expect(ayncName()).resolves.toEqual({
      id: 11,
      name: "hey",
    });
  });
  it("AsyncThrow", async () => {
    await expect(asyncError()).rejects.toThrow("User Not Found");
  });
});
// here mock functions are here which we create for testing, the original functions needs anothers to call in order to get executes
// and that functions are time/expensive to we use mock functions here
// they don't actually do here
describe("Mock Functions", () => {
  it("called & times", () => {
    const sendMail = vi.fn();
    sendMail("hey there");
    sendMail("hey there");
    expect(sendMail).toHaveBeenCalled();
    expect(sendMail).toHaveBeenCalledTimes(2);
  });
  it("Arguments", () => {
    const sendMail = vi.fn();
    sendMail("hey there");
    expect(sendMail).toHaveBeenCalledWith("hey there");
  });
  it("Return", () => {
    const getUser = vi.fn();
    getUser.mockReturnValue({
      id: 1,
      name: "meet",
    });
    const user = getUser();
    expect(user.name).toBe("meet");
  });
  it("Resolve", async () => {
    const getUser = vi.fn();
    getUser.mockResolvedValue({ id: 1, name: "meet" });

    const user = await getUser();
    expect(user.name).toBe("meet");

    await expect(getUser()).resolves.toEqual({ id: 1, name: "meet" });
  });
  it("Reject", async () => {
    const getName = vi.fn();
    getName.mockRejectedValue(new Error("Invalid Name"));
    await expect(getName()).rejects.toThrow("Invalid Name");
  });
  it("Implementation", async () => {
    const getUser = vi.fn();

    getUser.mockImplementation(async (id) => {
      return {
        id,
        name: "Meet",
      };
    });

    const user = await getUser(5);

    expect(user.id).toBe(5);
  });
  it("Implementation2", async () => {
    const add = vi.fn();

    add.mockImplementation((a, b) => {
      return a + b;
    });

    expect(add(10, 20)).toBe(30);
  });
  async function registerUser(user, saveUser, sendEmail) {
    const savedUser = await saveUser(user);
    await sendEmail(savedUser.email);
    return savedUser;
  }
  it("Real World Exmple", async () => {
    // Arrange
    const saveUser = vi
      .fn()
      .mockResolvedValue({ id: 1, email: "meet@gmail.com" });
    const sendEmail = vi.fn().mockResolvedValue("sent");
    const user = { email: "meet@gmail.com" };
    // Act
    const result = await registerUser(user, saveUser, sendEmail);
    // Assert — test registerUser's result
    expect(result).toEqual({ id: 1, email: "meet@gmail.com" });
    // Assert — test how registerUser used saveUser
    expect(saveUser).toHaveBeenCalledTimes(1);
    expect(saveUser).toHaveBeenCalledWith(user);
    // Assert — test how registerUser used sendEmail
    expect(sendEmail).toHaveBeenCalledTimes(1);
    expect(sendEmail).toHaveBeenCalledWith("meet@gmail.com");
  });
});

// spy: it watches a exisitng function, it must be used on method of object not on normal function
describe("Spy", () => {
  it("normal", () => {
    const spy = vi.spyOn(normalMethod, "log");
    normalMethod.log(34);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(34);
    spy.mockRestore();
  });
  it("async",async()=>{
    const spy = vi.spyOn(normalMethod,"norm");
    const out = await normalMethod.norm([1,2,3]);
    expect(out).toStrictEqual({name:[1,2,3]});
    expect(spy).toHaveBeenCalled();
    spy.mockRestore()
  })
  it("mock result ", async () => {
  const spy = vi
    .spyOn(normalMethod, "norm")
    .mockResolvedValue({
      id: 10,
      name: "Fake User"
    });
  const user = await normalMethod.norm()
  expect(user.name).toBe("Fake User");
  spy.mockRestore();
});
});