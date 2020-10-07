<template>
  <div id="publicsessions" class="publicsessions">
    <div class="publicsessions-headertext">
      <p class="public-sessions">PUBLIC SESSIONS</p>
      <p class="rooms-open-5-minutes">
        Rooms open 5 minutes before the start of the scheduled session.
      </p>
    </div>
    <div class="group">
      <div class="flex-wrapper2">
        <div v-for="(sesh,i) of sessions_left" class="schedule-public-availablepartner-unselected schedule-public-availablepartner-slot-left">
          <div class="background"></div>
          <div class="schedule-public-availablepartner-slot-2">
            <p class="profile-name">
              {{sesh[0]}}
            </p>
            <p class="time">
              {{sesh[1]}}
            </p>
            <p class="duration">
              {{sesh[2]}} min.
            </p>
          </div>
          <div v-if="select_left!=i" @click="onSelectLeft(i)" class="unselected-circle"></div>
          <div v-if="select_left==i" class="selected-rd">
            <div class="in"></div>
          </div>
        </div>
      </div>
      <div class="flex-wrapper2">
        <div v-for="(sesh,i) of sessions_right" class="schedule-public-availablepartner-unselected">
          <div class="background"></div>
          <div class="schedule-public-availablepartner-slot-2">
            <p class="profile-name">
              {{sesh[0]}}
            </p>
            <p class="time">
              {{sesh[1]}}
            </p>
            <p class="duration">
              {{sesh[2]}} min.
            </p>
          </div>
          <div v-if="select_right!=i" @click="onSelectRight(i)" class="unselected-circle"></div>
          <div v-if="select_right==i" class="selected-rd">
            <div class="in"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-wrapper1">
      <div v-if="seemore_bool" @click="onSeeMore" class="publicsessions-seemore">
        <p class="see-more">SEE MORE</p>
        <img class="icons-chevron" src="@/assets/img/chevron-down.svg"/>
      </div>
      <div v-if="seeless_bool" @click="onSeeLess" class="publicsessions-seemore">
        <p class="see-more">SEE LESS</p>
        <img class="icons-chevron" src="@/assets/img/chevron-up.svg"/>
      </div>
      <div id="button-dark" @click="onConfirm" class="button-dark">
        <p class="confirm">CONFIRM</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PublicSessions",
  data () {
    return {
      sessions: [],
      sessions_left: [],
      sessions_right: [],
      session_rows: 3,
      select_left: -1,
      select_right: -1,
      seemore_bool: false,
      seeless_bool: false
    }
  },
  props: [
    'dateActive',
    'refreshCount'
  ],
  mounted() {
    this.offset = new Date().getTimezoneOffset();
    if (this.dateActive != '') {
      this.refreshList();
    }
  },
  methods: {
    refreshList() {
      fetch('/api/sessionlist?date=' + this.dateActive.toISOString() + '&tz=' + this.offset)
      .then(response => {
        if (response.status !== 200) { //server error handling
          console.log(`Looks like there was a problem. Status code: ${response.status}`);
          return;
        }
        response.json().then(data => {
          console.log("session list data:",data);
          if ('error' in data) { //error handling from backend call
            alert("session list error: " + data['error']);
            return;
          }
          //row: session_id, user_id, user_email, sched_time, session_hash
          if (Array.isArray(data)) { //data is sessions table
            this.sessions = [];
            this.session_hashes = [];
            this.session_dates = [];
            var moment = require('moment');
            moment().format();
            for (let i = 0; i < data.length; i++) {

              //stores session hash
              let data_row = data[i];
              let session_hash = data_row[4];
              this.session_hashes.push(session_hash);

              //array with sched date objects
              let sched_date = new Date(data_row[3]);
              //console.log("sesh:",this.sessions[i][3],sched_date);
              this.session_dates.push(sched_date);

              //formatting sched time field for UI
              sched_date = moment(sched_date).format('LT');
              data_row[3] = sched_date;

              let data_row_new = []; //clean data for each row
              data_row_new.push(data_row[2].substr(0,8));
              data_row_new.push(data_row[3]);
              data_row_new.push(data_row[5]);

              this.sessions.push(data_row_new);
              console.log("data_row",data_row,"data_row_new",data_row_new);
            }

            this.sessionsSplit();

            if (this.sessions.length > 2 * this.session_rows) {
              this.seemore_bool = true;
            }
            else {
              this.seemore_bool = false;
            }
          }
        });
      })
      .catch(error => { //error handling
        console.log("Fetch error: " + error);
      });
    },
    onSelectLeft(i) {
      this.select_right = -1;
      this.select_left = i;
    },
    onSelectRight(i) {
      this.select_left = -1;
      this.select_right = i;
    },
    onConfirm() {
      if (this.select_left > -1) {
        this.$emit('public-sched',this.session_hashes[this.select_left]);
      }
      else if (this.select_right > -1) {
        this.$emit('public-sched',this.session_hashes[this.session_rows+this.select_right]);
      }    
    },
    sessionsSplit() {
      this.sessions_left = [];
      this.sessions_right = [];
      for (let i = 0; i < this.sessions.length; i++) {
        if (i < this.session_rows) {
          this.sessions_left.push(this.sessions[i]);
        }
        else if (i < 2 * this.session_rows){
          this.sessions_right.push(this.sessions[i]);
        }
        else break;
        console.log("sessions:",this.sessions,this.sessions_left,this.sessions_right);
      }
    },
    onSeeMore() {
      let all_rows = Math.ceil(this.sessions.length / 2);
      let diff_rows = all_rows - this.session_rows;
      this.session_rows = all_rows;
      let new_height = diff_rows * 32 + 290;
      document.getElementById('publicsessions').style.height = new_height + 'px';
      let button_top = diff_rows * 32 + 216;
      document.getElementById('button-dark').style.top = button_top + 'px';
      this.seemore_bool = false;
      this.seeless_bool = true;
      this.sessionsSplit();
    },
    onSeeLess() {
      this.session_rows = 3;
      this.sessions_left = this.sessions_left.slice(0,this.session_rows);
      this.sessions_right = this.sessions_right.slice(0,this.session_rows);
      document.getElementById('publicsessions').style.height = '290px';
      document.getElementById('button-dark').style.top = '216px';
      this.seeless_bool = false;
      if (this.sessions.length > 2 * this.session_rows) {
        this.seemore_bool = true;
      }
    }
  },
  watch: {
    dateActive(newValue) {
      this.refreshList();
    },
    refreshCount(newValue) {
      this.refreshList();
    }
  }
};
</script>

<style scoped>
.publicsessions {
  background-color: rgba(250, 251, 251, 1);
  border-radius: 10px;
  padding: 24px 48px;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15);
  height: 290px;
  /*display: flex;
  flex-direction: column;
  align-items: flex-start;*/
}
.publicsessions-headertext {
  margin-bottom: 45px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
.public-sessions {
  width: 286px;
  font-family: "Source Sans Pro";
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  color: rgba(66, 62, 61, 1);
  text-transform: uppercase;
  margin-right: 6px;
  letter-spacing: 1px;
}
.rooms-open-5-minutes {
  width: 545px;
  font-family: "Source Sans Pro";
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(66, 62, 61, 1);
  text-align: right;
  letter-spacing: 1.6px;
}
.group {
  margin-bottom: 24px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
.flex-wrapper2 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  &:not(:last-of-type) {
    margin-bottom: 20px;
  }
}
.schedule-public-availablepartner-slot-left {
  margin-right: 151px;
}
.flex-wrapper1 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 837px;
}
.publicsessions-seemore {
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}
.see-more {
  font-family: "Source Sans Pro";
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: rgba(51, 46, 45, 1);
  text-align: center;
  text-decoration: underline;
  margin-right: 4px;
  letter-spacing: 2px;
}
.icons-chevron {
  width: 24px;
  height: 24px;
}

.button-dark {
  position: absolute;
  top: 216px;
  left: 729px;

  border-radius: 19px;
  padding: 8px 38px;
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

.schedule-public-availablepartner-unselected {
  display: flex;
  align-items: flex-start;
  position: relative;
}
.background {
  width: 378px;
  height: 32px;
  background-color: rgba(1);
  margin-left: -45px;
  position: relative;
}
.schedule-public-availablepartner-slot-2 {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  position: absolute;
  right: 0px;
  bottom: 2px;
}
.profile-name {
  width: 99px;
  font-family: "Source Sans Pro";
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  color: rgba(66, 62, 61, 1);
  text-transform: uppercase;
  margin-right: 7px;
  letter-spacing: 1px;
}
.time {
  width: 100px;
  font-family: "Source Sans Pro";
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  color: rgba(66, 62, 61, 1);
  text-align: center;
  text-transform: uppercase;
  margin-right: 13px;
  letter-spacing: 1px;
}
.duration {
  width: 71px;
  font-family: "Source Sans Pro";
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  color: rgba(66, 62, 61, 1);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.unselected-circle {
  position: absolute;
  left: 3px;
  top: 8px;
  width: 14px;
  height: 14px;
  background-color: rgba(250, 251, 251, 1);
  border-radius: 12px;
  border: 1px solid rgba(63, 80, 42, 0.25);
  cursor: pointer;
}

.selected-rd {
  position: absolute;
  left: 3px;
  top: 8px;
  border-radius: 12px;
  padding: 5px 6px 6px 5px;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.5) inset;
  display: flex;
  align-items: flex-start;
  background: linear-gradient(
    216deg,
    rgba(115, 136, 84, 1) 8%,
    rgba(63, 80, 42, 1) 107%
  );
}
.in {
  width: 5px;
  height: 5px;
  background-color: rgba(239, 235, 220, 1);
  border-radius: 50%;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.5);
}
</style>