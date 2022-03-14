<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          Application
        </v-list-item-title>
        <v-list-item-subtitle class="title">
          sub text
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>

    <v-list>
      <v-list-group v-for="(item, v) in items" :key="v" v-model="item.active"
        :prepend-icon="item.icon" no-action>
        <template v-slot:activator>
          <div class="mr10"/>          
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>

          <v-btn icon @click="moveing(items, v, -1)" v-if="v > 0">
            <v-icon>mdi-chevron-double-up</v-icon>
          </v-btn>
          <v-btn icon @click="moveing(items, v, 1)" v-if="v < items.length - 1">
            <v-icon>mdi-chevron-double-down</v-icon>
          </v-btn>

          <v-list-item-action>
            <v-btn icon @click="openNaviDialog(v)">
              <v-icon>mdi-pencil-outline</v-icon>
            </v-btn>
          </v-list-item-action>
          <v-btn icon @click="removeItem(items, v)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>

        <v-list-item v-for="(child, i) in item.subNavi" :key="i" :to="child.link">
          <div class="col-1" />          
          <v-list-item-content>
            <v-list-item-title v-text="child.title" />
          </v-list-item-content>          

          <v-btn icon @click.prevent="moveing(item.subNavi, i, -1)" v-if="i > 0">
            <v-icon>mdi-chevron-double-up</v-icon>
          </v-btn>
          <v-btn icon @click.prevent="moveing(item.subNavi, i, 1)" 
          v-if="i < item.subNavi.length - 1"><v-icon>mdi-chevron-double-down</v-icon>
          </v-btn>

          <v-list-item-action>
            <v-btn icon @click.prevent="subNaviDialog(v, i)">
              <v-icon>mdi-pencil-outline</v-icon>
            </v-btn>
          </v-list-item-action>
          <v-btn icon @click.prevent="removeItem(item.subNavi, i)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-list-item>

        <v-list-item @click="subNaviDialog(v, -1)">
          <div class="col-1"/>          
          <v-list-item-icon>
            <v-icon>mdi-playlist-plus</v-icon>            
          </v-list-item-icon>          
          <div class="mr10"/>          
          <v-list-item-content>
            <v-list-item-title>서브메뉴 추가</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

      <v-list-item @click="openNaviDialog(-1)">
        <v-list-item-icon>
          <v-icon>mdi-plus-circle-outline</v-icon>
        </v-list-item-icon>
        <div class="mr10"/>          
        <v-list-item-content>
          <v-list-item-title>메뉴 추가</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
 
    <v-dialog v-model="naviDialog" max-width="400">
      <v-card>
        <v-card-title> {{ ment }}
          <v-spacer/>
          <v-btn icon @click="saveDB">
            <v-icon>mdi-content-save</v-icon>  
          </v-btn>
          <v-btn icon @click="naviDialog=false">
            <v-icon>mdi-close</v-icon>  
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col class="col-2">
              <v-icon v-text="formItem.icon" required></v-icon>
            </v-col>
            <v-col class="col-10">
              <v-text-field v-model="formItem.icon" label="icon" outline @keypress.enter="saveDB"/>
            </v-col>
          </v-row>
          <v-text-field v-model="formItem.title" label="title"  outline @keypress.enter="saveDB"/>
        </v-card-text>
      </v-card>
    </v-dialog>
 
    <v-dialog v-model="subDialog" max-width="400">
      <v-card>
        <v-card-title> {{ ment }}
          <v-spacer/>
          <v-btn icon @click="saveSubDB">
            <v-icon>mdi-content-save</v-icon>  
          </v-btn>
          <v-btn icon @click="subDialog=false">
            <v-icon>mdi-close</v-icon>  
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="formItem.link" label="link" outline @keypress.enter="saveSubDB"/>
          <v-text-field v-model="formItem.title" label="title"  outline @keypress.enter="saveSubDB"/>
        </v-card-text>
      </v-card>
    </v-dialog>

  </div> 
</template>

<script>
export default {
  props: ["items"],
  data() {
    return {
      subDialog : false,
      naviDialog : false,
      formItem : {
        icon : '',
        title : '',
        link : '',
      },
      updateMenu : [{
        icon : '',
        title : '',
        link : '',
      }],
      naviIndex : -1,
      subIndex: -1,
      ment : '',
      selItem : 1,
    }
  },
  methods : {
    // 메인 메뉴 다이얼
    openNaviDialog (index) {
      // DB 순서가 0~2 니까 선택시 값을 저장 기본 -1
      this.naviIndex = index;
      this.naviDialog = true;
      // items 를 그냥 사용하면 오류로 다른 변수로 옮긴다
      this.updateMenu = this.items; 
      
      if (this.naviIndex > -1) {
        this.ment = '수정 메뉴명';
        this.formItem.icon = this.items[index].icon;
        this.formItem.title = this.items[index].title;
      } else {
        this.formItem.icon = 'mdi-crosshairs-question';
        this.formItem.title = '';
        this.ment = '추가 메뉴명';
      }
    },
    // 서브 메뉴 다이얼
    subNaviDialog (index, sub_index) {
      this.subDialog = true;
      this.naviIndex = index;
      this.subIndex = sub_index;

      if (this.subIndex > -1) {
        this.ment = '수정 서브 메뉴명';
        this.formItem.link = this.items[index].subNavi[sub_index].link;
        this.formItem.title = this.items[index].subNavi[sub_index].title;          
      } else {
        this.ment = '추가 서브 메뉴명';
        this.formItem.link = '';
        this.formItem.title = '';          
      }
    },
    // 네비 디비에 넣기
    async saveDB () {
      if (this.naviIndex > -1) {
        this.updateMenu[this.naviIndex] = this.formItem;  
      } else {
        this.updateMenu.push(this.formItem);
      }
      this.naviSave();
    },
    // 서브 디비에 넣기
    async saveSubDB () {
      this.updateMenu = this.items; 

      if (this.subIndex > -1) {
        this.updateMenu[this.naviIndex].subNavi[this.subIndex] = this.formItem;  
      } else {
        if (!this.items[this.naviIndex].subNavi) {
          this.updateMenu[this.naviIndex].subNavi = [];
          this.updateMenu[this.naviIndex].subNavi.push({ title: this.formItem.title, link: this.formItem.link }); 
        } else {
          this.updateMenu[this.naviIndex].subNavi.push(this.formItem);
         }
      }
      this.naviSave();
    },
    async naviSave () {
      this.updateMenu = this.items; 
      
      for (let i = 0; i < this.updateMenu.length; i++) {
        if (this.updateMenu[i].title == "sub") {
          this.updateMenu[i].active = true;
        } else {
          this.updateMenu[i].active = false;
        }
      }

      try {
        await + this.$firebase.database().ref().child('site').update({menu : this.updateMenu});
      } finally {
        this.naviDialog = false;
        this.subDialog = false;
      }
    },
    // 화면 위치 변경
    moveing (items, i, arrow) {
      const item = items.splice(i, 1)[0]
      items.splice(i + arrow, 0, item)
      this.naviSave()
    },
    removeItem (items, i) {
      items.splice(i, 1);
      this.naviSave();
    }
  },
}
</script>

<style>
  .mr10 { margin-right: 10px; }
</style>