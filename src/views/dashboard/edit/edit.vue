<template>
  <div class="console bg-gray-50 min-h-screen">
    <div class="container mx-auto px-4 py-8 max-w-5xl">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8 fade-in">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">编辑公司信息</h1>
          <p class="text-gray-600">编辑并创建您的公司</p>
        </div>
        <div class="flex space-x-3">
          <button
            id="saveBtn"
            class="btn px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
            @click="createBtnClick()"
          >
            <i class="fas fa-save mr-2"></i>创建
          </button>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-md overflow-hidden fade-in">
        <!-- Form Tabs -->
        <div class="border-b border-gray-200">
          <nav class="flex -mb-px">
            <button
              id="basicTab"
              :class="
                activeTabIndex == 0
                  ? 'tab-button active py-4 px-6 text-center border-b-2 font-medium text-sm border-blue-500 text-blue-600'
                  : 'tab-button py-4 px-6 text-center border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              "
              class="tab-button active py-4 px-6 text-center border-b-2 font-medium text-sm border-blue-500 text-blue-600"
              @click="onTabClick(0)"
            >
              <i class="fas fa-building mr-2"></i>基本信息
            </button>
            <button
              id="legalTab"
              :class="
                activeTabIndex == 1
                  ? 'tab-button active py-4 px-6 text-center border-b-2 font-medium text-sm border-blue-500 text-blue-600'
                  : 'tab-button py-4 px-6 text-center border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              "
              @click="onTabClick(1)"
            >
              <i class="fas fa-file-contract mr-2"></i>法律信息
            </button>
            <button
              id="workTab"
              :class="
                activeTabIndex == 2
                  ? 'tab-button active py-4 px-6 text-center border-b-2 font-medium text-sm border-blue-500 text-blue-600'
                  : 'tab-button py-4 px-6 text-center border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              "
              @click="onTabClick(2)"
            >
              <i class="fas fa-clock mr-2"></i>工作制度
            </button>
          </nav>
        </div>

        <form>
          <!-- Form Content -->
          <div class="p-6">
            <!-- Basic Info Tab -->
            <div id="basicContent" class="tab-content" v-show="activeTabIndex == 0">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Company Name -->
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 mb-1"
                    >公司名 *</label
                  >
                  <input
                    type="text"
                    id="name"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg input-highlight focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="输入公司名"
                    v-model="companyForm.name"
                  />
                </div>

                <!-- Industry -->
                <div>
                  <label for="industry" class="block text-sm font-medium text-gray-700 mb-1"
                    >公司行业 *</label
                  >
                  <select
                    id="industry"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg input-highlight focus:outline-none focus:ring-1 focus:ring-blue-500"
                    v-model="companyForm.industry"
                  >
                    <option value="" selected>选择行业</option>
                    <option value="农、林、牧、渔业">农、林、牧、渔业</option>
                    <option value="采矿业">采矿业</option>
                    <option value="制造业">制造业</option>
                    <option value="电力、热力、燃气及水生产和供应业"
                      >电力、热力、燃气及水生产和供应业
                    </option>
                    <option value="建筑业">建筑业</option>
                    <option value="批发和零售业">批发和零售业</option>
                    <option value="交通运输、仓储和邮政业">交通运输、仓储和邮政业</option>
                    <option value="住宿和餐饮业">住宿和餐饮业</option>
                    <option value="信息传输、软件和信息技术服务业"
                      >信息传输、软件和信息技术服务业
                    </option>
                    <option value="金融业">金融业</option>
                    <option value="房地产业">房地产业</option>
                    <option value="租赁和商务服务业">租赁和商务服务业</option>
                    <option value="科学研究和技术服务业">科学研究和技术服务业</option>
                    <option value="水利、环境和公共设施管理业">水利、环境和公共设施管理业</option>
                    <option value="居民服务、修理和其他服务业">居民服务、修理和其他服务业</option>
                    <option value="教育">教育</option>
                    <option value="卫生和社会工作">卫生和社会工作</option>
                    <option value="文化、体育和娱乐业">文化、体育和娱乐业</option>
                  </select>
                </div>

                <!-- Build Time -->
                <div>
                  <label for="buildTime" class="block text-sm font-medium text-gray-700 mb-1"
                    >建立时间</label
                  >
                  <input
                    type="date"
                    id="buildTime"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg input-highlight focus:outline-none focus:ring-1 focus:ring-blue-500"
                    v-model="companyForm.buildTime"
                  />
                </div>

                <!-- Company Scale -->
                <div>
                  <label for="scale" class="block text-sm font-medium text-gray-700 mb-1"
                    >公司规模</label
                  >
                  <input
                    type="number"
                    id="scale"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg input-highlight focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="输入公司规模"
                    v-model="companyForm.scale"
                  />
                </div>

                <!-- Company Status -->
                <div>
                  <label for="status" class="block text-sm font-medium text-gray-700 mb-1"
                    >公司状态</label
                  >
                  <select
                    id="industry"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg input-highlight focus:outline-none focus:ring-1 focus:ring-blue-500"
                    v-model="companyForm.status"
                  >
                    <option value="-1">选择状态</option>
                    <option value="1" selected>在营</option>
                    <option value="0">其他</option>
                  </select>
                </div>

                <!-- Address -->
                <div class="md:col-span-2">
                  <label for="address" class="block text-sm font-medium text-gray-700 mb-1"
                    >公司地址 *</label
                  >
                  <textarea
                    id="address"
                    rows="3"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg input-highlight focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="输入公司地址"
                    v-model="companyForm.address"
                  ></textarea>
                </div>

                <!-- Description -->
                <div class="md:col-span-2">
                  <label for="description" class="block text-sm font-medium text-gray-700 mb-1"
                    >公司介绍</label
                  >
                  <textarea
                    id="description"
                    rows="4"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg input-highlight focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="输入公司简介"
                    v-model="companyForm.description"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Legal Info Tab (hidden by default) -->
            <div id="legalContent" class="tab-content" v-show="activeTabIndex == 1">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Legal Representative -->
                <div>
                  <label
                    for="legalRepresentative"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >法人代表 *</label
                  >
                  <input
                    type="text"
                    id="legalRepresentative"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg input-highlight focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="输入法人代表"
                    v-model="companyForm.legalRepresentative"
                  />
                </div>

                <!-- Registration Number -->
                <div>
                  <label for="register" class="block text-sm font-medium text-gray-700 mb-1"
                    >注册资本 *</label
                  >
                  <input
                    type="number"
                    id="register"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg input-highlight focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="输入注册资本"
                    v-model="companyForm.register"
                  />
                </div>
              </div>
            </div>

            <!-- Work Hours Tab (hidden by default) -->
            <div id="workContent" class="tab-content" v-show="activeTabIndex == 2">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Work Start Time -->
                <div>
                  <label for="workStart" class="block text-sm font-medium text-gray-700 mb-1"
                    >上班时间 *</label
                  >
                  <input
                    type="time"
                    id="workStart"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg input-highlight focus:outline-none focus:ring-1 focus:ring-blue-500"
                    v-model="companyForm.workStart"
                  />
                </div>

                <!-- Work End Time -->
                <div>
                  <label for="workEnd" class="block text-sm font-medium text-gray-700 mb-1"
                    >下班时间 *</label
                  >
                  <input
                    type="time"
                    id="workEnd"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg input-highlight focus:outline-none focus:ring-1 focus:ring-blue-500"
                    v-model="companyForm.workEnd"
                  />
                </div>

                <!-- Overtime Policy -->
                <div class="md:col-span-2">
                  <label for="workOvertime" class="block text-sm font-medium text-gray-700 mb-1"
                    >加班制度</label
                  >
                  <select
                    id="industry"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg input-highlight focus:outline-none focus:ring-1 focus:ring-blue-500"
                    v-model="companyForm.workOvertime"
                  >
                    <option value="" selected>选择加班制度</option>
                    <option value="不加班">不加班</option>
                    <option value="偶尔加班">偶尔加班</option>
                    <option value="加班">加班</option>
                  </select>
                </div>

                <div class="md:col-span-2">
                  <label for="workOvertime" class="block text-sm font-medium text-gray-700 mb-1"
                    >休息制度</label
                  >
                  <select
                    id="industry"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg input-highlight focus:outline-none focus:ring-1 focus:ring-blue-500"
                    v-model="companyForm.rest"
                  >
                    <option value="" selected>选择休息制度</option>
                    <option value="双休">双休</option>
                    <option value="单休">单休</option>
                    <option value="无休">无休</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { CompanyInfo, createCompany } from '@/api/company/dash';
  import { refreshToken } from '@/api/system/user';
  import { useUserStore } from '@/store/modules/user';
  import { useMessage } from 'naive-ui';
  import router from '@/router';

  const message = useMessage();

  const activeTabIndex = ref(0);
  const companyForm = ref({
    industry: '',
    status: -1,
    workOvertime: '',
    rest: '',
  } as CompanyInfo);

  const onTabClick = (index: number) => {
    activeTabIndex.value = index;
    console.log(index);
  };

  const createBtnClick = async () => {
    const startTime = timeStringToTimestamp(`${companyForm.value.workStart}`);
    const endTime = timeStringToTimestamp(`${companyForm.value.workEnd}`);
    const form = Object.assign({}, companyForm.value) as CompanyInfo;
    form.workStart = startTime;
    form.workEnd = endTime;
    const resp = await createCompany(form);
    let flag = true;
    if (resp.code == 200) {
      const refreshResp = await refreshToken();
      if (refreshResp.code == 200) {
        const store = useUserStore();
        store.setToken(refreshResp.data.token);
      } else {
        flag = false;
      }
    } else {
      flag = false;
    }
    message.destroyAll();
    if (flag) {
      message.success('创建公司成功');
      await router.push({
        name: 'company_console',
      });
    } else {
      message.error('创建公司失败');
    }
  };

  onMounted(async () => {});

  const timeStringToTimestamp = (timeStr: string): number => {
    const [hoursStr, minutesStr] = timeStr.split(':');
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    const now = new Date(0);
    now.setHours(hours, minutes, 0, 0); // 设置为当天的对应时间

    return Math.floor(now.getTime() / 1000); // 转为秒
  };
</script>

<style lang="less" scoped>
  .btn {
    cursor: pointer;
  }

  .tab-button {
    cursor: pointer;
  }
</style>
