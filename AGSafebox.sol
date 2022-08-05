contract AGSafebox {
    address owner;

    constructor () {
        owner = msg.sender;
    }

    function withdraw(address recepient) public returns (bool) {
        require(msg.sender == owner, "You're not an owner.");

        (bool sent, bytes memory data) = recepient.call{value: address(this).balance}("");
        require(sent, "Failed to send SOL");

        return sent;
    }
}