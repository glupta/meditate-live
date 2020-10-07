<template>
  <div class="fullscreen-test">
    <WebNavBar class="web-navbar-signedin-alert"></WebNavBar>
    <CalendarMain @date-active="onDateActive" class="calendar-main"></CalendarMain>
    <ScheduleNewPublicSoloMenuNEW @select-public='onSelectPublic' @select-new='onSelectNew' class="sessionoptions-text"></ScheduleNewPublicSoloMenuNEW>
    <PublicSessions v-if="public_bool" :dateActive="date_active" :refreshCount="refresh_count" @public-sched="onPublicSched" class="publicsession"></PublicSessions>
    <NewSession v-if="new_bool" :dateActive="date_active" @priv-info="onPrivInfo" @new-sched="onNewSched" class="newsessions"></NewSession>
    <div v-if="popup_bool" class="shadowoverlay"></div>
    <div v-if="popup_bool" class="popupwindow">
      <div class="relative-wrapper1">
        <div class="rectangle-popup"></div>
        <div class="headerbar"></div>
        <img v-if="popup_exit_bool" class="icons-xmark" src="@/assets/img/xmark.svg" @click="exitPopup"/>
        <p v-if="email_popup" class="popup-header">YOUR EMAIL</p>
        <p v-if="error_popup" class="popup-header">ERROR</p>
        <p v-if="invitesent_popup" class="popup-header">INVITATION SENT</p>
        <p v-if="load_popup" class="popup-header">{{load_hdr}}</p>
      </div>

      <div v-if="email_popup" class="popup-text">
        <p class="great-please-enter">
          Please enter your email below to access MINDSET.
        </p>
        <input v-model="user_email" class="input user-entry-signin" placeholder="Enter your email" />
        <div @click="onSubmitEmail" class="button-dark user-entry-signin">
          <p class="confirm">SUBMIT</p>
        </div>
      </div>

      <div v-if="error_popup" class="popup-text">
        <p class="looks-like-the-dura">
        {{error_msg}}
        </p>
        <p @click="exitPopup" class="tosolosession">OK, GOT IT!</p>
      </div>

      <div v-if="priv_popup" class="popup-text">
        <p class="looks-like-the-dura">
          By selecting “Private,” your scheduled session will NOT show up in the Public Sessions.
        </p>
        <p @click="exitPopup" class="tosolosession">OK, GOT IT!</p>
      </div>

      <div v-if="load_popup" class="popup-text">
        <p class="looks-like-the-dura">
        {{load_msg}}
        </p>
      </div>

      <div v-if="invitesent_popup" class="popup-text">
        <p class="please-confirm-the-s">
          We sent you an email. Please click on the link to confirm.
        </p>
        <p v-if="!save_email_bool" class="see-details-below">See details below.</p>
        <div v-if="!save_email_bool" class="partnerdetails">
          <div class="namebucket">
            <p class="nametext">Email:</p>
            <p class="num-900-am">{{user_email}}</p>
          </div>
          <div class="timebucket">
            <p class="timetext">Time:</p>
            <p class="num-900-am">{{sched_time_format}}</p>
          </div>
          <div class="namebucket">
            <p class="durationtext">Duration:</p>
            <p class="num-900-am">{{user_duration}} min.</p>
          </div>
        </div>
        <p @click="exitPopup" class="tosolosession">OK, GOT IT!</p>
      </div>

      <div v-if="confirm_popup" class="popup-text">
        <p class="looks-like-the-dura">
        Thank you for confirming your session.
        </p>
        <p @click="exitPopup" class="tosolosession">DONE</p>
      </div>

    </div>
  </div>
</template>

<script>
import router from '@/router'
import WebNavBar from '@/components/WebNavBar'
import CalendarMain from '@/components/CalendarMain'
import ScheduleNewPublicSoloMenuNEW from '@/components/ScheduleNewPublicSoloMenuNEW'
import PublicSessions from '@/components/PublicSessions'
import NewSession from '@/components/NewSession'
export default {
  name: "FullscreenTest",
  data () {
    return {
      time_current: new Date(),
      public_bool: true,
      new_bool: false,
      popup_bool: false,
      date_active: '',
      refresh_count: 0,
      email_popup: false,
      user_email: '',
      invitesent_popup: false,
      error_popup: false,
      error_msg: '',
      sched_time: new Date(),
      sched_time_format: '',
      user_duration: 0,
      sched_popup: false,
      load_popup: false,
      load_msg: '',
      load_hdr: '',
      confirm_popup: false,
      priv_popup: false,
      public_submit_bool: false,
      public_hash: '',
      invite_email: '',
      save_email_bool: false,
      cookie_bool: true,
      confirm_hash_bool: false,
      popup_exit_bool: true
    }
  },
  components: {
    CalendarMain,
    WebNavBar,
    PublicSessions,
    NewSession,
    ScheduleNewPublicSoloMenuNEW,
  },
  watch: { //set page title
    $route: {
      immediate: true,
      handler(to, from) {
        document.title = 'Schedule' || 'Some Default Title';
      }
    }
  },
  mounted() {

    fetch('/api/timedata') //get current datetime
    .then(response => {
      if (response.status !== 200) { //server error handling
        console.log(`Looks like there was a problem. Status code: ${response.status}`);
        return;
      }
      response.json().then(data => {

        console.log("time data:",data);
        if ('error' in data) { //error handling from testroom backend call
          console.log("request time error: ",data['error']);
          alert("request time error: " + data['error']);
          return;
        }
        //get today's date
        this.time_current = new Date(data['time_current']);
        this.date_active = new Date(this.time_current.getFullYear(),this.time_current.getMonth(),this.time_current.getDate());
      });
    })
    .catch(error => { //error handling
      console.log("Fetch error: " + error);
    });

    //only set cookie if flagged
    if (this.$cookies.isKey('mindset')) {
      let cookie_obj = this.$cookies.get('mindset');
      this.user_id = cookie_obj.client_id;
      console.log(this.user_id,": found cookie");
      //this.user_email = "akshaygupta54321@gmail.com";
      //extract email ID from database or cookie
      fetch('/api/getemail?id=' + this.user_id) //get current datetime
      .then(response => {
        if (response.status !== 200) { //server error handling
          console.log(`Looks like there was a problem. Status code: ${response.status}`);
          return;
        }
        response.json().then(data => {
          console.log("get email data:",data);
          this.load_popup = false;
          if ('error' in data) { //error handling from testroom backend call
            console.log("get email error: ",data['error']);
            this.popup_exit_bool = false;
            this.popup_bool = true;
            this.email_popup = true;
          }
          else {
            this.user_email = data['user_email'];
            console.log("user email:",this.user_email);
            //this.confirmHash();
            
            this.popup_exit_bool = false;
            this.popup_bool = true;
            this.load_hdr = "Under Construction";
            this.load_msg = "Stay tuned for exciting updates soon!";
            this.load_popup = true;
          }
        });
      })
      .catch(error => { //error handling
        console.log("Fetch error: " + error);
      });
    }
    else {
      this.user_id = Math.random().toString(36).slice(-5);
      let cookie_obj = new Object();
      cookie_obj.client_id = this.user_id;
      let cookie_json = JSON.stringify(cookie_obj);
      this.$cookies.set('mindset',cookie_json,-1);
      console.log("create cookie");
      this.popup_exit_bool = false;
      this.popup_bool = true;
      this.email_popup = true;
      //capture email ID to store in database or cookie
    }
  },
  methods: {
    onDateActive(n) { //set active date if user selects new date
      this.date_active = new Date(this.time_current.getFullYear(),this.time_current.getMonth(),this.time_current.getDate());
      this.date_active.setDate(this.date_active.getDate() + n);
      console.log("date_active:",this.date_active);
    },
    onSelectPublic() { //show public session window
      this.new_bool = false;
      this.public_bool = true;
      console.log("public");
    },
    onSelectNew() { //show new session window
      this.new_bool = true;
      this.public_bool = false;
      console.log("new");
    },
    exitPopup() { //exit popup window
      this.email_popup = false;
      this.error_popup = false;
      this.invitesent_popup = false;
      this.sched_popup = false;
      this.load_popup = false;
      this.confirm_popup = false;
      this.priv_popup = false;
      this.save_email_bool = false;
      this.popup_bool = false;
      if (this.confirm_hash_bool) {
        this.confirm_hash_bool = false;
        this.confirmHash();
      }
      this.refresh_count += 1;
      console.log("refresh:",this.refresh_count);
    },
    onPrivInfo() {
      this.popup_bool = true;
      this.priv_popup = true;
    },
    onNewSched(sched,duration,invite,priv) { //submit new session request
      this.public_submit_bool = false;
      this.popup_bool = true;
      console.log(sched,duration,invite,priv);
      if (this.time_current.getTime() >= sched.getTime()) {
        this.error_msg = "The scheduled time you requested is before current time. Please try again.";
        this.error_popup = true;
        return;
      }
      // let user_duration = parseInt(duration);
      // if (isNaN(user_duration) || user_duration < 5 || user_duration > 60 || user_duration % 5 > 0) {
      //   this.error_msg = "The duration is invalid. Please pick a time between 5 and 60 minutes in increments of 5 minutes.";
      //   this.error_popup = true;
      //   return;
      // }
      let user_duration = parseInt(duration);
      if (isNaN(user_duration) || user_duration > 60) {
        this.error_msg = "The duration is invalid. Please pick a time between 5 and 60 minutes in increments of 5 minutes.";
        this.error_popup = true;
        return;
      }
      //check if invite email is valid
      const re = /\S+@\S+\.\S+/;
      if (invite != '' && !re.test(invite)) {
        this.error_msg = "The friend's email invite is invalid. Please try again.";
        this.error_popup = true;
        return;
      }
      if (priv && invite == '') { //if private without invite
        this.error_msg = "You checked off private but did not invite a friend. Please try again.";
        this.error_popup = true;
        return;
      }

      this.load_msg = "Scheduling...";
      this.load_popup = true;
      this.sched_time = sched;
      this.user_duration = user_duration;
      this.invite_email = invite;
      this.priv_bool = priv;
      var moment = require('moment');
      moment().format();
      this.sched_time_format = this.sched_time;
      this.sched_time_format = moment(this.sched_time_format).format('ddd MMM D LT');
      console.log("sched format:",this.sched_time_format);
      let offset = new Date().getTimezoneOffset();

      let sched_time_local = this.sched_time.toString();
      var entry = {
        user_id: this.user_id,
        user_email: this.user_email,
        sched_time: this.sched_time,
        sched_time_local: sched_time_local,
        session_hash: this.public_hash,
        invite_email: this.invite_email,
        duration: this.user_duration,
        private_bool: (this.priv_bool) ? 1 : 0,
        offset: offset
      };
      fetch('/api/schednew', {
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
        response.json().then(data => {
          this.load_popup = false;
          console.log("session data:",data);
          if ('error' in data) { //error handling from backend call
            this.error_msg = "There was an error while scheduling the session: " + data['error'] + ". Please try again.";
            this.error_popup = true;
            return;
          }
          if ('success' in data) { //inserted into sessions table
            console.log("session scheduled");
            //this.invitesent_popup = true;
            this.confirm_popup = true;
            this.refreshSessions(); //refresh session list
          }
        });
      })
      .catch(error => { //error handling
        console.log("Fetch error: " + error);
      });
    },
    onPublicSched(hash) {
      console.log("hash:",hash);
      this.public_hash = hash;
      this.popup_bool = true;
      this.load_msg = "Scheduling...";
      this.load_popup = true;
      
      let offset = new Date().getTimezoneOffset();
      let fetch_url = '/api/schedpublic?hash=' + this.public_hash + '&email=' + this.user_email + '&id=' + this.user_id + '&tz=' + offset;
      fetch(fetch_url)
      .then(response => {
        if (response.status !== 200) { //server error handling
        console.log(`Looks like there was a problem. Status code: ${response.status}`);
        return;
        }
        response.json().then(data => {
          this.load_popup = false;
          if ('error' in data) { //error handling from testroom backend call
            console.log("request time error: ",data['error']);
            this.error_msg = "Public scheduling error: " + data['error'];
            this.error_popup = true;
            return;
          }
          else if ('success' in data) {
            //update sched time and duration details
            //var moment = require('moment');
            //moment().format();
            //this.sched_time_format = new Date(data['sched_time']);
            //this.sched_time_format = moment(this.sched_time_format).format('ddd MMM D LT');
            //this.user_duration = data['duration'];
            //this.invitesent_popup = true;
            this.confirm_popup = true;
            //this.refreshSessions(); //refresh session list
          }
        });
      })
      .catch(error => { //error handling
        console.log("Fetch error: " + error);
      });
    },
    onSubmitEmail() { //user submits email
      console.log("email:",this.user_email);
      const re = /\S+@\S+\.\S+/;
      if (!re.test(this.user_email)) {
        alert("Your email is invalid. Please try again.");
        return;
      }
      this.load_msg = "Saving...";
      this.email_popup = false;
      this.load_popup = true;
      //add to DB if not there already
      let fetch_url = '/api/storeemail?id=' + this.user_id + '&em=' + this.user_email;
      fetch(fetch_url) //get current datetime
      .then(response => {
        if (response.status !== 200) { //server error handling
          console.log(`Looks like there was a problem. Status code: ${response.status}`);
          return;
        }
        response.json().then(data => {
          //this.load_popup = false;
          this.load_hdr = "Under Construction";
          this.load_msg = "Stay tuned for exciting updates soon!";
          console.log("save email data:",data);
          if ('error' in data) { //error handling from testroom backend call
            console.log("save email error: ",data['error']);
            this.error_msg = "There was an error while saving your email: " + data['error'] + ". Please try again.";
            this.error_popup = true;
            return;
          }
          else if ('user_id' in data) {
            console.log("user id found");
            // this.user_id = data['user_id'];
            // let cookie_obj = new Object();
            // if (this.$cookies.isKey('mindset')) {
            //   cookie_obj = this.$cookies.get('mindset');
            // }
            // cookie_obj.client_id = this.user_id;
            // let cookie_json = JSON.stringify(cookie_obj);
            // this.$cookies.set('mindset',cookie_json,-1);
            // console.log("updated cookie",this.user_id,this.user_email);
            // this.popup_bool = false;
            // this.confirmHash();
          }
          else if ('success' in data) {
            console.log("user email saved:");
            // this.save_email_bool = true;
            // this.invitesent_popup = true;
            // this.confirm_hash_bool = true;
          }
        });
      })
      .catch(error => { //error handling
        console.log("Fetch error: " + error);
      });
    },
    confirmHash() {
      //for users confirming sessions
      this.session_hash = this.$route.query.id;
      if (this.session_hash) { //if id query is given
        this.popup_bool = true;
        this.load_popup = true;
        //confirm email ID
        if (this.session_hash.charAt(0) == 'e') {
          this.cookie_bool = false;
          this.load_msg = "Registering...";
          fetch('/api/confirmemail?id=' + this.session_hash) //get current datetime
          .then(response => {
            if (response.status !== 200) { //server error handling
              console.log(`Looks like there was a problem. Status code: ${response.status}`);
              return;
            }
            response.json().then(data => {
              console.log("confirm email data:",data);
              this.load_popup = false;
              if ('error' in data) { //error handling from testroom backend call
                console.log("confirm email error: ",data['error']);
                this.email_popup = true;
              }
              else {
                console.log("registered!");
                this.user_id = data['user_id'];
                this.user_email = data['user_email'];
                let cookie_obj = new Object();
                cookie_obj.client_id = this.user_id;
                let cookie_json = JSON.stringify(cookie_obj);
                this.$cookies.set('mindset',cookie_json,-1);
                console.log("updated cookie",this.user_id,this.user_email);
                this.popup_bool = false;
              }
            });
          })
          .catch(error => { //error handling
            console.log("Fetch error: " + error);
          });
        }
        //user clicked wait link to start video chat
        else if (this.session_hash.charAt(0) == 'w') {
          this.room_name = this.session_hash.substring(2);
          this.load_msg = "Joining...";
          //check DB to see how long until starts
          //get current time & get sched time from DB and find TAT
          fetch('/api/joinroom?id=' + this.session_hash)
          .then(response => {
            if (response.status !== 200) { //server error handling
              console.log(`Looks like there was a problem. Status code: ${response.status}`);
              return;
            }
            response.json().then(data => {
              this.load_popup = false;
              if ('error' in data) { //error handling
                this.error_msg = "There was an error while joining the session: " + data['error'] + ". Please try again.";
                this.error_popup = true;
              }
              else { //join room if less than 5 minutes
                this.user_duration = data['duration'] * 60;
                let time_diff = data['time_diff'];
                console.log("duration:",this.user_duration,"time:",time_diff);
                //if (time_diff > 300 || time_diff < 0) {
                if (time_diff < 0) {
                  this.error_msg = "You are too early or too late. The room is only open for 5 minutes before the start time.";
                  this.error_popup = true;
                }
                else {
                  let request_url = '/api/createroom?room=' + this.room_name;
                  fetch(request_url)
                  .then(response => {
                    if (response.status !== 200) { //server error handling
                      console.log(`Looks like there was a problem. Status code: ${response.status}`);
                      return;
                    }
                    response.json().then(data => { //info about client added to active users in DB
                      console.log("data: ",data);
                      if ('error' in data) { //error handling from testroom backend call
                        console.log("create room error: ",data['error']);
                        this.error_msg = "create room error: " + data['error'];
                        this.error_popup = true;
                        return;
                      }

                      //take room name from backend call
                      if ('room_name' in data) {
                        console.log(data['room_name']);
                        router.push({
                          name: "Room",
                          params: {
                            clientID: this.user_id, 
                            roomName: this.room_name,
                            medTime: parseInt(this.user_duration),
                            skipStart: 0,
                            sessionType: this.session_hash.charAt(1)
                          }
                        })
                      }
                      else {
                        this.error_msg = "room name missing";
                        this.error_popup = true;
                        return;
                      }
                    });
                  })
                  .catch(error => { //error handling
                    console.log("Fetch error: " + error);
                  });
                }
              }
            });
          })
          .catch(error => { //error handling
            console.log("Fetch error: " + error);
          });
        } //confirm url for invite emails
        else if (this.session_hash.charAt(0) == 'i') { 
          this.load_msg = "Confirming...";
          //call server with session type and hash
          let offset = new Date().getTimezoneOffset();
          let fetch_url = '/api/schedinvite?id=' + this.session_hash + '&tz=' + offset + '&ui=' + this.user_id + '&ue=' + this.user_email;
          console.log("fetch:",fetch_url);
          fetch(fetch_url)
          .then(response => {
            if (response.status !== 200) { //server error handling
              console.log(`Looks like there was a problem. Status code: ${response.status}`);
              return;
            }
            response.json().then(data => {
              this.load_popup = false;
              if ('error' in data) { //error handling
                this.error_msg = "There was an error while confirming the session: " + data['error'] + ". Please try again.";
                this.error_popup = true;
                return;
              }
              if ('success' in data) {
                console.log("successful");
                this.confirm_popup = true;
              }
            });
          })
          .catch(error => { //error handling
            console.log("Fetch error: " + error);
          });
        }
      }
    }
  }
};
</script>

<style scoped>
.fullscreen-test {
  padding: 0px 0px 0px 0px;
  display: flex;
  align-items: flex-start;
}
.backgroundbase {
  position: relative;
}
.calendar-main {
  position: absolute;
  left: 35px;
  top: 144px;
}
.web-navbar-signedin-alert {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
}
.sessionoptions-text {
  position: absolute;
  left: 80px;
  top: 411px;
}
.newsessions {
  position: absolute;
  left: 439px;
  top: 406px;
}
.publicsession {
  position: absolute;
  left: 439px;
  top: 406px;
}
.schedule-newpublicsolomenu-new {
  position: absolute;
  left: 90px;
  bottom: 358px;
}
.shadowoverlay {
  position: absolute;
  left: 0px;
  top: 0px;
  bottom: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(80, 85, 75, 1);
  opacity: 0.5;
}

.popupwindow {
  background-color: rgba(250, 251, 251, 1);
  border-radius: 10px;
  padding: 0px 0px 44px;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 784px;
  height: 293px;
  position: absolute;
  left: 326px;
  top: 316px;
}
.relative-wrapper1 {
  margin-bottom: 24px;
  display: flex;
  align-items: flex-start;
  position: relative;
}
.rectangle-popup {
  width: 784px;
  height: 20px;
  background-color: rgba(63, 80, 42, 1);
  opacity: 0.5;
  position: absolute;
  left: 0px;
  bottom: -2px;
}
.headerbar {
  width: 784px;
  height: 48px;
  background-color: rgba(239, 235, 220, 1);
  border-radius: 10px 10px 0 0;
  position: relative;
}
.popup-header {
  width: 240px;
  font-family: "Source Sans Pro";
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  color: rgba(66, 62, 61, 1);
  text-align: center;
  text-transform: uppercase;
  position: absolute;
  left: 271px;
  top: 12px;
  letter-spacing: 1px;
}
.great-please-enter {
  width: 744px;
  font-family: "Source Sans Pro";
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(51, 46, 45, 1);
  text-align: center;
  margin-bottom: 24px;
  letter-spacing: 2px;
}
.user-entry-signin {
  margin-bottom: 32px;
  text-align: center;
}
.icons-xmark {
  position: absolute;
  right: 21px;
  top: 12px;
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.input {
  width: 267px;
  background-color: rgba(250, 251, 251, 1);
  border-radius: 5px;
  padding: 14px 12px 14px 12px;
  border: 1px solid rgba(63, 80, 42, 0.25);
  font-family: "Source Sans Pro";
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(51, 46, 45, 1);
  letter-spacing: 2px;
  &::placeholder {
    width: 267px;
    font-family: "Source Sans Pro";
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    color: rgba(51, 46, 45, 1);
    opacity: 0.5;
    letter-spacing: 2px;
  }
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
  cursor: pointer;
}
.confirm {
  width: 79px;
  font-family: "Source Sans Pro";
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  color: rgba(239, 235, 220, 1);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.popupwindow-invitesent {
  background-color: rgba(250, 251, 251, 1);
  border-radius: 10px;
  padding: 0px 0px 29px;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 326px;
  top: 316px;
}
.rectangle-invitesent {
  width: 579px;
  height: 20px;
  background-color: rgba(63, 80, 42, 1);
  opacity: 0.5;
  position: absolute;
  left: 0px;
  bottom: -2px;
}
.invitation-sent {
  width: 243px;
  font-family: "Source Sans Pro";
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  color: rgba(66, 62, 61, 1);
  text-align: center;
  text-transform: uppercase;
  position: absolute;
  left: 168px;
  top: 12px;
  letter-spacing: 1px;
}
.please-confirm-the-s {
  width: 579px;
  font-family: "Source Sans Pro";
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(51, 46, 45, 1);
  text-align: center;
  letter-spacing: 2px;
  /*margin-top: 40px;*/
  margin-bottom: 16px;
}
.see-details-below {
  width: 579px;
  font-family: "Source Sans Pro";
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(51, 46, 45, 1);
  text-align: center;
  margin-bottom: 16px;
  opacity: 0.5;
  letter-spacing: 2px;
}
.partnerdetails {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 752px;
  margin-bottom: 40px;
}
.namebucket {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 16px;
}
.nametext {
  width: 86px;
  font-family: "Source Sans Pro";
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(66, 62, 61, 1);
  letter-spacing: 2px;
}
.tyson-r {
  width: 103px;
  font-family: "Source Sans Pro";
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  color: rgba(66, 62, 61, 1);
  text-transform: uppercase;
  letter-spacing: 1px;
}
.timebucket {
  /*margin-right: 73px;*/
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 16px;
}
.timetext {
  /*width: 62px;*/
  font-family: "Source Sans Pro";
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(66, 62, 61, 1);
  letter-spacing: 2px;
}
.num-900-am {
  /*width: 74px;*/
  font-family: "Source Sans Pro";
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  color: rgba(66, 62, 61, 1);
  text-transform: uppercase;
  letter-spacing: 1px;
}
.durationtext {
  width: 80px;
  font-family: "Source Sans Pro";
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(66, 62, 61, 1);
  letter-spacing: 2px;
}

.popupwindow-error {
  padding: 0px 1px;
  display: flex;
  align-items: flex-start;
  position: relative;
}
.rectangle-error {
  width: 505px;
  height: 214px;
  background-color: rgba(250, 251, 251, 1);
  border-radius: 10px;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15);
  position: relative;
}
.looks-like-the-dura {
  max-width: 505px;
  font-family: "Source Sans Pro";
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(51, 46, 45, 1);
  text-align: center;
  /*position: absolute;
  left: 1px;
  top: 72px;*/
  letter-spacing: 2px;
  margin-bottom: 40px;
}
.tosolosession {
  width: 376px;
  font-family: "Source Sans Pro";
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: rgba(51, 46, 45, 1);
  text-align: center;
  text-decoration: underline;
  /*position: absolute;
  right: 65px;
  bottom: 45px;*/
  letter-spacing: 2px;
  cursor: pointer;
}
.popup-text {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
</style>