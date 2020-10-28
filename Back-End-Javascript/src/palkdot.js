const { ApiPromise, WsProvider } = require('@polkadot/api');

const getBlockDetail = async ( keyword ) => {
    const wsProvider = new WsProvider('wss://rpc.polkadot.io');
    const api = await ApiPromise.create({ provider: wsProvider });
    const chain = await api.rpc.system.chain();

    if( keyword && /^\d+?$/.test(keyword)){
        api.rpc.chain.getBlockHash( parseInt(keyword) ) 
            .then(blockHash =>{
                api.rpc.chain.getBlock(blockHash)
                    .then( blockDetail =>{
                        console.log("Chain : "+ chain +"\nHeight: "+blockDetail.block.header.number +"\nHash: "+ blockHash);
                    })
                    .catch(
                        res => {
                            console.log('error data::', res);
                        }
                    );
            })
            .catch(
                res => {
                    console.log('error data::', res);
                }
            );
    }else if( keyword ){
        api.rpc.chain.getBlock(keyword)
            .then(blockDetail =>{
                console.log("Chain : "+ chain +"\nHeight: "+blockDetail.block.header.number +"\nHash: "+ keyword);
            })
            .catch(
                res => {
                    console.log('error data::', res);
                }
            );
    }else{
        api.rpc.chain.getHeader()
            .then(header =>{
                console.log("Chain : "+ chain +"\nHeight: "+ header.number + "\nHash: "+ header.hash);
            })
            .catch(
                res => {
                    console.log('error data::', res);
                }
            );
    }
}

const main = async() => {
    const args = process.argv.slice(2);
    var keyword = 0; 
    if(args.length > 0){
        keyword = args[0];
    }
    getBlockDetail( keyword );
}

main();