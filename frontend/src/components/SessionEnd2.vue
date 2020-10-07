<template>
  <div class="fullpages-room-post-notes">
    <WebNavBar class="web-navbar-signedin-noalert">
    </WebNavBar>
    <div class="room-post-notes-header sui-signin-0-header">
      <img alt="logo" class="logo-logo-28x48" src="@/assets/img/Logo-56x96.svg"/>
      <p class="sign-in">SESSION COMPLETE</p>
    </div>
    <div class="room-post-notes">
    <p class="thanks-for-participa">
      Congrats! Thank you for your participation.
      <br>
      Did your partner meditate in the session?
    </p>
    <div class="flex-wrapper1">
      <div id="thumbs-up" class="room-post-notes-left" @click="onSelectYes">
        <img alt="icons-thumbs-up" class="icons-thumbs-up" src="@/assets/img/thumbs-up.svg"/>
      </div>
      <div id="thumbs-down" class="room-post-notes-right" @click="onSelectNo">
        <img alt="icons-thumbs-down" class="icons-thumbs-down" src="@/assets/img/thumbs-down.svg"/>
      </div>
    </div>
    <p class="leave-notes-below-as">
      What did you notice about your thoughts?
      <br>
      Feel free to log a journal entry below.
    </p>
    <textarea v-model="notes_input" class="input" placeholder="Type your observations here">
    </textarea>
    <div class="button-dark" @click="goToScheduleSession">
      <p class="confirm">Submit</p>
    </div>
  </div> 
</template>

<script>
import WebNavBar from '@/components/WebNavBar'
import router from '@/router'
export default {
  name: 'SessionEnd2',
  data () {
    return {
      yesSelected: false,
      noSelected: false,
      notes_input: ''
    }
  },
  components: {
    WebNavBar
  },
  methods: {
    onSelectYes() {
      document.getElementById("thumbs-up").style.backgroundColor = "rgba(65, 155, 9, 1)";
      document.getElementById("thumbs-down").style.backgroundColor = "rgba(255, 163, 163, 0.15)";
    },
    onSelectNo() {
      document.getElementById("thumbs-up").style.backgroundColor = "rgba(65, 155, 9, 0.15)";
      document.getElementById("thumbs-down").style.backgroundColor = "rgba(255, 163, 163, 1)";
    },
    goToScheduleSession() {
      router.push({ name: "FullscreenTest" });
    },
    goToHomepage() {
      router.push({ name: "Home" });
    }
  },

  watch: { //set page title
    $route: {
      immediate: true,
      handler(to, from) {
        document.title = 'Session Ended' || 'Some Default Title';
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fullpages-room-post-notes {
  /*padding: 0px 0px 232px;*/
  display: flex;
  flex-direction: column;
  align-items: center;
}
.web-navbar-signedin-noalert {
  /*margin-bottom: 118px;*/
  /*right: 0px;
  top: 0px;*/
  height: 72px;
  width: 100%;
}
.room-post-notes-header {
  margin-bottom: 24px;
  /*margin-left: 544px;*/
}

.sui-signin-0-header {
  padding: 0px 0px 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 2px solid rgba(230, 232, 227, 1);
}
.logo-logo-28x48 {
  margin-bottom: 4px;
  width: 28px;
  height: 48px;
}
.sign-in {
  width: 400px;
  font-family: "Source Sans Pro";
  font-size: 32px;
  font-weight: 700;
  line-height: 48px;
  color: rgba(51, 46, 45, 1);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 4px;
}

.room-post-notes {
  /*margin-left: 476px;*/
  display: flex;
  flex-direction: column;
  align-items: center;
}
.thanks-for-participa {
  max-width: 480px;
  font-family: "Source Sans Pro";
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(51, 46, 45, 1);
  text-align: center;
  margin-bottom: 36px;
  /*margin-left: 35px;*/
  letter-spacing: 2px;
}
.flex-wrapper1 {
  margin-bottom: 36px;
  /*padding: 0px 0px 0px 144px;*/
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
.leave-notes-below-as {
  font-family: "Source Sans Pro";
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(51, 46, 45, 1);
  text-align: center;
  margin-bottom: 16px;
  /*margin-left: 24px;*/
  letter-spacing: 2px;
}
.input {
  height: 120px;
  width: 392px;
  background-color: rgba(250, 251, 251, 1);
  margin-bottom: 36px;
  margin-left: 1px;
  border-radius: 5px;
  padding: 16px 16px 16px 16px;
  display: flex;
  align-items: flex-start;
  border: 1px solid rgba(63, 80, 42, 0.25);
  
  font-family: "Source Sans Pro";
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(66, 62, 61, 1);
  opacity: 1;
  letter-spacing: 2px;
}
/*
.button-dark {
  margin-left: 166px;
}
*/
.room-post-notes-left {
  background-color: rgba(65, 155, 9, 0.15);
  border-radius: 10px;
  padding: 27px;
  display: flex;
  align-items: flex-start;
  border: 1px solid rgba(65, 155, 9, 1);
  margin-right: 39px;
  cursor: pointer;
}
.icons-thumbs-up {
  width: 24px;
  height: 24px;
}
.room-post-notes-right {
  background-color: rgba(255, 163, 163, 0.15);
  border-radius: 10px;
  padding: 27px;
  display: flex;
  align-items: flex-start;
  border: 1px solid rgba(255, 163, 163, 1);
  cursor: pointer;
}
.icons-thumbs-down {
  width: 24px;
  height: 24px;
}

.button-dark {
  border-radius: 19px;
  padding: 8px 38px 8px 39px;
  box-shadow: 0px 2px 10px 0px rgba(116, 115, 115, 0.33);
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  background: linear-gradient(
    103deg,
    rgba(41, 44, 37, 1) 61%,
    rgba(104, 119, 94, 1) 125%,
    rgba(80, 88, 75, 1) 125%
  );
}
.confirm {
  width: 80px;
  font-family: "Source Sans Pro";
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  color: rgba(239, 235, 220, 1);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
}
</style>