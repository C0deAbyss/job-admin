<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden">
      <div class="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
        <div class="flex items-center">
          <i class="fas fa-user-plus text-2xl mr-3"></i>
          <h1 class="text-2xl font-bold">编辑员工信息</h1>
        </div>
      </div>

      <form class="p-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="hidden" v-model="form.id" />
          <!-- Username -->
          <div class="space-y-2">
            <label for="username" class="block text-sm font-medium text-gray-700">用户名 *</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-user text-gray-400"></i>
              </div>
              <input
                type="text"
                id="username"
                name="username"
                required
                class="pl-10 input-highlight w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 border"
                placeholder="请输入用户名"
                v-model="form.username"
              />
            </div>
          </div>

          <!-- Password -->
          <div class="space-y-2">
            <label for="password" class="block text-sm font-medium text-gray-700">密码 *</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-lock text-gray-400"></i>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                required
                class="pl-10 input-highlight w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 border"
                placeholder="请输入密码"
                v-model="form.password"
              />
            </div>
            <div class="text-xs text-gray-500 mt-1"> 密码长度至少8个字符 </div>
          </div>

          <!-- Real Name -->
          <div class="space-y-2">
            <label for="realname" class="block text-sm font-medium text-gray-700">真实姓名 *</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-id-card text-gray-400"></i>
              </div>
              <input
                type="text"
                id="realname"
                name="realname"
                required
                class="pl-10 input-highlight w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 border"
                placeholder="请输入全名"
                v-model="form.nickname"
              />
            </div>
          </div>

          <!-- Age -->
          <div class="space-y-2">
            <label for="age" class="block text-sm font-medium text-gray-700">年龄</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-birthday-cake text-gray-400"></i>
              </div>
              <input
                type="number"
                id="age"
                name="age"
                min="18"
                max="120"
                class="pl-10 input-highlight w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 border"
                placeholder="请输入年龄"
                v-model="form.age"
              />
            </div>
          </div>

          <div class="space-y-2">
            <label for="eduBackground" class="block text-sm font-medium text-gray-700"
              >教育背景 *</label
            >
            <div class="relative">
              <select
                id="eduBackground"
                name="eduBackground"
                required
                class="select-arrow input-highlight w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 border pl-3 pr-10"
                v-model="form.eduBackground"
              >
                <option value="">选择教育背景</option>
                <option value="专科">专科</option>
                <option value="本科">本科</option>
                <option value="硕士研究生">硕士研究生</option>
                <option value="博士研究生">博士研究生</option>
              </select>
            </div>
          </div>

          <!-- Gender -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">性别</label>
            <div class="flex space-x-4">
              <label class="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="1"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  v-model="form.gender"
                />
                <span class="ml-2 text-gray-700">男</span>
              </label>
              <label class="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="2"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  v-model="form.gender"
                />
                <span class="ml-2 text-gray-700">女</span>
              </label>
              <label class="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="0"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  v-model="form.gender"
                />
                <span class="ml-2 text-gray-700">其他</span>
              </label>
            </div>
          </div>

          <!-- Phone -->
          <div class="space-y-2">
            <label for="phone" class="block text-sm font-medium text-gray-700">电话号码 *</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-phone text-gray-400"></i>
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                class="pl-10 input-highlight w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 border"
                placeholder="例如：1234567890"
                v-model="form.phone"
              />
            </div>
          </div>

          <!-- Email -->
          <div class="space-y-2">
            <label for="email" class="block text-sm font-medium text-gray-700">电子邮箱 *</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-envelope text-gray-400"></i>
              </div>
              <input
                type="email"
                id="email"
                name="email"
                required
                class="pl-10 input-highlight w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 border"
                placeholder="用户@example.com"
                v-model="form.email"
              />
            </div>
          </div>

          <!-- User Role -->
          <div class="space-y-2">
            <label for="role" class="block text-sm font-medium text-gray-700">用户角色 *</label>
            <div class="relative">
              <select
                id="role"
                name="role"
                required
                class="select-arrow input-highlight w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 border pl-3 pr-10"
                v-model="form.role"
              >
                <option value="">选择角色</option>
                <option value="0">员工</option>
                <option value="1">HR</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
          <n-button
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center"
            @click="submitForm"
          >
            <i class="fas fa-user-plus mr-2"></i> 提交
          </n-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { addEmployee, infoEmployee, updateEmployee, User } from '@/api/employee/manage';
  import { useMessage } from 'naive-ui';
  import router from '@/router';

  const form = ref({
    eduBackground: '本科',
    gender: 0,
    role: 0,
  } as User);

  const message = useMessage();
  const route = useRoute();
  onMounted(async () => {
    const paramId = Number(route.params.id);
    console.log(paramId);
    if (paramId != 0) {
      form.value = await infoEmployee(paramId);
      console.log('----------------');
      console.log(form.value);
      console.log('----------------');
    }
  });

  const submitForm = async () => {
    console.log(form.value);
    let resp: InResult;
    if (form.value.id == undefined || form.value.id == 0) {
      resp = await addEmployee(form.value);
    } else {
      resp = await updateEmployee(form.value);
    }
    if (resp.code == 200) {
      message.success(resp.msg);
      router.back();
    } else {
      message.error(resp.msg);
    }
  };
</script>
