
<template>
  <!--div class='call'>
    <SessionTopBar :showTimer=show_timer :showLeft=show_left :leftCopy=left_copy :showLeave=show_leave :timeLimit=time_limit :sessionCopy=session_copy @timer-expired="onTimerExpired" @left-action="startTimer" @leave-session="leaveSession"></SessionTopBar>
  </div-->

  <div class="fullpages-room-pre-permissions">
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
        <div @click="onRightButton" class="group2">
          <p class="sign-in">{{right_button}}</p>
        </div>
      </div>
    </div>
    <!--div class="relative-wrapper1">
      <div class="partner"></div>
      <div class="user"></div-->
      <!--RoomCamera class="room-camera"></RoomCamera
      ><RoomMic class="room-mic"></RoomMic
      ><RoomMore class="room-more"></RoomMore
      ><RoomNetwork class="room-network"></RoomNetwork-->
    </div>
  </div>

</template>

<script>
import Timer from '@/components/Timer'
import router from '@/router'
export default {
  name: "Call",
  data () {
    return {
      time_limit: 0,
      session_copy: '',
      session_copy_right: '',
      right_button: '',
      DAILYID: 'mindset-ooo' //mindset-ooo, meditate, meditate-live
    }
  },
  components: {
    Timer
  },
  props: {
    clientID: String,
    roomName: String,
    medTime: Number,
    skipStart: Number,
    sessionType: String
  },

  mounted() {

    this.killVidChat(); //delete any loose iframe
    this.right_button = 'START';
    this.room_name = "room1";

    if (this.roomName) {
      this.med_time = this.medTime;
      this.session_type = this.sessionType;
      let cookie_obj = new Object();
      if (this.$cookies.isKey('mindset')) {
        cookie_obj = this.$cookies.get('mindset');
      }
      cookie_obj.room_name = this.roomName;
      cookie_obj.session_type = this.session_type;
      let cookie_json = JSON.stringify(cookie_obj);
      this.$cookies.set('mindset',cookie_json,-1);
      console.log("updated cookie");
      this.room_name = this.roomName;
      this.sessionLoad();
    }
    else if (this.$cookies.isKey('mindset')) {
      let cookie_obj = this.$cookies.get('mindset');
      if (cookie_obj.hasOwnProperty('session_type')) {
        this.session_type = cookie_obj.session_type;
      }
      if (cookie_obj.hasOwnProperty('room_name')) {
        this.room_name = cookie_obj.room_name;
        console.log("room:",this.room_name);
        let fetch_url = '/api/roomdetails?room=' + this.room_name;
        console.log("fetch:",fetch_url);
        fetch(fetch_url)
        .then(response => {
          if (response.status !== 200) { //server error handling
            console.log(`Looks like there was a problem. Status code: ${response.status}`);
            return;
          }
          response.json().then(data => {

            //console.log("wr time data:",data);
            if ('error' in data) { //error handling from testroom backend call
              //console.log(this.client_id,": flush active users DB error: ",data['error']);
              alert("room details error: " + data['error']);
              return;
            }
            else if ('status' in data) {
              this.med_time = parseInt(data['duration']) * 60;
              this.right_button = data['status'];
              if (this.right_button == 'READY') {
                this.checkStartCal(true);
                this.startInterval = setInterval(() => this.checkStartCal(false), 1000);
              }
              if ('time_diff' in data) {
                this.time_limit = data['time_diff'];
              }
              this.sessionLoad();
            }
          });
        })
        .catch(error => { //error handling
          console.log("Fetch error: " + error);
        });
      }
      else {
        router.push({ name: "FullscreenTest" });
      }
    }
    else {
      router.push({ name: "FullscreenTest" });
    }

    //kick out at sched + 5 min
    //if reload and start field is empty (before start)
    //if reload and start field is filled and other is empty (waiting)
    //if reload and start field is filled and other is filled within 15 min of later (during)
    //if reload and start field is filled and other is filled after 15 min of later (debrief)
    //kick out at sched + duration + 10 min


    // if (this.clientID && this.roomName) { //connect if client ID & room name given

    //   this.client_id = this.clientID;
    //   this.room_name = this.roomName;
  //     this.show_timer = false;
  //     this.session_copy = 'Say hello to each other';
  //     this.time_limit = 5 * 60;
  //     this.session_kick = true;

  //     // if (this.calBool > 0) {
  //     //   //run function to create room if does not exist with hash
  //     // }
  //     // else {
  //       this.sessionLoad();
  //     //}
  //     //set cookie session status as load
  //   }
  //   else if (this.$cookies.isKey('medlive')) { //use cookie to find room

  //     let cookie_obj = this.$cookies.get('medlive');
  //     this.client_id = cookie_obj.client_id;
  //     console.log(this.client_id,": found cookie");

  //     //if start_time exists
  //     //  let time_left = 15 - (current_time - start_time)
  //     //  beginMeditation(time_left)
  //     if (cookie_obj.start_time) {
  //       fetch('/api/timedata')
  //       .then(response => {
  //         if (response.status !== 200) { //server error handling
  //           console.log(`Looks like there was a problem. Status code: ${response.status}`);
  //           return;
  //         }
  //         response.json().then(data => {

  //           console.log("call time data:",data);
  //           if ('error' in data) { //error handling from testroom backend call
  //             console.log(this.client_id,": meditation time error: ",data['error']);
  //             alert("meditation time error: " + data['error']);
  //             return;
  //           }

  //           //set cookie session status as meditation

  //           let time_current = new Date(data['time_current']);
  //           let time_start = new Date(cookie_obj.start_time);
  //           let time_diff = 15 * 60 - parseInt((time_current - time_start) / 1000);
  //           console.log('start:',time_start,'current:',time_current,'diff:',time_diff);

  //           if (time_diff > 0) {
  //             this.checkRoom(); //get room data and load session
  //             this.beginMeditation(time_diff); //set environment for meditation
  //           }
  //           else {
  //             this.connectionLost();
  //           }
  //         });
  //       })
  //       .catch(error => { //error handling
  //         console.log("Fetch error: " + error);
  //       });
  //     }
  //     else {
  //       this.connectionLost();
  //     }
  //   }
  //   else { //kick user out if no cookie
  //     console.log("no cookie, kick out");
  //     router.push({ name: "SessionEnd" });
  //     return;
    // }
  },

  watch: { //set page title
    right_button(newValue) {
      if (this.right_button == 'START') {
        this.session_copy = "Please accept mic and video permissions"
        this.session_copy_right = "Get ready";

        //change this later when database has both columns for joining timestamp
        setTimeout(() => this.session_copy = "Say hello to partner",10 * 1000);
        this.time_limit = 300;
      }
      else if (this.right_button == 'READY') {
        this.session_copy = "Waiting for your partner to START";
        this.session_copy_right = "Hold on";
        this.time_limit = 60;
      }
      else if (this.right_button == 'PAUSE') {
        this.session_copy = "Please begin meditation";
        this.session_copy_right = 'Session started';
      }
      else if (this.right_button == 'EXIT') {
        this.session_copy = "Thank your partner";
        this.session_copy_right = "Session ended";
        this.time_limit = 300;
      }
    },
    $route: {
      immediate: true,
      handler(to, from) {
        document.title = 'Meditation Room' || 'Some Default Title';
      }
    }
  },

  beforeDestroy() {
    
    //delete vid chat
    this.killVidChat();

    //stop bell ring
    if (this.med_bell) {
      this.med_bell.pause();
      console.log('bell paused at exit');
    }

    //remove cookie session status
  },

  Destroyed() {
    //delete vid chat
    this.killVidChat();
  },

  methods: {
    onSelectBack() {
      console.log("back");
      router.push({ name: "FullscreenTest" });
    },
    sessionLoad() { //load video chat with room name
      var entry = {
        room_name: this.room_name
      };
      fetch('/api/roomtoken', { //get room token
      method: "POST",
      body: JSON.stringify(entry),
        headers: new Headers({
        "content-type": "application/json"
        })
      })
      .then(response => {
        if (response.status !== 200) { //server error handling
          console.log(`Looks like there was a problem. Status code: ${response.status}`);
          return;
        }
        response.json().then(data => { //info about client added to active users in DB
          //console.log("data: ",data);

          if ('error' in data) { //error handling from testroom backend call
            console.log(":roomtoken error: ",data['error']);
            alert("roomtoken error: " + data['error']);
            return;
          }

          //take token from backend call
          if ('token' in data) {
            //console.log("token: ",data['token']);
            
            //call daily.co API to add user to assigned video chat room
            var room_url = "https://" + this.DAILYID + ".daily.co/" + this.room_name + "?t=" + data['token'];
            //console.log(this.room_name,", call is mounted, room url:",room_url);
            let dailycoScript = document.createElement('script');
            dailycoScript.addEventListener("load", event => {
              window.callFrame = window.DailyIframe.createFrame({showFullscreenButton: true});
              callFrame.join({ url: room_url});
              var elem = document.querySelector('iframe');
              elem.style.position = "absolute";
              elem.style.top = "72px";
              elem.style.right = "0";
              elem.style.width = "100%";
              elem.style.height = "calc(100% - 72px)";
              //elem.style.visibility = (this.roomName) ? "hidden" : "visible";
            });
            dailycoScript.setAttribute('src', 'https://unpkg.com/@daily-co/daily-js/dist/daily-iframe.js');
            dailycoScript.setAttribute('crossorigin','');
            dailycoScript.setAttribute('allowfullscreen',true);
            document.body.appendChild(dailycoScript);
          }
          else {
            alert("token data missing");
            return;
          }
        });
      })
      .catch(error => { //error handling
        console.log("Fetch error: " + error);
      });
    },

    onRightButton() { //timer starts when both users press START

      if (this.right_button == 'START') {
        this.right_button = "READY";
        //load audio file, overcome autoplay issue
        if (!this.med_bell) {
          this.med_bell = new Audio(require('@/assets/meditationbell.mp3'));
          //console.log('new audio');
        }

        //workaround to loop audio on mute
        this.med_bell.muted = true;
        this.med_bell.loop = true;
        this.med_bell.play();
        //check if both users pressed start
        this.checkStartCal(true);
        this.startInterval = setInterval(() => this.checkStartCal(false), 1000);
      }
      else if (this.right_button == 'EXIT') {
        router.push({ name: 'SessionEnd2' });
      }
    },

    checkStartCal(update_start) { //check every sec if both users pressed start

      if (this.start_bool) { //both ready, terminate check
        clearInterval(this.startInterval);
        return;
      }

      //create get URL
      var request_url = '/api/checkstartcal?id=' + this.session_type + this.room_name;
      if (update_start) request_url += '&start=1';

      fetch(request_url)
      .then(response => {
        if (response.status !== 200) { //server error handling
          console.log(`Looks like there was a problem. Status code: ${response.status}`);
          return;
        }
        response.json().then(data => { //info about client added to active users in DB
          console.log("start data: ",data);
          
          if ('error' in data) { //error handling
            console.log(this.client_id,": checkStartCal error: ",data['error']);
            alert("checkStartCal error: " + data['error']);
            return;
          }

          if ('ready' in data) {
            console.log("not ready");
          }
          else {
          //if ('user_start' in data && 'partner_start' in data) { //check if both started
            let user_start = data['user_start'];
            let partner_start = data['partner_start'];
            console.log("user:",user_start,"partner:",partner_start);
            //if (user_start != '' && parter_start != '') { //both pressed start, begin meditation
              this.start_bool = true;
              this.beginMeditation();
            //}
          }
        });
      })
      .catch(error => { //error handling
        console.log("Fetch error: " + error);
      });
    },

    beginMeditation() { //begin meditation for duration

      this.right_button = "PAUSE"; //want to change to pause later
      console.log("med time is:",this.med_time);
      this.time_limit = (this.med_time > 0) ? this.med_time : 15 * 60;

      //set cookie for start time
      // if (this.$cookies.isKey('medlive')) {
      //   fetch('/api/timedata')
      //   .then(response => {
      //     if (response.status !== 200) { //server error handling
      //       console.log(`Looks like there was a problem. Status code: ${response.status}`);
      //       return;
      //     }
      //     response.json().then(data => {

      //       console.log("call time data:",data);
      //       if ('error' in data) { //error handling from testroom backend call
      //         console.log(this.client_id,": meditation time error: ",data['error']);
      //         alert("meditation time error: " + data['error']);
      //         return;
      //       }
      //       //set cookie session status as meditation

      //       let cookie_obj = this.$cookies.get('medlive');
      //       cookie_obj.start_time = data['time_current'];
      //       let cookie_json = JSON.stringify(cookie_obj);
      //       this.$cookies.set('medlive',cookie_json,-1);
      //       console.log("medlivetime:",this.$cookies.get('medlive'));
      //     });
      //   })
      //   .catch(error => { //error handling
      //     console.log("Fetch error: " + error);
      //   });
      // }
    },

    onTimerExpired() {

      if (this.right_button == "PAUSE") {
        this.bellRings();
        this.right_button = "EXIT";
      }
      else if (this.right_button == "EXIT") {
        router.push({ name: 'SessionEnd2' });
      }
      else {
        router.push({ name: 'FullscreenTest' });
      }
    },

    bellRings() { //bell rings after timer expires

      //reset and unmute audio
      console.log("audio played");
      this.med_bell.currentTime = 0;
      this.med_bell.muted = false;
      this.med_bell.volume = 1;
      this.med_bell.loop = false;

      this.med_bell.addEventListener('canplaythrough', event => {
        console.log("audio loaded");
      });

      this.med_bell.play();

      //set cookie session status as debrief
    },

    connectionLost() { //sets environment if connection lost
      //reset session environment 
      this.show_left = false;
      this.session_copy = 'Connection lost, timer stopped.';
      this.time_limit = 20 * 60; 
      this.checkRoom(); //get room data and load session
    },

    //disconnect from vid chat & delete iframe
    killVidChat() {
      var elem = document.querySelector('iframe');
      if (elem) {
        elem.style.display = 'none';
        callFrame.leave();
        callFrame.destroy();
        console.log("killed vid chat");
      }
      else {
        console.log("did not find vid chat");
      }
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fullpages-room-pre-permissions {
  padding: 0px 0px 73px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.web-navbar-room-pre {
  margin-bottom: 16px;
}
.relative-wrapper1 {
  display: flex;
  align-items: flex-start;
  position: relative;
}
.partner {
  width: 1402px;
  height: 863px;
  background-color: rgba(250, 251, 251, 1);
  margin-left: 1px;
  position: relative;
  border: 1px solid rgba(216, 228, 228, 1);
}
.user {
  width: 304px;
  height: 192px;
  background-color: rgba(171, 174, 168, 1);
  position: absolute;
  right: 548px;
  bottom: 24px;
}
.room-camera {
  position: absolute;
  left: 40px;
  bottom: 24px;
}
.room-mic {
  position: absolute;
  left: 136px;
  bottom: 24px;
}
.room-more {
  position: absolute;
  right: 134px;
  bottom: 24px;
}
.room-network {
  position: absolute;
  right: 38px;
  bottom: 24px;
}

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
