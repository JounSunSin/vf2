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
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon @click="openDialog(v)">
              <v-icon>mdi-pencil-outline</v-icon>
            </v-btn>
          </v-list-item-action>
        </template>

        <v-list-item v-for="(child, i) in item.subNavi" :key="i" :to="child.link">
          <div class="col-1" />          
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>          
        </v-list-item>

        <v-list-item @click="openDialog(-2)">
          <div class="col-1"/>          
          <v-list-item-icon>
            <v-icon>mdi-playlist-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>하위메뉴 추가</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

      <v-list-item @click="openDialog(-1)">
        <v-list-item-icon>
          <v-icon>mdi-plus-circle-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>서브메뉴 추가</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
 
    <v-dialog v-model="menuDialog" max-width="400">
      <v-card>
        <v-card-title> {{ ment }}
          <v-spacer/>
          <v-btn icon @click="saveDB">
            <v-icon>mdi-content-save</v-icon>  
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="formItem.icon" label="icon" outline @keypress.enter="saveDB"/>
          <v-text-field v-model="formItem.title" label="title"  outline @keypress.enter="saveDB"/>
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
      menuDialog : false,
      formItem : {
        icon : '',
        title : '',
      },
      updateMenu : [{
        icon : '',
        title : '',
      }],
      selIndex : -1,
      ment : '',
    }
  },
  methods : {
    openDialog (index) {
      // DB 순서가 0~2 니까 선택시 값을 저장 기본 -1
      this.selIndex = index;
      this.menuDialog = true;
      // items 를 그냥 사용하면 오류로 다른 변수로 옮긴다
      this.updateMenu = this.items; 
      
      if (index > -1) {
        this.ment = '수정 메뉴명';
        this.formItem.icon = this.items[index].icon;
        this.formItem.title = this.items[index].title;
      } else {
        this.ment = '추가 메뉴명';
      }
    },
    async saveDB () {
      if (this.selIndex > -1) {
        this.updateMenu[this.selIndex] = this.formItem;  
      } else {
        this.updateMenu.push(this.formItem);
      }
      this.fixNiv();
    },
    async fixNiv () {
      try {
        await this.$firebase.database().ref().child('site').update({ menu: this.updateMenu });  
      } finally {
        this.menuDialog = false;
      }
    }
  },
}
</script>

<style>
.v-icon { margin-right: 10px; }
</style>