
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";

contract PradaNFT is ERC721PresetMinterPauserAutoId {

    int public maxSupply = 16;
    address public pradaOwner;
    uint public tokenCount;

    constructor () ERC721PresetMinterPauserAutoId ("Prada Spring Summer 2022 Collection", "PRADA-22", "https://gateway.pinata.cloud/ipfs/QmUJ3Y8yFED7c9SXXRgy9YS9GCX5hAHvzJtKdA41oaTNhR/") {
        pradaOwner = msg.sender;
    }

    function getPradaOwner() public view returns (address) {
        return pradaOwner;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
       return string(abi.encodePacked(super.tokenURI(tokenId),".json"));
    }
      
    function mintAll() public {
        for (int i = 0; i <= maxSupply;i++) {
            mint(msg.sender);
        }
    }

        function mintNFT(uint256 tokenId) public virtual{
        require(hasRole(MINTER_ROLE, _msgSender()), "ERC721PresetMinterPauserAutoId: must have minter role to mint");
        tokenCount++;
        _mint(msg.sender, tokenId);
    }

}