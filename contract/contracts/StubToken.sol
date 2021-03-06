pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract StubToken is ERC721Token, Ownable {

    constructor(string _name,string _symbol)
    ERC721Token(_name, _symbol) public {

    }

    event NewEvent(uint _eventId, bytes32 _id);

    struct Ticket {
        uint eventId;
        uint price;
    }

    struct Event {
        address artist;
        bytes32 id;
        bytes32 name;
        bytes32 locationLat;
        bytes32 locationLng;
        uint price;
        uint time;
        uint salesCap;
    }

    Ticket[] public tickets;
    Event[] public events;

    mapping (uint => uint) private totalEventSales;
    mapping (address => uint) private totalOwnedTickets;
    mapping (uint => uint) private eventRevenue;
    mapping (bytes32 => uint) private eventRefIdToEvent;

    /// @dev Modifier for checking artist ownership
    modifier onlyArtist(uint _eventId) {
        Event memory _event = events[_eventId];
        require(msg.sender == _event.artist);
        _;
    }

    /// @dev Modifier for checking artist ownership using byte32 id
    modifier onlyArtistId(bytes32 _id) {
        uint eventId = eventRefIdToEvent[_id];
        Event memory _event = events[eventId];
        require(msg.sender == _event.artist);
        _;
    }

    /// @dev Returns the general ticket details for a given ticket ID
    /// @param _ticketId ID of the ticket (ERC721 token)
    function getTicket(uint _ticketId) public view returns(uint eventId, uint price) {
        Ticket memory _ticket = tickets[_ticketId];
        eventId = _ticket.eventId;
        price = _ticket.price;
    }

    /// @dev Returns the event for a given event ID
    /// @param _eventId ID of the event
    function getEvent(uint _eventId) public view returns(
            address artist, 
            bytes32 id,
            bytes32 name, 
            bytes32 locationLat,
            bytes32 locationLng,
            uint price, 
            uint time, 
            uint sales, 
            uint salesCap
        ) {
        Event memory _event = events[_eventId];

        artist = _event.artist;
        id = _event.id;
        name = _event.name;
        locationLat = _event.locationLat;
        locationLng = _event.locationLng;
        price = _event.price;
        time = _event.time;
        sales = totalEventSales[_eventId];
        salesCap = _event.salesCap;
    }

    /// @dev Get viewer details for a given ticket
    /// @param _ticketId The token ID of a given ticket
    function getTicketDetails(uint _ticketId) public view returns(
            address artist, 
            bytes32 id,
            bytes32 name, 
            bytes32 locationLat,
            bytes32 locationLng,
            uint price, 
            uint time
        ) {
        Ticket memory _ticket = tickets[_ticketId];
        Event memory _event = events[_ticket.eventId];

        artist = _event.artist;
        id = _event.id;
        name = _event.name;
        locationLat = _event.locationLat;
        locationLng = _event.locationLng;
        price = _event.price;
        time = _event.time;
    }

    /// @dev Used to create a new Event
    /// @param _artist Address of the artist to recieve the funds
    /// @param _id Reference identifier for event usable externally
    /// @param _name Name of the event
    /// @param _locationLat Lat of the event
    /// @param _locationLng Lng of the event
    /// @param _price Ticket price for the event
    /// @param _time Timestamp in Epoch for the event
    /// @param _salesCap Number of tickets allowed to be sold for the event
    function createEvent(
        address _artist, 
        bytes32 _id,
        bytes32 _name, 
        bytes32 _locationLat,
        bytes32 _locationLng,
        uint _price, 
        uint _time, 
        uint _salesCap
        ) public {

        // confirm we don't override the mapping for another event!!!
        require(eventRefIdToEvent[_id] == 0);

        Event memory _event = Event({
            artist: _artist,
            id: _id,
            name: _name,
            locationLat: _locationLat,
            locationLng: _locationLng,
            price: _price,
            time: _time,
            salesCap: _salesCap
        });
        uint _eventId = events.push(_event) - 1;
        eventRefIdToEvent[_event.id] = _eventId;
        emit NewEvent(_eventId, _id);
    }

    /// @dev Used to purchase a ticket for a given event
    /// @param _id byte ID of the event
    function purchaseTicket(bytes32 _id) public payable {
        uint _eventId = eventRefIdToEvent[_id];
        Event memory _event = events[_eventId];
        uint sellingPrice = _event.price;

        require(_event.salesCap > totalEventSales[_eventId]);
        require(msg.value >= sellingPrice);

        Ticket memory _ticket = Ticket({
            eventId: _eventId,
            price: sellingPrice
        });

        uint _ticketId = tickets.push(_ticket) - 1;
        _mint(msg.sender, _ticketId);
        totalEventSales[_eventId]++;
        totalOwnedTickets[msg.sender]++;

        uint excess = msg.value.sub(sellingPrice);
        eventRevenue[_eventId] += sellingPrice;
        if (excess > 0) {
            msg.sender.transfer(excess);
        }
    }

    /// @dev Used to get the price of a given ticket
    /// @param _eventId ID of the event
    function priceOf(uint _eventId) public view returns (uint _price) {
        Event memory _event = events[_eventId];
        return _event.price;
    }

    /// @dev Get the ID's of the tickets owned by someone
    /// @param _owner Address of someone
    function ticketsOf(address _owner) public view returns(uint[]) {
        uint tokenCount = totalOwnedTickets[_owner];
        if (tokenCount == 0) {
            return new uint[](0);
        } else {
            uint[] memory result = new uint[](tokenCount);
            uint resultIndex = 0;

            for (uint i = 0; i < tokenCount; i++) {
                result[resultIndex] = tokenOfOwnerByIndex(_owner, i);
                resultIndex++;
            }
            return result;
        }
    }

    /// @dev Gets the total number of events for enumeration purposes
    function totalEventSupply() public view returns (uint256 _totalSupply) {
        _totalSupply = events.length;
    }

    /// @dev Retrieves all Events
    function getAllEvents() public view returns (
        address[],
        bytes32[],
        bytes32[],
        uint[],
        uint[],
        uint[],
        uint[]
    ) {
        uint256 total = totalEventSupply();
        address[] memory artists = new address[](total);
        bytes32[] memory ids = new bytes32[](total);
        bytes32[] memory names = new bytes32[](total);
        uint[] memory prices = new uint[](total);
        uint[] memory times = new uint[](total);
        uint[] memory soldTickets = new uint[](total);
        uint[] memory salesCaps = new uint[](total);

        for (uint256 i = 0; i < total; i++) {
            artists[i] = events[i].artist;
            ids[i] = events[i].id;
            names[i] = events[i].name;
            prices[i] = events[i].price;
            times[i] = events[i].time;
            soldTickets[i] = totalEventSales[i];
            salesCaps[i] = events[i].salesCap;
        }

        return (artists, ids, names, prices, times, soldTickets, salesCaps);
    }

    /// @dev Returns the balance value for an event
    function withdrawBalance(uint _eventId) public onlyArtist(_eventId) {
        Event memory _event = events[_eventId];
        uint amount = eventRevenue[_eventId];
        address to = _event.artist;

        require(amount <= address(this).balance);
        eventRevenue[_eventId] = 0; // Empty event revenue

        if (to == address(0)) {
            owner.transfer(amount); // funds are put into owners wallet IF event was created wrong
        } else {
            to.transfer(amount);
        }
    }

    /// @dev Returns the balance value for an event based on its external ID.
    function withdrawBalanceId(bytes32 _id) public onlyArtistId(_id) {
        uint eventId = eventRefIdToEvent[_id];
        Event memory _event = events[eventId];
        uint amount = eventRevenue[eventId];
        address to = _event.artist;

        require(amount <= address(this).balance);
        eventRevenue[eventId] = 0; // Empty event revenue

        if (to == address(0)) {
            owner.transfer(amount); // funds are put into owners wallet IF event was created wrong
        } else {
            to.transfer(amount);
        }
    }
}
