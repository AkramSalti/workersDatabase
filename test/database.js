var Database = artifacts.require("./Database.sol");

contract("Database", function(accounts) {
  var databaseInstance;

  it("initializes with three workers", function() {
    return Database.deployed().then(function(instance) {
      return instance.workersCount();
    }).then(function(count) {
      assert.equal(count, 3);
    });
  });

  it("it initializes the user with the correct values", function() {
    return Database.deployed().then(function(instance) {
      databaseInstance = instance;
      return databaseInstance.workers(1);
    }).then(function(worker) {
      assert.equal(worker[0], 1, "contains the correct id");
      assert.equal(worker[1], "Ádám", "contains the correct name");
      assert.equal(worker[2], "+36301111111", "contains the correct phone number");
	  assert.equal(worker[3], "Senior", "contains the correct position");
	  return databaseInstance.workers(2);
    }).then(function(worker) {
      assert.equal(worker[0], 2, "contains the correct id");
      assert.equal(worker[1], "János", "contains the correct name");
      assert.equal(worker[2], "+36202222222", "contains the correct votes count");
	  assert.equal(worker[3], "Junior", "contains the correct position");
      return databaseInstance.workers(3);
    }).then(function(worker) {
      assert.equal(worker[0], 3, "contains the correct id");
      assert.equal(worker[1], "Akram", "contains the correct name");
      assert.equal(worker[2], "+36707777777", "contains the correct votes count");
	  assert.equal(worker[3], "Intern", "contains the correct position");
	  
    });
  });
});