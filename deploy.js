const { Connection, LAMPORTS_PER_SOL, Keypair } = require('@solana/web3.js');
const { Contract, Program } = require('@solana/solidity');
const { readFileSync } = require('fs');

const FLIPPER_ABI = JSON.parse(readFileSync('build/AGSafebox.abi', 'utf8'));
const PROGRAM_SO = readFileSync('build/bundle.so');

(async function () {
    console.log('Connecting to your local Solana node ...');
    const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

    const payer = Keypair.generate();

    console.log('Airdropping SOL to a new wallet ...');
    const signature = await connection.requestAirdrop(payer.publicKey, 5 * LAMPORTS_PER_SOL);
    await connection.confirmTransaction(signature, 'confirmed');

    const program = Keypair.generate();
    const storage = Keypair.generate();

    const contract = new Contract(connection, program.publicKey, storage.publicKey, FLIPPER_ABI, payer);

    await contract.load(program, PROGRAM_SO);

    console.log('Program deployment finished, deploying the flipper contract ...');

    await contract.deploy('AGSafebox', [], storage, 4096);

    await contract.functions.deposit();
    //todo: send SOLs 

    //const res4 = await contract.functions.getBalance();
    //console.log('state: ' + res4.result);

    //await contract.functions.deposit(1000);

    //const res6 = await contract.functions.getBalance();
    //console.log('state: ' + res6.result);

})();