<template>
<div>
  <page :state='pageState' :showFooter='true'>
    <div class="basic_page_wrap">

      <div v-if="pageState=='success'">
        <transition name="none">
          <p class="datum_txt" :style="{transitionDelay: '0.2s'}" v-if="pageState=='success'">联系人信息（直系亲属）</p>
        </transition>
        <div>
          <form-list name="none" v-if="pageState=='success'">
            <form-item  title="关系" :index="0" :width="90" @click.native="pickerFn('first_RS', 'first_contact_relation')" v-reg:basic="{rule: /[^\s]/g, msg: '请选择关系', test: pageData.first_contact_relation, tag: 'first_contact_relation'}">
              <input class="input_cls" type="text" readonly placeholder='请选择关系' v-model="pageData.first_contact_relation">
            </form-item>
            <form-item  title="手机号" :index="1" :width="90" @click.native="getPhone('first_contact_phone', 'first_contact_real_name')">
              <input class="input_cls" type="text" placeholder='手机号' readonly v-model="pageData.first_contact_phone" v-reg:basic="{test: pageData.first_contact_phone, tag: 'first_contact_phone', type: 'tel'}">
            </form-item>
            <form-item  title="联系人姓名" :index="2" :width="90" :showRight='false'>
              <input class="input_cls" type="text" readonly placeholder='联系人姓名' v-model="pageData.first_contact_real_name" v-reg:basic="{rule: /[^\s]/g, msg: '请输入联系人', test: pageData.first_contact_real_name, tag: 'first_contact_real_name'}">
            </form-item>
          </form-list>
          <transition name="none">
            <p class="datum_txt" :style="{transitionDelay: '0.8s'}" v-if="pageState=='success'">其他联系人信息</p>
          </transition>
          <form-list name='none' v-if="pageState=='success'">
            <form-item  title="关系" :index="3" :width="90" @click.native="pickerFn('sec_RS', 'second_contact_relation')" v-reg:basic="{rule: /[^\s]/g, msg: '请选择关系', test: pageData.second_contact_relation, tag: 'second_contact_relation'}">
              <input class="input_cls" type="text" readonly placeholder='请选择关系' v-model="pageData.second_contact_relation">
            </form-item>
            <form-item  title="手机号" :index="4" :width="90" @click.native="getPhone('second_contact_phone', 'second_contact_real_name')">
              <input class="input_cls" type="text" placeholder='手机号' readonly v-model="pageData.second_contact_phone" v-reg:basic="{test: pageData.second_contact_phone, tag: 'second_contact_phone', type: 'tel'}">
            </form-item>
            <form-item  title="联系人姓名" :index="5" :width="90" :showRight='false'>
              <input class="input_cls" type="text" readonly placeholder='联系人姓名' v-model="pageData.second_contact_real_name" v-reg:basic="{rule: /[^\s]/g, msg: '请输入联系人', test: pageData.second_contact_real_name, tag: 'first_contact_real_name'}">
            </form-item>
          </form-list>
        </div>

        <transition name="none">
          <p class="datum_txt" :style="{transitionDelay: '0.2s'}" v-if="pageState=='success'">个人信息</p>
        </transition>
        <form-list name="none">
          <form-item  title="QQ" :index="6" :showRight='false' :width="110" v-reg:basic="{test: pageData.qq, tag: 'qq', type: 'qq'}">
            <input class="input_cls" type="text" placeholder='请输入QQ' v-model="pageData.qq">
          </form-item>
          <form-item  title="学历" :index="7" :width="110" @click.native="pickerFn('selectEdu', 'education')" v-reg:basic="{rule: /[^\s]/g, msg: '请选择学历', test: pageData.education, tag: 'edu'}">
            <input class="input_cls" type="text" readonly placeholder='请选择学历' v-model="pageData.education">
          </form-item>
          <form-item  title="婚姻状况" :index="8" :width="110" @click.native="pickerFn('selectMarry', 'marriage')" v-reg:basic="{rule: /[^\s]/g, msg: '请选择学历', test: pageData.education, tag: 'edu'}">
            <input class="input_cls" type="text" readonly placeholder='请选择婚姻状况' v-model="pageData.marriage" v-reg:basic="{rule: /[^\s]/g, msg: '请选择婚姻状况', test: pageData.marriage, tag: 'marry',}">
          </form-item>
          <form-item  title="是否有社保" :index="9" :width="110" @click.native="pickerFn('selectSheBao', 'shebao')" v-reg:basic="{rule: /[^\s]/g, msg: '请选择学历', test: pageData.education, tag: 'edu'}">
            <p class="p_cls" :style='{color: !exchange(pageData.shebao, selectSheBao)? "#757575" : "#333"}'>{{!exchange(pageData.shebao, selectSheBao) ?'请选择是否有社保':exchange(pageData.shebao, selectSheBao)}}</p>
          </form-item>
          <!-- <form-item  title="居住地性质" :index="10" :width="110" @click.native="pickerFn('selectNature', 'house_nature')" v-reg:basic="{rule: /[^\s]/g, msg: '请选择居住地性质', test: pageData.house_nature, tag: 'house_nature'}">
            <input class="input_cls" type="text" readonly placeholder='请选择居住地性质' v-model="pageData.house_nature">
          </form-item> -->
          <form-item  title="家庭地址" :width="110" :index="11" :showRight='false' @click.native="pickCityFn('home_location')" v-reg:basic="{rule: /[^\s]/g, msg: '请输入地址', test: pageData.home_location, tag: 'home_location'}">
            <input class="input_cls" type="text" readonly placeholder='请输入家庭地址' v-model="pageData.home_location">
          </form-item>
          <form-item title="详细地址" :width="110" :index="12" :showRight='false'>
            <input class="input_cls" type="text" placeholder='请输入详细地址' v-model="pageData.home_address" v-reg:basic="{rule: /[^\s]/g, msg: '请输入详细地址', test: pageData.home_address, tag: 'house_address'}">
          </form-item>
        </form-list>

        <transition name="none">
          <p class="datum_txt" :style="{transitionDelay: '0.8s'}" v-if="pageState=='success'">工作信息</p>
        </transition>
        <form-list name='none' v-if="pageState=='success'">
          <form-item  title="职业" :index="13" :width="110" @click.native="pickerFn('selectOccup', 'occupation')" v-reg:basic="{rule: /[^\s]/g, msg: '请选择职业', test: pageData.occupation, tag: 'occupation'}">
            <input class="input_cls" type="text" readonly placeholder='请选择职业' v-model="pageData.occupation">
          </form-item>
          <!-- <form-item  title="所属行业类" :index="14" :width="110"  @click.native="pickerFn('selectBT', 'business_type')" v-reg:basic="{rule: /[^\s]/g, msg: '请选择所属行业类', test: pageData.business_type, tag: 'business_type'}">
            <p class="p_cls" :style='{color: !exchange(pageData.business_type, selectBT)? "#757575" : "#333"}'>{{!exchange(pageData.business_type, selectBT)?'请选择所属行业类':exchange(pageData.business_type, selectBT)}}</p>
          </form-item>
          <form-item  title="工作性质" :index="15" :width="110"  @click.native="pickerFn('selectJT', 'job_nature')" v-reg:basic="{rule: /[^\s]/g, msg: '请选择工作性质', test: pageData.job_nature, tag: 'job_nature'}">
            <p class="p_cls" :style='{color: !exchange(pageData.job_nature, selectJT)? "#757575" : "#333"}'>{{!exchange(pageData.job_nature, selectJT)?'请选择工作性质':exchange(pageData.job_nature, selectJT)}}</p>
          </form-item> -->
          <form-item  title="月均收入" :index="16" :width="110" @click.native="pickerFn('selectMoonM', 'month_income')" v-reg:basic="{rule: /[^\s]/g, msg: '请选择月均收入', test: pageData.month_income, tag: 'month_income'}">
            <input class="input_cls" type="text" readonly placeholder='请选择月均收入' v-model="pageData.month_income">
          </form-item>
          <form-item title="单位名称" :width="110" :index="17" :showRight='false'>
            <input class="input_cls" type="text" placeholder='请输入单位名称' v-model="pageData.company_name" v-reg:basic="{rule: /[^\s]/g, msg: '请输入单位名称', test: pageData.company_name, tag: 'company_name'}">
          </form-item>
          <form-item title="单位电话" :width="110" :index="18" :showRight='false'  v-reg:basic="{rule: /\d{7,12}/g, msg:'请输入正确的电话', test: pageData.company_phone, tag: 'company_phone'}">
            <input class="input_cls" type="text" placeholder='请输入单位电话' v-model="pageData.company_phone">
          </form-item>
          <form-item title="单位地址" :width="110" :index="19" :showRight='false'  @click.native="pickCityFn('company_location')">
            <input class="input_cls" type="text" readonly placeholder='请输入单位地址' v-model="pageData.company_location" v-reg:basic="{rule: /[^\s]/g, msg: '请输入地址', test: pageData.company_location, tag: 'company_location'}">
          </form-item>
          <form-item title="详细地址" :width="110" :index="20" :showRight='false'>
            <input class="input_cls" type="text" placeholder='请输入详细地址' v-model="pageData.company_address" v-reg:basic="{rule: /[^\s]/g, msg: '请输入详细地址', test: pageData.company_address, tag: 'company_address'}">
          </form-item>
        </form-list>

        <!-- <transition name="fade">
          <p class="datum_txt" :style="{transitionDelay: '1.4s'}" v-if="pageState=='success'">借贷信息</p>
        </transition>
        <form-list name='slideScale' v-if="pageState=='success'">
          <form-item  title="负债情况" :index="17" :width="120" @click.native="pickerFn('selectDebt', 'liabilities')" v-reg:basic="{rule: /[^\s]/g, msg: '请选择负债情况', test: pageData.liabilities, tag: 'liabilities'}">
            <p class="p_cls">{{!exchange(pageData.liabilities, selectDebt)?'请选择负债情况':exchange(pageData.liabilities, selectDebt)}}</p>
          </form-item>
          <form-item  title="其他平台借款" :index="18" :width="120" @click.native="pickerFn('selectDebtPlat', 'other_loan')" v-reg:basic="{rule: /[^\s]/g, msg: '是否有其他平台借款', test: pageData.other_loan, tag: 'other_loan'}">
            <p class="p_cls">{{!exchange(pageData.other_loan, selectDebtPlat)?'是否有其他平台借款':exchange(pageData.other_loan, selectDebtPlat)}}</p>
          </form-item>
          <form-item  title="涉诉处罚情况" :index="19" :width="120" @click.native="pickerFn('selectPunish', 'punishment')" v-reg:basic="{rule: /[^\s]/g, msg: '是否有涉诉处罚情况', test: pageData.punishment, tag: 'punishment'}">
            <p class="p_cls">{{!exchange(pageData.punishment, selectPunish)?'是否有涉诉处罚情况':exchange(pageData.punishment, selectPunish)}}</p>
          </form-item>
        </form-list> -->
        <div style="height: 70px"></div>
      </div>
    </div>
    <div class="btn_footer_pane" slot='footer'>
      <transition name="slide">
        <div class="footer_btns" v-if="pageState=='success'" :style="{transitionDelay: '.6s'}">
          <div class="bottom_btn" @click="submitFn" v-reg:basic.check="{check: check}" :class="{disable_btn: !nextBtn}">提交</div>
        </div>
      </transition>
    </div>
  </page>
  <div class="CityPicker_pane" slot='self'>
    <city-picker ref='cityPicker' :selected-index="[0, 0, 0]" :data="city" @select="selectChange" @hide="hide" cancelTxt="取消" confirmTxt="确定"></city-picker>
  </div>

</div>
</template>

<script>
import FormList from '@/components/FormList/FormList'
import FormItem from '@/components/FormItem/FormItem'
import path from '../../../api'
import CityPicker from '@/components/Picker/CityPicker'
import { check } from '@/common/js/rule'
import { provinceList, cityList, areaList } from '@/components/Picker/address'
import pageData from './mixin/pagedata.js'

export default {
  data: ()=> ({
    pageState: 'loading',
    showPicker: false,
    city: [provinceList, cityList, areaList],
    picker: 'home_location_text',
    readonlyCre: true,
    check: false,
    isSamePhone: false
  }),
  components: {
    FormList,
    FormItem,
    CityPicker,
  },
  mixins: [pageData],
  computed: {
    nextBtn: function() {
      let a = false
      let arr = [
        'first_contact_real_name', 'first_contact_relation', 'first_contact_phone',
        'second_contact_real_name', 'second_contact_relation', 'second_contact_phone',
        "qq", "education", "marriage", "shebao", "occupation", "home_location", "home_address",
        "month_income", "company_name", "company_phone", "company_location", "company_address"
      ]
      // "house_nature", "business_type", "job_nature",
      for (let k of arr) {
        if (this.pageData[k] == '') return
        a = true
      }
      return a
    }
  },
  watch: {
    'pageData.second_contact_phone'(newVal) {
      if (newVal && newVal === this.pageData.first_contact_phone) {
        this.$toast.show('请选择不同联系人')
        this.isSamePhone = false
        this.pageData.second_contact_phone = ''
        this.pageData.second_contact_real_name = ''
      } else {
        this.isSamePhone = true
      }
    },
    'pageData.first_contact_phone'(newVal) {
      if (newVal && this.pageData.second_contact_phone === newVal) {
        this.$toast.show('请选择不同联系人')
        this.isSamePhone = false
        this.pageData.first_contact_phone = ''
        this.pageData.first_contact_real_name = ''
      } else {
        this.isSamePhone = true
      }
    }
  },
  methods:{
    pickerFn(select, value) {
      let self = this
      this.$picker.show({
        dataPick: self[select],
        confirmFn: (r,v,i)=> {
          self.pageData[value] = self[select][v].value
        }
      })
    },
    getBasicContact() {
      let self = this
      this.$ajax({
        url: path().get_contact_info,
        type: 'get',
        success: (r) => {
          if (r.success) {
            Object.assign(self.pageData, r.ret)
          }
          setTimeout(()=> {
            self.pageState = 'success'
          }, 450)
        },
        error: ()=> {
          self.pageState = 'error'
        }
      })
    },
    exchange(value, list) {
      if(value!='') {
        if(list.length>0) {
          for(let i of list) {
            if(i.value==value) {
              return i.text
            }
          }
        }else {
          value = ''
          return value
        }
      }else {
        return ''
      }
    },
    preStep() {
      this.$router.back()
    },
    submitFn() {
      let self = this
      this.check = true
      setTimeout(() => {
        this.check = false
      }, 50)
      let obj = {}
      for (var keyPro in self.pageData) {
        if(keyPro!='loan_amount') {
          obj[keyPro] = self.pageData[keyPro]
        }
      }
      if(check('basic')) {
        this.$load.show()
        setTimeout(()=> {
          this.$ajax({
            url: path().apply_info,
            data: obj,
            success: (r)=> {
              self.$load.hide()
              if(r.success) {
                this.$router.back()
              }else {
                self.$toast.show(r.msg)
              }
            },
            error: ()=> {
              self.$load.hide()
            }
          })
        }, 10)
      }
    },
    refresh() {
      let self = this
      // window.listenPage = reload
      Global.listenPage({
        onload: function() {
          self.getBasic()
        }
      })
    },
    pickCityFn(add = 'home_location') {
      this.showPicker = true
      this.picker = add
      setTimeout(() => {
        this.$refs.cityPicker.show()
      }, 20)
    },
    selectChange(arr) {
      let i = arr[0]
      let p = arr[1]
      let city = arr[2]
      this.pageData[this.picker] = city.join(' ')
      let pr = p[0]
      let ci = p[1]
      let ar = p[2]
      let pp = provinceList[pr].value
      let cc = cityList[pp][ci].value
      let aa = areaList[cc][ar].value
      if(this.picker.match(/home/g)) {
        this.pageData.home_adcode = aa
      }else if(this.picker.match(/company/g)) {
        this.pageData.company_adcode = aa
      }
    },
    hide() {
      this.showPicker = false
    },
    getPhone(phone, name) {
      var self=this;
      console.log("获取到点击事件");
      window.getContacts = function(d) {
        console.log(d);
        window.isAllowGetContacts = true;
        d.phone = d.phone.toString().replace(/\D/g, '')
        self.pageData[phone] = d.phone
        self.pageData[name] = d.name
      }
      setTimeout(()=> {
        APP.action("getContacts");
      }, 200)
    },
    getBasic() {
      let self = this
      this.$ajax({
        url: path().get_apply_basic,
        type: 'get',
        success: (r) => {
          // self.$load.hide()
          if (r.success) {
            // self.pageData = null
            // self.pageData = r.ret
            Object.assign(self.pageData, r.ret)
            // self.pageData.first_contact_real_name = ''
            // self.pageData.first_contact_relation = ''
            // self.pageData.first_contact_phone = ''
            // self.pageData.second_contact_real_name = ''
            // self.pageData.second_contact_relation = ''
            // self.pageData.second_contact_phone = ''
            self.pageData.company_location = self.pageData.company_location.replace(/(,|，)/g, ' ')
            self.pageData.home_location = self.pageData.home_location.replace(/(,|，)/g, ' ')
            self.getBasicContact()
          }
        },
        error: ()=> {
          self.$load.hide()
          self.pageState = 'error'
        }
      })
    },
  },
  created() {
    const self = this
    this.getBasic()
    this.$route.meta.onload = function() {
      self.getBasic()
    }
  },
  deactivated() {
    this.$picker.hide()
  }
}
</script>

<style lang="less">

</style>
