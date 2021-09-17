<template>
  <div class="container">
    <div class="video-container">
      <video ref="video" class="top-video" autoplay loop muted playsinline src="top-video-reversed.mp4"></video>
    </div>

    <div class="header">WEB3 + JWT</div>
    <div class="subsection">
      <div class="block">
        <h1>Log in with wallet</h1>
        <div>Once you connect a wallet we can see the address. This can sometimes be enough for some read-operations, like on <a href="https://pancakeswap.finance">defi</a></div>
        <div class="click" @click="connect()">Connect</div>
        <div v-if="address">Address: {{address}}</div>
      </div>
      <img class="arrow" src="arrow.png"/>
      <div class="block">
        <h1>Sign message with wallet</h1>
        <div>But if the user want to keep some data secret with our service then we need to verify their identity</div>
        <div>The wallet signs a message with it's private key. We then use ecrecover to get the address that signed the message</div>
        <div>The signed message is sent to the server.</div>
        <div class="click" @click="sign()">Sign</div>
        <div v-if="signedMessage">Signed message: {{signedMessage}}</div>
      </div>
      <img class="arrow" src="arrow.png"/>
      <div class="block">
        <h1>Read signed message on server</h1>
        <div>We then use ecrecover to get the address that signed the message</div>
        <div>Once this is done we know that the person that signed the message is the owner of said address</div>
        <div>You can now create a user account for this user, or fetch an existing user account from a database</div>
        <div>Then encode a JWT with a user object, secured by a secret-key on the server</div>
        <div class="click" @click="sendToServer()">Send to server</div>
        <div v-if="recoveredAddress">{{recoveredAddress}}</div>
        <div v-if="jwt">{{jwt}}</div>
      </div>
      <img class="arrow" src="arrow.png"/>
      <div class="block">
        <h1>The JWT</h1>
        <div>The JWT is a cryptographically signed string that contains a JSON object</div>
        <div>It's stored in the cookie, and sent on all requests</div>
        <div>The signing of the JWT means that the holder of the secret key can verify it's integrity</div>
        <div>Meaning we can read it on the server and use it to identify the user on every request, since we can know that no one has changed it</div>
        <div>Meaning we can read it on the server and know that no one has changed it</div>
        <div class="click" @click="decodeJwt()">Decode JWT</div>
        <div v-if="jwtDecoded">{{jwtDecoded}}</div>
      </div>
      <img class="arrow" src="arrow.png"/>
      <div class="block">
        <h1>Sign out</h1>
        <div>Time for the user to leave</div>
        <div class="click" @click="signOut">Sign out</div>
      </div>
    </div>
    <div class="attribution">
      <a href="https://www.pexels.com/video/rainbow-light-reflection-on-a-soap-bubble-4431322/">Video by Miguel Á. Padriñán from Pexels</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Web3 from "web3"
import * as jwt from 'jsonwebtoken'

export default {
  name: "Frontpage",
  data(){
    return {
      address: '',
      signedMessage: '',
      recoveredAddress: '',
      jwt: '',
      jwtDecoded: '',
      serverUserResponse: '',
      nonce: ''
    }
  },
  mounted() {
    this.$refs.video.playbackRate = 1;
    this.nonce = `I want to log in to the WEB3+JWT site (${Math.random()})`
  },
  methods: {
    async connect() {
      if (!window.ethereum) {
        alert('You need Metamask to use this site...')
        return
      }
      let accountList = await window.ethereum.request({method: 'eth_requestAccounts'});
      this.address = accountList[0]
    },
    async sign() {
      let web3 = new Web3(window.ethereum);
      this.signedMessage = await web3.eth.personal.sign(this.nonce, this.address, 'password') // Note that password is not needed when using Metamask, as it handles password management internally
    },
    async sendToServer() {
      let res = await axios.post('/api/login', {
        signedMessage: this.signedMessage,
        nonce: this.nonce
      })
      this.recoveredAddress = res.data.recovredAddress
      this.jwt = res.data.jwt
    },
    decodeJwt(){
      this.jwtDecoded = jwt.decode(this.jwt)
    },
    signOut(){
      document.cookie = ''
      location.reload()
    }
  }
}
</script>

<style>

body{
  background-color: #3a0f8f;
  background-position: 0px 0px;
  background-size: auto;
  font-family: Silka, sans-serif;
  color: #cbcaf9;
  font-size: 16px;
  line-height: 180%;
  width: 100%;
  height: 100%;
}
</style>

<style scoped>
.click{
  color: #af14ca;
  cursor: pointer;
}

.container{
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 1;
  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(
      0deg) rotateY(
      0deg) rotateZ(
      0deg) skew(
      0deg,
      0deg);
  transform-style: preserve-3d;
  background-image: linear-gradient(#4b19af, #3a0f8f);

}

.top-video{
  background-size: cover;
  background-position: 50% 50%;
  position: absolute;
  margin: auto;
  width: 100%;
  height: 100%;
  right: -100%;
  bottom: -100%;
  top: -100%;
  left: -100%;
  object-fit: cover;
  z-index: -100;
  display: inline-block;
  vertical-align: baseline;
  box-sizing: border-box;
  transform: rotate(180deg);
}

.video-container{
  left: 0%;
  top: 0%;
  right: 0%;
  bottom: auto;
  display: block;
  overflow: hidden;
  /* mix-blend-mode in combination with the parent element background color produces the filter effect*/
  mix-blend-mode: color-dodge;
  position: relative;
  height: 170px;
  color: white;
}

.header{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 0px;

  margin-bottom: 20px;
  font-family: Silka, sans-serif;
  color: #fff;
  font-size: 80px;
  line-height: 128%;
  font-weight: 200;
  z-index: 160;
}

.subsection{
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 50px;
}

.block{
  width: 1000px;
  margin: auto;
}

.arrow{
  transform: rotate(180deg);
  height: 100px;
  margin: 10px auto;
}

.attribution{
  position: relative;
  bottom: 0;
  left: 10px;
  font-size: 8px;
}
a{
  color: white;
  text-decoration: none;
}
</style>