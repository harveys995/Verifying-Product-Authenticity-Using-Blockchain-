// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract RolexStore is ReentrancyGuard {

        // Variables
    uint public itemCount; 

    struct Item {
        uint itemId;
        IERC721 nft;
        uint tokenId;
        uint price;
        address payable seller;
        bool sold;
    }
        event Offered(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller
    );
    event Bought(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller,
        address indexed buyer
    );

    // itemId -> Item
    mapping(uint => Item) public items; // using mapping to map a uint key to an Item object (so a key of 1 will map to Itemm 1)

    function makeItem(IERC721 _nft, uint[] calldata _tokenId, uint[] calldata _price) external nonReentrant {
        
        for (uint i = 0; i < _tokenId.length; i++) {
        require(_price[i] > 0, "Price must be greater than zero");
        }

        for (uint i = 0; i < _tokenId.length; i ++) {
            itemCount ++;
           _nft.transferFrom(msg.sender, address(this), _tokenId[i]); 

        items[itemCount] = Item (
            itemCount,
            _nft,
            _tokenId[i],
            _price[i],
            payable(msg.sender),
            false
        );
        emit Offered(
            itemCount,
            address(_nft),
            _tokenId[i],
            _price[i],
            msg.sender
        );
        }
    }

    function purchaseItem(uint _itemId) external payable nonReentrant {
        Item storage item = items[_itemId];
        uint _totalPrice = item.price;
        require(_itemId > 0 && _itemId <= itemCount, "item doesn't exist");
        require(msg.value >= _totalPrice, "not enough ether to cover item price and market fee");
        require(!item.sold, "item already sold");
        // pay seller and feeAccount
        item.seller.transfer(item.price);
        // update item to sold
        item.sold = true;
        // transfer nft to buyer
        item.nft.transferFrom(address(this), msg.sender, item.tokenId);
        // emit Bought event
        emit Bought(
            _itemId,
            address(item.nft),
            item.tokenId,
            item.price,
            item.seller,
            msg.sender
        );
    }

        function getTotalPrice(uint _itemId) view public returns(uint){
        return((items[_itemId].price));
    }
}