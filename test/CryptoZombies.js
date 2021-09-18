const CryptoZombies = artifacts.require("CryptoZombies");
const ZombieOwnership = artifacts.require("ZombieOwnership");
const ZombieAttack = artifacts.require("ZombieAttack");
const utils = require("./helper/utils");
const time = require("./helper/time");
var expect = require("chai").expect;
const zombieNames = ["Zombie 1", "Zombie 2"];
contract("CryptoZombies", (accounts) => {
  let [alice, bob] = accounts;
  let contractInstance;
  let contractInstance2;
  beforeEach(async () => {
    contractInstance2 = await CryptoZombies.new();
    // contractInstance = await ZombieOwnership.new();
    contractInstance = await ZombieAttack.new();
  });
  xit("should be able to create a new zombie", async () => {
    const result = await contractInstance.createRandomZombie(zombieNames[0], {
      from: alice,
    });
    expect(result.receipt.status).to.equal(true);
    expect(result.logs[0].args.name).to.equal(zombieNames[0]);
  });
  xit("should not allow two zombies", async () => {
    await contractInstance.createRandomZombie(zombieNames[0], { from: alice });
    await utils.shouldThrow(
      contractInstance.createRandomZombie(zombieNames[1], { from: alice })
    );
  });
  xcontext("with the single-step transfer scenario", async () => {
    it("should transfer a zombie", async () => {
      const result = await contractInstance.createRandomZombie(zombieNames[0], {
        from: alice,
      });
      const zombieId = result.logs[0].args.zombieId.toNumber();
      await contractInstance.transferFrom(alice, bob, zombieId, {
        from: alice,
      });
      const newOwner = await contractInstance.ownerOf(zombieId);
      assert.equal(newOwner, bob);
    });
  });
  xcontext("with the two-step transfer scenario", async () => {
    it("should approve and then transfer a zombie when the approved address calls transferFrom", async () => {
      const result = await contractInstance.createRandomZombie(zombieNames[0], {
        from: alice,
      });
      const zombieId = result.logs[0].args.zombieId.toNumber();
      await contractInstance.approve(bob, zombieId, { from: alice });
      await contractInstance.transferFrom(alice, bob, zombieId, { from: bob });
      const newOwner = await contractInstance.ownerOf(zombieId);
      expect(newOwner).to.equal(bob);
    });
    it("should approve and then transfer a zombie when the owner calls transferFrom", async () => {
      const result = await contractInstance.createRandomZombie(zombieNames[0], {
        from: alice,
      });
      const zombieId = result.logs[0].args.zombieId.toNumber();
      await contractInstance.approve(bob, zombieId, { from: alice });
      await contractInstance.transferFrom(alice, bob, zombieId, {
        from: alice,
      });
      const newOwner = await contractInstance.ownerOf(zombieId);
      expect(newOwner).to.equal(bob);
    });
  });
  it("zombies should be able to attack another zombie", async () => {
    let result;
    result = await contractInstance2.createRandomZombie(zombieNames[0], {from: alice});
    const firstZombieId = result.logs[0].args.zombieId.toNumber();
    result = await contractInstance2.createRandomZombie(zombieNames[1], {from: bob});
    const secondZombieId = result.logs[0].args.zombieId.toNumber();
    let duration = time.duration.days(1);
    let ans = await time.increase(duration);
    console.log("2nd last stage", ans);
    // let attacked = await contractInstance.attack(firstZombieId, secondZombieId, {from: alice});
    // console.log("last stage",attacked);
    // expect(result.receipt.status).to.equal(true);
  })
});