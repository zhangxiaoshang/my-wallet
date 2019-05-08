// 原库不能直接在项目中使用 这里的moduel是通过browserify产生的
// import bip39Module from "../assets/js/bip39.js";
// import bitcoinModule from "../assets/js/bitcoin.js";
// const bip39 = bip39Module.bip39;
// const bitcoin = bitcoinModule.bitcoin;

// 使用browserify 构架的模块 在global挂载了bitcoin
// import "../assets/js/bitcoin.bundle";
// import bip39 from "bip39";

class Wallet {
  generateMnemonic() {
    // let mnemonic = bip39.generateMnemonic();
    let mnemonic = "xxx";
    console.log("mnemonic", mnemonic);
    return mnemonic;
  }
  createWalletByMnemonic(mnemonic) {
    mnemonic =
      "genre mistake royal legend cinnamon armor cluster bundle resemble open bargain primary";
    const seed = bip39.mnemonicToSeedSync(mnemonic);

    // const node = bitcoin.bip32.fromSeed(seed);
    // const string = node.toBase58();

    // const root = bitcoin.bip32.fromBase58(string);
    // const child = root.derivePath("m/44'/0'/0'/0/0");
    // const addr = getAddress(child);

    let walletInfo = {
      mnemonic: mnemonic,
      addr: "addr"
    };
    console.log("walletInfo", walletInfo);
    return Promise.resolve(walletInfo);
  }
}

export default new Wallet();
