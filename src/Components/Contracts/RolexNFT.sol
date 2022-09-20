// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";

contract RolexNFT is ERC721PresetMinterPauserAutoId {

    int public maxSupply = 4;
    address public rolexOwner;
    uint public tokenCount;

    constructor () ERC721PresetMinterPauserAutoId ("Rolex 2022 Collection", "ROLEX-22", "https://gateway.pinata.cloud/ipfs/QmWkrbtEGbocoYgqnuvEAU8yWwwXWyB59HjGyAEJVHSoH3/") {
        rolexOwner = msg.sender;
    }

    function getRolexOwner() public view returns (address) {
        return rolexOwner;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
       return string(abi.encodePacked(super.tokenURI(tokenId),".json"));

    }
      
    function mintAll() public {

        for (int i = 0; i <= maxSupply;i++) {
            mint(msg.sender);
            tokenCount++;
        }

    }

        function mintNFT(uint256 tokenId) public virtual{
        require(hasRole(MINTER_ROLE, _msgSender()), "ERC721PresetMinterPauserAutoId: must have minter role to mint");
        tokenCount++;
        _mint(msg.sender, tokenId);
    }

}