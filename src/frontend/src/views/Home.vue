<template>
  <div>
    <v-btn @click="logIn">Log in</v-btn>
    <v-btn @click="recover()">Recover</v-btn>
    <v-text-field v-model="signature" label="input signature to recover address for"></v-text-field>
    <v-textarea v-model="output1" auto-grow> </v-textarea>
  </div>
</template>

<script>
  import Web3 from 'web3'

  export default {
    name: 'Home',
    data(){
      return {
        output1: '',
        signature: '',
        dataToSign: 'test data to sign'
      }
    },
    components: {
    },
    mounted() {
    },
    methods: {
      async logIn() {
        if (!window.ethereum) {
          this.print('You need Metamask to use this site...')
          return
        }
        let accountList = await window.ethereum.request({ method: 'eth_requestAccounts' });
        let web3 = new Web3(window.ethereum);

        this.print('web3 version', web3.version)

        this.print('Found accounts, using this one:')
        let account = accountList[0]
        this.print('account', account)
        this.print('default account', web3.eth.defaultAccount)
        this.print('sha hash', web3.utils.sha3('test'))

        let res = await web3.eth.personal.sign(this.dataToSign, account, 'not a good password')
        this.output1 = `Signature: ${res}}`
        this.signature = res
      },
      async recover() {
        let web3 = new Web3(window.ethereum);
        let res = await web3.eth.personal.ecRecover(this.dataToSign, this.signature)
        this.print('Signature was signed by address:', res)
      },
      print(heading, str){
        this.output1 += `\n${heading}\t ${str}`
      }
    }
  }
</script>
<style scoped lang="scss">
.terminal{
  height: 800px !important;
}
</style>