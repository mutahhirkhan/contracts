// const CryptoZombies =    artifacts.require('CryptoZombies')
// const utils = require("./helper/utils");
// const time = require("./helper/time");
// var expect = require('chai').expect;
// const zombieNames = ["Zombie 1", "Zombie 2"];
// contract('CryptoZombies', (accounts) => {
//     let [alice, bob] = accounts;
//     let contractInstance;
//     beforeEach(async () => {
//         contractInstance = await CryptoZombies.new();
//     });
//     it("should be able to create a new zombie", async () => {
//         console.log("CryptoZombies done")
//         const result = await contractInstance.createRandomZombie(zombieNames[0], {from: alice});
//         expect(result.receipt.status).to.equal(true);
//         expect(result.logs[0].args.name).to.equal(zombieNames[0]);
//     })
//     it("should not allow two zombies", async () => {
//         await contractInstance.createRandomZombie(zombieNames[0], {from: alice});
//         await utils.shouldThrow(contractInstance.createRandomZombie(zombieNames[1], {from: alice}));
//     })
// })
const CryptoZombies = artifacts.require("CryptoZombies");
// import utils from "./helper/utils";
const utils = require("./helper/utils");

const zombieNames = ["Zombie 1", "Zombie 2"];
contract("CryptoZombies", (accounts) => {
  let [alice, bob] = accounts;
  let contractInstance;
  beforeEach(async () => {
    contractInstance = await CryptoZombies.new();
  });
  xit("should be able to create a new zombie", async () => {
    const result = await contractInstance.createRandomZombie(zombieNames[0], {
      from: alice,
    });
    assert.equal(result.receipt.status, true);
    assert.equal(result.logs[0].args.name, zombieNames[0]);
  });
  it("should not allow two zombies", async () => {
    await contractInstance.createRandomZombie(zombieNames[0], { from: alice });
    await utils.shouldThrow(
      contractInstance.createRandomZombie(zombieNames[1], { from: alice })
    );
  });

});
