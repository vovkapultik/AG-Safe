// SPDX-License-Identifier: MIT

pragma solidity ^0.8;

contract AGSafebox {
    address owner;

    modifier onlyOwner {
        require(msg.sender == owner, "You're not an owner.");
        _;
    }

    constructor () {
        owner = msg.sender;
    }

    function deposit() public payable {}

    function withdraw(uint64 _amount, address recepient) public onlyOwner returns (bool) {
        (bool sent, bytes memory data) = recepient.call{value: _amount}("");
        require(sent, "Failed to send Ether");

        return sent;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}