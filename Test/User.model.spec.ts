
import {userRepository}  from "../src/repositories/user.repository";
import "jest";

describe("#User Model", () => {
    const user1 = {

        id: "a671231c-1785-4807-9d55-f2b402f0e613",
        name: "Caio Nunes Santos",
        email: "caio1@email.com",
        password: "123456",
        isAdmin: false
    }
    const user2 = {

        id: "a671231c-1785-4807-9d55-f2b402f0e614",
        name: "Caio Nunes Santos",
        email: "caio2@email.com",
        password: "123456",
        isAdmin: false
    }

const mockUsers = [user1, user2];
jest.spyOn(userRepository, "find").mockResolvedValue(mockUsers);


describe("When finding users", () => {
    it("Should return  a list of users", async () => {
        const users = await userRepository.find({})

        expect(userRepository.find).toHaveBeenCalledTimes(1);
        expect(users).toMatchObject(mockUsers)
    });
});

describe("When registering an user", () => {
    it("registering an user ")
})



})