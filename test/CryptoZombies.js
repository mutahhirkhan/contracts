const CryptoZombies =    artifacts.require('CryptoZombies')
var expect = require('chai').expect;
const zombieNames = ["Zombie 1", "Zombie 2"];
contract('CryptoZombies', (accounts) => {
    let [alice, bob] = accounts;
    let contractInstance;
    beforeEach(async () => {
        contractInstance = await CryptoZombies.new();
    });
    it("should be able to create a new zombie", async () => {
        console.log("CryptoZombies done")
        const result = await contractInstance.createRandomZombie(zombieNames[0], {from: alice});
        expect(result.receipt.status).to.equal(true);
        expect(result.logs[0].args.name).to.equal(zombieNames[0]);
    })
})