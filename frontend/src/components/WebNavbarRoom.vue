<template>
  <div class="room-header">
    <div class="group-left">
      <div @click="onSelectBack" class="room-backbutton">
        <img class="icons-chevron-left" src="@/assets/img/chevron-left.svg"/>
      </div>
      <p class="please-be-sure-to-ac">
        {{session_copy}}
      </p>
    </div>
    <div class="group-right">
      <p class="time-until-session-s">
        {{session_copy_right}}
      </p>
      <div class="signedin-alertdot">
        <div class="oval"></div>
      </div>
      <!--p class="timer">1:47</p-->
      <Timer :timeLimit='time_limit' @timer-expired="onTimerExpired" class="timer"></Timer>
      <div class="rectangle"></div>
      <div @click="onStartTimer" class="group2">
        <p class="sign-in">{{right_button}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import Timer from '@/components/Timer'
export default {
  name: "WebNavbarRoom",
  data () {
    return {
      time_limit: 0,
      session_copy: '',
      session_copy_right: "Get ready",
      right_button: 'START'
    }
  },
  components: {
    Timer
  },
  props: [
    'sessionCopy',
    'sessionCopyRight',
    'timeLimit'
  ],
  watch: {
    sessionCopy(newValue) {
      this.session_copy = this.sessionCopy;
    },
    sessionCopyRight(newValue) {
      this.session_copy_right = this.sessionCopyRight;
    },
    timeLimit(newValue) {
      this.time_limit = this.timeLimit;
    }
  },
  mounted() {
    this.time_limit = 300;
    this.session_copy = "Please be sure to accept Microphone and video permissions."

    //change this later when database has both columns for joining timestamp
    setTimeout(() => this.session_copy = "Say Hello to Partner",10 * 1000);
  },
  methods: {
    onSelectBack() {
      console.log("back");
      router.push({ name: "FullscreenTest" });
    },
    onStartTimer() {
      this.$emit('start-timer');
    },
    onTimerExpired() {
      this.$emit('timer-expired');
    }
  }
};
</script>

<style scoped>
.room-header {
  padding: 12px 44px 12px 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(
    91deg,
    rgba(239, 235, 220, 1) 42%,
    rgba(191, 180, 139, 1) 161%
  );
}
.room-backbutton {
  background-color: rgba(102, 102, 102, 0.15);
  padding: 12px;
  display: flex;
  align-items: flex-start;
  margin-right: 24px;
  margin-left: 10px;
  cursor: pointer;
}
.please-be-sure-to-ac {
  /*width: 620px;*/
  font-family: "Source Sans Pro";
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  color: rgba(66, 62, 61, 1);
  text-transform: uppercase;
  margin-right: 163px;
  letter-spacing: 1px;
}
.group-left {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.group-right {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.time-until-session-s {
  width: 284px;
  font-family: "Source Sans Pro";
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  color: rgba(66, 62, 61, 1);
  text-align: right;
  text-transform: uppercase;
  margin-right: 16px;
  letter-spacing: 1px;
}
.signedin-alertdot {
  background-color: rgba(255, 91, 91, 1);
  margin-right: 12px;
  border-radius: 50%;
  padding: 6px 5px 5px 6px;
  display: flex;
  align-items: flex-start;
}
.oval {
  width: 5px;
  height: 5px;
  background-color: rgba(238, 242, 244, 1);
  border-radius: 50%;
}
.timer {
  font-family: "Source Sans Pro";
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  color: rgba(66, 62, 61, 1);
  text-align: center;
  margin-right: 16px;
  letter-spacing: 2px;
}
.rectangle {
  width: 2px;
  height: 24px;
  background-color: rgba(63, 80, 42, 1);
  margin-right: 16px;
  border-radius: 1px;
}

.icons-chevron-left {
  width: 24px;
  height: 24px;
}

.group2 {
  border-radius: 21px;
  padding: 10px 0px 8px;
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  background: linear-gradient(
    106deg,
    rgba(80, 88, 75, 1) 61%,
    rgba(104, 119, 94, 1) 61%,
    rgba(41, 44, 37, 1) 125%
  );
}
.sign-in {
  width: 136px;
  font-family: "Source Sans Pro";
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  color: rgba(251, 250, 250, 1);
  text-align: center;
  letter-spacing: 1px;
}
</style>