import assertRevert from "openzeppelin-solidity/test/helpers/assertRevert";
import ether from "openzeppelin-solidity/test/helpers/ether";

const StubToken = artifacts.require("StubToken");

contract("Stub token", accounts => {
  it("Should make first account an owner", async () => {
    let instance = await StubToken.deployed();
    let owner = await instance.owner();
    assert.equal(owner, accounts[0]);
  });

  describe("Event Creation and ticket assigning", () => {
    it("creates event and a ticket on that event", async () => {
      let instance = await StubToken.deployed();
      let owner = await instance.owner();
      let other = accounts[1];

      let events = await instance.createEvent(
        owner,
        web3.fromAscii('Fn6NZVMV3IvkoHYGVZtm'),
        web3.fromAscii('Kendrick Lamar'),
        web3.fromAscii('-31.950527'),
        web3.fromAscii('115.860457'),
        ether(0.18850604858538503),
        1531222200,
        20
      )
      let id = events.logs[0].args._id;
      let eventid = events.logs[0].args._eventId;
      let token = await instance.purchaseTicket(id, {
        from: other,
        value: ether(0.18850604858538503)
      });

      let tokens = await instance.tokenOfOwnerByIndex(other, 0);
      let ticket = await instance.getTicket(tokens);
      assert.deepEqual(ticket, [eventid, ether(0.18850604858538503)]);

      let withdraw = await instance.withdrawBalance(eventid);
    });

    it("withdraws funds from an event", async () => {
      let instance = await StubToken.deployed();
      let owner = await instance.owner();
      let other = accounts[1];

      let events = await instance.createEvent(
        owner,
        web3.fromAscii('Fn8NZVMV3IvkoHYGVZtm'),
        web3.fromAscii('Kendrick Lamar'),
        web3.fromAscii('-31.950527'),
        web3.fromAscii('115.860457'),
        ether(0.18850604858538503),
        1531222200,
        20
      )
      let id = events.logs[0].args._id;
      let eventid = events.logs[0].args._eventId;
      let token = await instance.purchaseTicket(id, {
        from: other,
        value: ether(0.18850604858538503)
      });

      let tokens = await instance.tokenOfOwnerByIndex(other, 1);
      let ticket = await instance.getTicket(tokens);
      assert.deepEqual(ticket, [eventid, ether(0.18850604858538503)]);

      let withdraw = await instance.withdrawBalanceId(id, {
        from: owner
      });
    });

    it("doesn't allow withdrawal by a non-event owner", async () => {
      let instance = await StubToken.deployed();
      let owner = accounts[0];
      let other = accounts[1];

      let events = await instance.createEvent(
        owner,
        web3.fromAscii('PssNZVMV3IvkoHYGVZtM'),
        web3.fromAscii('Kendrick Lamar'),
        web3.fromAscii('-31.950527'),
        web3.fromAscii('115.860457'),
        ether(0.18850604858538503),
        1531222200,
        20
      )

      let id = events.logs[0].args._id;
      let token = await instance.purchaseTicket(id, {
        from: other,
        value: ether(0.18850604858538503)
      });

      await assertRevert(
        instance.withdrawBalanceId(id, {
          from: other
        })
      );
    });
  });
});