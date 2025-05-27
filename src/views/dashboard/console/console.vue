<template>
  <div class="console bg-gray-50 min-h-screen">
    <div class="container mx-auto px-4 py-8" v-if="companyInfo">
      <!-- Header -->
      <header class="mb-8">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-800">公司信息</h1>
            <p class="text-gray-600">公司详细信息介绍</p>
          </div>
        </div>
      </header>

      <main>
        <div class="company-card bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div class="md:flex">
            <!-- Company Logo/Image -->
            <div class="md:w-1/4 bg-blue-50 flex items-center justify-center p-8">
              <div class="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center">
                <i class="fas fa-building text-blue-500 text-5xl"></i>
              </div>
            </div>

            <!-- Company Details -->
            <div class="md:w-3/4 p-8">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h2 class="text-2xl font-bold text-gray-800">{{ companyInfo.name }}</h2>
                  <p class="text-gray-600">{{ companyInfo.industry }}</p>
                </div>
                <span class="status-active px-3 py-1 rounded-full text-sm font-semibold">
                  <i class="fas fa-circle-check mr-1"></i>
                  {{ companyInfo.status == 1 ? '在营' : '其他' }}
                </span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 class="text-sm font-medium text-gray-500 mb-1">成立时间</h3>
                  <p class="text-gray-800">{{ companyInfo.buildTime?.split(' ')[0] }}</p>
                </div>
                <div>
                  <h3 class="text-sm font-medium text-gray-500 mb-1">员工数</h3>
                  <p class="text-gray-800">{{ companyInfo.scale }}</p>
                </div>
                <div>
                  <h3 class="text-sm font-medium text-gray-500 mb-1">地址</h3>
                  <p class="text-gray-800">{{ companyInfo.address }}</p>
                </div>
                <div>
                  <h3 class="text-sm font-medium text-gray-500 mb-1">注册资金</h3>
                  <p class="text-gray-800">{{ shiftDecimalLeft(companyInfo.register) }}万</p>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 mb-6">
                <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                  >Intelligence</span
                >
                <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium"
                  >Awesome</span
                >
                <span
                  class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium"
                  >Fantastic</span
                >
              </div>
            </div>
          </div>
        </div>

        <div class="border-b border-gray-200 mb-6">
          <nav class="-mb-px flex space-x-8">
            <button
              v-for="(item, index) in btns"
              :key="index"
              :class="
                index == activeTabIndex
                  ? 'tab-button active border-blue-500 text-blue-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                  : 'tab-button border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
              "
              @click="onTabClick(index)"
            >
              {{ item }}
            </button>
          </nav>
        </div>

        <div id="overviewContent" class="tab-content active" v-if="activeTabIndex == 0">
          <div class="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <div class="p-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">公司介绍</h3>
              <p class="text-gray-700 mb-6">
                {{ companyInfo.description }}
              </p>

              <div class="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div>
                  <h3 class="text-lg font-medium text-gray-900 mb-4">关键信息</h3>
                  <div class="space-y-3">
                    <div class="flex justify-between border-b border-gray-100 pb-2">
                      <span class="text-gray-600">法人代表</span>
                      <span class="text-gray-800 font-medium">{{
                        companyInfo.legalRepresentative
                      }}</span>
                    </div>
                    <div class="flex justify-between border-b border-gray-100 pb-2">
                      <span class="text-gray-600">运营行业</span>
                      <span class="text-gray-800 font-medium">{{ companyInfo.industry }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="institutionsContent" class="tab-content active" v-if="activeTabIndex == 1">
          <div class="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 class="text-lg font-medium text-gray-900 mb-4">工作制度</h3>
                  <div class="space-y-3">
                    <div class="flex justify-between border-b border-gray-100 pb-2">
                      <span class="text-gray-600">休息制度</span>
                      <span class="text-gray-800 font-medium">{{ companyInfo.rest }}</span>
                    </div>
                    <div class="flex justify-between border-b border-gray-100 pb-2">
                      <span class="text-gray-600">加班制度</span>
                      <span class="text-gray-800 font-medium">{{ companyInfo.workOvertime }}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="text-lg font-medium text-gray-900 mb-4">工作时间</h3>
                  <div class="space-y-3">
                    <div class="flex justify-between border-b border-gray-100 pb-2">
                      <span class="text-gray-600">上班时间</span>
                      <span class="text-gray-800 font-medium">{{
                        timestampToTime(companyInfo.workStart)
                      }}</span>
                    </div>
                    <div class="flex justify-between border-b border-gray-100 pb-2">
                      <span class="text-gray-600">下班时间</span>
                      <span class="text-gray-800 font-medium">{{
                        timestampToTime(companyInfo.workEnd)
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <div class="container mx-auto px-4 py-8 max-w-4xl" v-if="!companyInfo">
      <header class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">公司信息</h1>
        <p class="text-gray-600">您的公司信息将展示在此处，看起来您似乎还没有创建公司</p>
      </header>

      <!-- Empty Company Card -->
      <div
        class="bg-white rounded-xl shadow-md overflow-hidden mb-8 border-2 border-dashed border-gray-300"
      >
        <div class="p-8 text-center">
          <div
            class="w-20 h-20 mx-auto rounded-full bg-gray-200 flex items-center justify-center mb-4"
          >
            <i class="fas fa-building text-gray-400 text-3xl"></i>
          </div>
          <h3 class="text-xl font-medium text-gray-700 mb-2">暂无公司数据</h3>
          <p class="text-gray-500 mb-4">创建您的公司以展示在此处</p>
          <button
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            @click="createCompanyClick()"
          >
            <i class="fas fa-plus mr-2"></i>创建公司
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { CompanyInfo, getCompanyInfo } from '@/api/company/dash';
  import router from '@/router';

  const activeTabIndex = ref(0);
  const companyInfo = ref({} as CompanyInfo);

  const btns = ['公司概述', '公司制度'];

  const onTabClick = (index: number) => {
    activeTabIndex.value = index;
  };

  onMounted(async () => {
    const data = await getCompanyInfo();
    companyInfo.value = data;
    console.log(data);
  });

  const createCompanyClick = () => {
    router.push({
      path: '/redirect/company/edit',
    });
  };

  const shiftDecimalLeft = (inputNumber: number): number => {
    if (isNaN(inputNumber) || !isFinite(inputNumber)) {
      return 0;
    }
    const shiftedNumber = inputNumber / 10000;
    return parseFloat(shiftedNumber.toFixed(1));
  };

  const timestampToTime = (timestamp: number): string => {
    if (timestamp < 1e12) {
      timestamp *= 1000;
    }
    // 处理非数字输入
    if (typeof timestamp !== 'number' || isNaN(timestamp)) {
      throw new Error('输入必须是有效的数字时间戳');
    }

    // 创建日期对象
    const date = new Date(timestamp);

    // 获取小时和分钟
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // 确保分钟为两位数（如果需要）
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // 返回格式化的时间字符串
    return `${hours}:${formattedMinutes}`;
  };
</script>

<style lang="less" scoped>
  .company-card {
    transition: all 0.3s ease;
  }

  .company-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  .status-active {
    background-color: #dcfce7;
    color: #166534;
  }

  .status-inactive {
    background-color: #fee2e2;
    color: #991b1b;
  }

  .status-pending {
    background-color: #fef3c7;
    color: #92400e;
  }

  .tab-button {
    cursor: pointer;
  }
</style>
