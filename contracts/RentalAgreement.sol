pragma solidity ^0.4.0;
contract RentalAgreement {
    /* This declares a new complex type which will hold the paid rents*/
    struct PaidRent {
        uint id; /* The paid rent id*/
        uint value; /* The amount of rent that is paid*/
    }

    PaidRent[] public paidrents;

    uint public createdTimestamp;

    uint public rent;
    /* Combination of zip code and property number*/
    string public property;

    address public landlord;

    address public tenant;

    address public arbitrator;

    enum State {Created, Started, Terminated}
    State public state;

    function RentalAgreement(uint _rent, string _property) {
        rent = _rent;
        property = _property;
        landlord = msg.sender;
        createdTimestamp = block.timestamp;
    }
    modifier require(bool _condition) {
        if (!_condition) throw;
        _;
    }
    modifier onlyLandlord() {
        if (msg.sender != landlord) throw;
        _;
    }
    modifier onlyTenant() {
        if (msg.sender != tenant) throw;
        _;
    }
    modifier onlyArbitrator() {
        if (msg.sender != arbitrator) throw;
        _;
    }
    modifier inState(State _state) {
        if (state != _state) throw;
        _;
    }

    /* We also have some getters so that we can read the values
    from the blockchain at any time */
    function getPaidRents() internal returns (PaidRent[]) {
        return paidrents;
    }

    function getProperty() constant returns (string) {
        return property;
    }

    function getLandlord() constant returns (address) {
        return landlord;
    }

    function getTenant() constant returns (address) {
        return tenant;
    }

    function getArbitrator() constant returns (address) {
        return arbitrator;
    }

    function getRent() constant returns (uint) {
        return rent;
    }

    function getContractCreated() constant returns (uint) {
        return createdTimestamp;
    }

    function getContractAddress() constant returns (address) {
        return this;
    }

    function getState() returns (State) {
        return state;
    }

    /* Events for DApps to listen to */
    event agreementConfirmed();

    event paidRent();

    event contractTerminated();

    /* Confirm the lease agreement as tenant*/
    function confirmAgreement() inState(State.Created) require(msg.sender != landlord)
    {
        agreementConfirmed();
        tenant = msg.sender;
        state = State.Started;
    }

    function payRent() onlyTenant inState(State.Started) require(msg.value == rent)
    {
        paidRent();
        landlord.send(msg.value);
        paidrents.push(PaidRent({
            id : paidrents.length + 1,
            value : msg.value
        }));
    }
    /* Terminate the contract so the tenant can’t pay rent anymore,
    and the contract is terminated */
    function terminateContract() onlyLandlord
    {
        contractTerminated();
        landlord.send(this.balance);
        /* If there is any value on the
               contract send it to the landlord*/
        state = State.Terminated;
    }
}