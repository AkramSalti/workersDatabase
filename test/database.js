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

  it("it initializes the candidates with the correct values", function() {
    return Database.deployed().then(function(instance) {
      databaseInstance = instance;
      return databaseInstance.candidates(1);
    }).then(function(candidate) {
      assert.equal(candidate[0], 1, "contains the correct id");
      assert.equal(candidate[1], "Ádám", "contains the correct name");
      assert.equal(candidate[2], "+36301111111", "contains the correct phone number");
	  assert.equal(candidate[3], "Senior", "contains the correct position");
	  return databaseInstance.candidates(2);
    }).then(function(candidate) {
      assert.equal(candidate[0], 2, "contains the correct id");
      assert.equal(candidate[1], "János", "contains the correct name");
      assert.equal(candidate[2], "+36202222222", "contains the correct votes count");
	  assert.equal(candidate[3], "Junior", "contains the correct position");
      return databaseInstance.candidates(3);
    }).then(function(candidate) {
      assert.equal(candidate[0], 3, "contains the correct id");
      assert.equal(candidate[1], "Akram", "contains the correct name");
      assert.equal(candidate[2], "+36707777777", "contains the correct votes count");
	  assert.equal(candidate[3], "Intern", "contains the correct position");
	  
    });
  });
});