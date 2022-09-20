// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";



contract Marketplace is ReentrancyGuard{

        // Variables
    uint public itemCount; 

    struct Item {
        uint itemId;
        IERC721 nft;
        uint tokenId;
        string description;
        string imageURL;
        bool isVerified;
        uint price;
        address payable originalOwner;
        address payable seller;
        bool sold;
    }
        event Offered(
        uint itemId,
        address indexed nft,
        uint tokenId,
        string description,
        string imageURL,
        bool isVerified,
        uint price,
        address indexed seller
    );
    event Bought(
        uint itemId,
        address indexed nft,
        uint tokenId,
        string description,
        string imageURL,
        bool isVerified,
        uint price,
        address originalOwner,
        address indexed seller,
        address indexed buyer
    );

    // itemId -> Item
    mapping(uint => Item) public items; // using mapping to map a uint key to an Item object (so a key of 1 will map to Itemm 1)

    constructor() {

    }

    
// Make item to offer on the marketplace
    function makeItem(IERC721 _nft, uint _tokenId, uint _price, string memory descriptionInput, string memory imageUrl, bool isVerified, address payable originalOwner) external nonReentrant {
        
        require(_price > 0, "Price must be greater than zero");
        // increment itemCount
        itemCount ++;
        // transfer nft
        _nft.transferFrom(msg.sender, address(this), _tokenId);
        // add new item to items mapping
        items[itemCount] = Item (
            itemCount,
            _nft,
            _tokenId,
            descriptionInput,
            imageUrl,
            isVerified,
            _price,
            payable(originalOwner),
            payable(msg.sender),
            false
        );
        // emit Offered event // emit (or log because its easier to under) the event onto the Blockchain 
        emit Offered(
            itemCount,
            address(_nft),
            _tokenId,
            descriptionInput,
            imageUrl,
            isVerified,
            _price,
            msg.sender
        );
    }

    function purchaseItem(uint _itemId) external payable nonReentrant {
        Item storage item = items[_itemId];
        uint _totalPrice = item.price;
        require(_itemId > 0 && _itemId <= itemCount, "item doesn't exist");
        require(msg.value >= _totalPrice, "not enough ether to cover item price and market fee");
        require(!item.sold, "item already sold");

        // send fee to original owner 
        uint feeAmount = 2;
        uint feeTotal = (_totalPrice * feeAmount) / 100;
        item.originalOwner.transfer(feeTotal);

        // pay seller and feeAccount and original store
        item.seller.transfer((item.price) - feeTotal);
        // update item to sold
        item.sold = true;
        // transfer nft to buyer
        item.nft.transferFrom(address(this), msg.sender, item.tokenId);
        // emit Bought event
        emit Bought(
            _itemId,
            address(item.nft),
            item.tokenId,
            item.description,
            item.imageURL,
            item.isVerified,
            item.price,
            item.originalOwner,
            item.seller,
            msg.sender
        );
    }

        function getTotalPrice(uint _itemId) view public returns(uint){
        return((items[_itemId].price));
    }
}