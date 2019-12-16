pragma solidity ^0.5.0;

contract Database {
	
	struct Worker {
		uint id;
		string name;
		string phoneNumber;
		string position;
	}
	
	constructor() public {
		addWorker("Ádám","+36301111111","Senior");
		addWorker("János","+36202222222","Junior");
		addWorker("Akram","+36707777777","Intern");
	}
	
	
	mapping(uint => Worker) public workers;
	
	uint public workersCount;
	
	function addWorker (string memory _name, string memory _phoneNumber,string memory _position) private {
		workersCount++;
		workers[workersCount] = Worker(workersCount,_name,_phoneNumber,_position);
	}
	
}