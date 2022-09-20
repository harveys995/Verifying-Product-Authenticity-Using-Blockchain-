const PradaNFT = artifacts.require("PradaNFT");
const RolexNFT = artifacts.require("RolexNFT");
const PradaStore = artifacts.require("PradaStore");
const RolexStore = artifacts.require("RolexStore");
const Marketplace = artifacts.require("Marketplace");

module.exports = async function (deployer, network, accounts) {
  //Deploy Prada NFT Contract & Mint all NFT's
  await deployer.deploy(PradaNFT, { from: accounts[1] });
  const pradaInstance = await PradaNFT.deployed();
  await pradaInstance.mintAll({ from: accounts[1] });

  //Deploy Rolex NFT Contract & Mint all NFT's
  await deployer.deploy(RolexNFT, { from: accounts[2] });
  const rolexInstance = await RolexNFT.deployed();
  await rolexInstance.mintAll({ from: accounts[2] });

  //Deploy Store Contracts
  await deployer.deploy(PradaStore);
  await deployer.deploy(RolexStore);

  //Deploy Marketplace Contract
  await deployer.deploy(Marketplace);
};
