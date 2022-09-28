# Verifying-Product-Authenticity-Using-Blockchain-
Combatting counterfeiting using Blockchain technology.


It’s easier than ever before to buy second-hand products online, with many reputable platforms like EBay, Facebook Marketplace and Depop offering their services. Plenty of benefits are also associated like often saving money, prolonging the life of products & reducing waste. However, this infrastructure becomes problematic when dealing with luxury goods. Customers cannot with 100% certainty know if a product is genuine or not, and may end up paying face value for a product that isn’t authentic.

---------------------------------------------------------------------------------------------------------------------------------------------------------

To address this counterfeit issue and other underlying issues, this project will aim to develop an EVM com- patible e-commerce DAPP, using Blockchain technology. The DAPP will utilize the ERC-721 Non-Fungible Token standard (NFT) to assign unique identifiers to each product sold on the platform. When a product is sold, an identifier will be acquired alongside to prove ownership and authenticity. To re-sell the product, the identifier will be required to complete the listing, thus enforcing product authenticity throughout the products lifespan. Note, this project will focus on luxury goods as its product example.

Blockchain assets are known to be immutable, traceable, easily transferable and highly secure. There- fore using Blockchain to store product identifiers seems fitting but requires further investigation. To best do this, the DAPP will simulate the buying & selling process by looking and feeling like any other e-commerce web-page; with a Blockchain connection established. The DAPP will feature 2 major parts:

• Shop - This will feature new products and will facilitate brand to consumer selling. When an item is purchased from the Shop, an associated identifier will be transferred from the shop to the customers wallet. All products will belong to a collection, synonymous with that of fashion brands, and this will make the grouping of products into smart contracts easier.

• Marketplace - Similar to platforms like eBay/Depop, where users will be able to sell their products on a second-hand market. When a user lists their item for sale, they will be required to include the associated identifier. This identifier will determine if the product is genuine or not, and will be clearly labelled for all potential buyers to see.

This project will also aim to provide a solution for product rarity and fair product launch. For any identifier generated we can program a total supply limit, and this will be immutable upon deployment. Furthermore, all identifiers will be traceable by the nature of Blockchain, thus having information on the distribution of the product.

------------------
Project Objectives
------------------

The overarching aim for this project is to utilize Blockchain technology to verify product authenticity. To achieve this, the following objectives must be met:

1. To create a product specific smart contract, with a mechanism to generate individual identifiers for each product in a collection. By doing so, each product will have a unique collection identifier (contract address) and a unique product identifier (token ID).
2. To be able to facilitate the buying & selling of product identifiers with different wallets, and to cor- rectly prompt users to confirm Smart Contracts when these events occur. This includes correctly implementing the Shop & Marketplace, such that they store and transfer identifiers accordingly.
3. To host all product associated metadata files with IPFS (The InterPlanetary File System). This is a P2P network for storing data and will ensure all the data is stored in a decentralised manner.
4. To be able to distinguish fake from genuine listings, and to illustrate this clearly to any potential buyers.
