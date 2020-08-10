import { User } from "@models/User";

test("it should be ok", () => {
    const user = new User();

    user.name = "Leonardo";

    expect(user.name).toEqual("Leonardo");
});
