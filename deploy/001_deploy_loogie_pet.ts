import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts, getChainId} = hre;
  const {deploy} = deployments;
  const networkName = await getChainId().then(
    (id) =>
      ({
        80001: 'mumbai',
        137: 'matic',
        4: 'rinkeby',
        1: 'mainnet',
      }[id])
  );

  if (!networkName) return;

  const {deployer} = await getNamedAccounts();

  await deploy('LoogiePet', {
    from: deployer,
    log: true,
    skipIfAlreadyDeployed: true,
  });
};
export default func;
func.tags = ['LoogiePet'];
