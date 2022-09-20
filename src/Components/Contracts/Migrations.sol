// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Migrations {
  address public owner;
  uint public last_completed_migration;

  constructor() {
    owner = msg.sender;
  }

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  /* This function will keep count of all contract deployments. Everything on the Blockchain is irreversible so once contracts are deployed they will remain. 
     Therefore, we want to keep tabs on these deployments & we use setCompleted to update "last_completed_migration", such that we know how many contracts are deployed.
  */

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }

  function upgrade(address new_address) public restricted {
    Migrations upgraded = Migrations(new_address);
    upgraded.setCompleted(last_completed_migration);
  }
}