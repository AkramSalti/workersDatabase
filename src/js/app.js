App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Database.json", function(Database) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Database = TruffleContract(Database);
      // Connect provider to interact with contract
      App.contracts.Database.setProvider(App.web3Provider);

      return App.render();
    });
  },

  render: function() {
    var databaseInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.Database.deployed().then(function(instance) {
      databaseInstance = instance;
      return databaseInstance.workersCount();
    }).then(function(workersCount) {
      var workersData = $("#workersData");
      workersData.empty();

      for (var i = 1; i <= workersCount; i++) {
        databaseInstance.workers(i).then(function(worker) {
          var id = worker[0];
          var name = worker[1];
          var phoneNumber = worker[2];
		  var position = worker[3];

          // Render worker Result
          var workerTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + phoneNumber + "</td><td>"+ position + "</td></tr>"
          workersData.append(workerTemplate);
        });
      }

      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  }
  
 
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});