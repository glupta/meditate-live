<template>
  <div class="landing-page">
    <img class="logo-logo-360x360" src="https://static.overlay-tech.com/assets/7b57d8fc-ed88-4c2a-8a53-c061eabae3d8.png"/>
    <img class="mindset" src="https://static.overlay-tech.com/assets/6217df05-a99a-47a3-b082-7af449c40c17.png"/>
    <div class="divider-1-copy-4"></div>
    <p class="a-socially-accountab">
      <strong class="asociallyaccountabemphasis1">
        A selective community of high achievers,
        <br>
        passionate about wellbeing & personal growth.
      </strong>
      <!--strong class="asociallyaccountabemphasis2"></strong>
      Build better habits to build a better you.-->
    </p>

    <!--div class="phone-number">
      <p class="us-zip"> +1 </p>
      <input class="copy5" placeholder="Enter 10-digit phone number" />
      <div class="button-dark button1">
        <p class="confirm" @click="onSubmitPhone">SUBMIT</p>
      </div>
    </div-->
    <!--div class="divider-1"></div>
    <div class="flex-wrapper1">
      <img class="landing-page-img" src="@/assets/img/LandingPage_Image.jpg"/>
      <div class="flex-wrapper5">
        <p class="meditation-is-benefi meditation-bottom">
          Meditation is beneficial for our wellbeing, but its true effects are experienced with consistent practice over a sustained period of time.
        </p>
        <p class="meditation-is-benefi">
          Through the power of social accountability, MINDSET will shift your
          view of meditation from "task" to "flow."
        </p>
      </div>
    </div>
    <div class="flex-wrapper2">
      <div class="divider-1-copy-left"></div>
      <p class="how-it-works">HOW IT WORKS</p>
      <div class="divider-1-copy-right"></div>
    </div>
    <div class="group">
      <div class="flex-wrapper3">
        <p class="num-1-decide-when-to-me">1. Set start time</p>
        <p class="select-the-time-to-m">
          Select an available session <br>or create your own.
        </p>
      </div>
      <div class="relative-wrapper1">
        <p class="num-2-launch-your-video">2. Launch video session</p>
        <p class="start-each-session-b">
          Join the session and greet <br>your assigned partner.
        </p>
      </div>
      <div class="flex-wrapper4">
        <p class="num-3-completing-medita">3. Practice meditation</p>
        <p class="meditate-with-your-p">
          Meditate together and hold <br>each other accountable.
        </p>
      </div>
    </div>
    <div class="divider-1-copy-3"></div>
    <div class="button-dark button-dark-resp">
      <p class="confirm" @click="onSelectTry">TRY MINDSET</p>
    </div>
    <div class="relative-wrapper2">
      <img
        alt="bg1"
        class="bg1"
        src="https://static.overlay-tech.com/assets/91adcbd0-28e2-42ce-ad67-2fc2ed735d12.svg"
      /><img
        alt="path-2"
        class="path-2"
        src="https://static.overlay-tech.com/assets/95af05cc-8954-4e24-a7bb-c6e4b1abe57d.svg"
      /><FooterBar class="footerbar"></FooterBar>
    </div-->
  </div>
</template>

<script>
import FooterBar from '@/components/FooterBar'
import router from '@/router';
export default {
  name: "Home2",
  components: { FooterBar },
  methods: {
    onSelectTry() {
      router.push({ name: "FullscreenTest" });
    },
    onSubmitPhone() {
      //capture phone number
    }
  },
  watch: { //set page title
    $route: {
      immediate: true,
      handler(to, from) {
        document.title = 'MINDSET' || 'Some Default Title';
      }
    }
  }
};
</script>

<style scoped>
.landing-page {
  padding: 24px 0px 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-items: center;
}
.logo-logo-56x96-copy-3 {
  margin-bottom: 35px;
  /*margin-left: 600px;*/
}
.mindset {
  width: 458px;
  height: 72px;
  margin-bottom: 32px;
  /*margin-left: 491px;*/
}
.divider-1-copy-4 {
  width: 160px;
  height: 2px;
  background-color: rgba(230, 232, 227, 1);
  margin-bottom: 32px;
  /*margin-left: 640px;*/
}
.a-socially-accountab {
  max-width: 720px;
  font-family: "Source Sans Pro";
  font-size: 24px;
  font-weight: 600;
  line-height: 36px;
  color: rgba(66, 62, 61, 1);
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 32px;
  /*margin-left: 415px;*/
  letter-spacing: 3px;
}
.asociallyaccountabemphasis1 {
  font-family: "Source Sans Pro";
  font-size: 24px;
  font-weight: 400;
  line-height: 36px;
  color: rgba(66, 62, 61, 1);
  letter-spacing: 3px;
  width: 720px;
  margin-bottom: 32px;
}
.asociallyaccountabemphasis2 {
  font-family: "Source Sans Pro";
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
  color: rgba(66, 62, 61, 1);
  letter-spacing: 3px;
}
.button1 {
  /*margin-bottom: 124px;*/
  /*margin-left: 626px;*/
}
.divider-1 {
  width: 496px;
  height: 2px;
  background-color: rgba(230, 232, 227, 1);
  margin-bottom: 107px;
  /*margin-left: 472px;*/
}
.flex-wrapper1 {
  margin-bottom: 126px;
  padding: 0px 0px 0px 0px;/*265px;*/
  display: flex;
  flex-direction: row;
  align-items: center;
}
.rectangle {
  width: 440px;
  height: 254px;
  background-color: rgba(216, 216, 216, 1);
  margin-right: 80px;
  border: 1px solid rgba(151, 151, 151, 1);
}
.landing-page-img {
  width: 444px;
  height: 256px;
  margin-right: 80px;
}
.flex-wrapper5 {
  /*padding: 18px 0px 0px;*/
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.meditation-is-benefi {
  max-width: 480px;
  font-family: "Source Sans Pro";
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  color: rgba(66, 62, 61, 1);
  letter-spacing: 1px;
}

.meditation-bottom {
  margin-bottom: 32px;
}

.flex-wrapper2 {
  margin-bottom: 72px;
  padding: 0px 0px 0px 0px; /*177px;*/
  display: flex;
  flex-direction: row;
  align-items: center;
}
.divider-1-copy-left {
  width: 420px;
  height: 2px;
  background-color: rgba(230, 232, 227, 1);
  margin-right: 24px;
}
.divider-1-copy-right {
  width: 420px;
  height: 2px;
  background-color: rgba(230, 232, 227, 1);
}
.how-it-works {
  font-family: "Source Sans Pro";
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
  color: rgba(66, 62, 61, 1);
  text-align: center;
  text-transform: uppercase;
  margin-right: 24px;
  letter-spacing: 3px;
}
.group {
  margin-bottom: 74px;
  /*margin-left: 164px;*/
  padding: 0px 0px 0px 1px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
.flex-wrapper3 {
  margin-right: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.num-1-decide-when-to-me {
  width: 326px;
  font-family: "Source Sans Pro";
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  color: rgba(66, 62, 61, 1);
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 16px;
  letter-spacing: 1px;
}
.select-the-time-to-m {
  max-width: 350px;
  font-family: "Source Sans Pro";
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  color: rgba(66, 62, 61, 1);
  text-align: center;
  letter-spacing: 1px;
}
.relative-wrapper1 {
  margin-right: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.num-2-launch-your-video {
  width: 325px;
  font-family: "Source Sans Pro";
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  color: rgba(66, 62, 61, 1);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 16px;
}
.start-each-session-b {
  max-width: 325px;
  font-family: "Source Sans Pro";
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  color: rgba(66, 62, 61, 1);
  text-align: center;
  position: relative;
  letter-spacing: 1px;
}
.flex-wrapper4 {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.num-3-completing-medita {
  width: 325px;
  font-family: "Source Sans Pro";
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  color: rgba(66, 62, 61, 1);
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 16px;
  letter-spacing: 1px;
}
.meditate-with-your-p {
  max-width: 325px;
  font-family: "Source Sans Pro";
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  color: rgba(66, 62, 61, 1);
  text-align: center;
  letter-spacing: 1px;
}
.divider-1-copy-3 {
  width: 496px;
  height: 2px;
  background-color: rgba(230, 232, 227, 1);
  margin-bottom: 54px;
  /*margin-left: 472px;*/
}
.button-dark-resp {
  margin-bottom: 94px;
  /*margin-left: 626px;*/
}
.relative-wrapper2 {
  display: flex;
  align-items: flex-start;
  position: relative;
  width: 100%;
}
.bg1 {
  width: 1440px;
  height: 229px;
  position: relative;
}
.path-2 {
  width: 1440px;
  height: 172px;
  position: absolute;
  left: 0px;
  bottom: 27px;
}
.footerbar {
  position: absolute;
  left: 0px;
  bottom: 0px;/*27px;*/
}

.logo-logo-360x360 {
  width: 360px;
  height: 360px;
}

.button-dark {
  border-radius: 19px;
  padding: 8px 38px 8px 39px;
  box-shadow: 0px 2px 10px 0px rgba(116, 115, 115, 0.33);
  display: flex;
  align-items: flex-start;
  background: linear-gradient(
    103deg,
    rgba(41, 44, 37, 1) 61%,
    rgba(104, 119, 94, 1) 125%,
    rgba(80, 88, 75, 1) 125%
  );
}
.confirm {
  width: 72px;
  font-family: "Source Sans Pro";
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  color: rgba(239, 235, 220, 1);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
}

.copy5 {
  margin-right: 16px;
  width: 264px;
  background-color: rgba(250, 251, 251, 1);
  border-radius: 5px;
  padding: 14px 12px 14px 12px;
  border: 1px solid rgba(63, 80, 42, 0.25);
  font-family: "Source Sans Pro";
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(66, 62, 61, 1);
  letter-spacing: 2px;
  &::placeholder {
    width: 267px;
    font-family: "Source Sans Pro";
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    color: rgba(66, 62, 61, 1);
    opacity: 0.5;
    letter-spacing: 2px;
  }
}

.us-zip {
  margin-right: 16px;
}

.phone-number {
  display: flex;
  align-items: center;
  flex-direction: row;
}
</style>