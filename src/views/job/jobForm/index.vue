<template>
  <div class="bg-gray-50 py-8 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- 职位编辑卡片 -->
      <div class="job-card bg-white p-6 md:p-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- 左侧表单 -->
          <div class="md:col-span-2">
            <!-- 职位名称 -->
            <div class="form-group">
              <label for="jobTitle" class="block text-sm font-medium text-gray-700 mb-2">
                <i class="fas fa-heading mr-1"></i> 职位名称
              </label>
              <div class="relative">
                <i class="form-icon fas fa-briefcase"></i>
                <input
                  type="text"
                  id="jobTitle"
                  placeholder="例如：前端开发工程师"
                  class="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  v-model="formValue.name"
                />
              </div>
            </div>

            <!-- 工作地址 -->
            <div class="form-group">
              <label for="workAddress" class="block text-sm font-medium text-gray-700 mb-2">
                <i class="fas fa-map-marker-alt mr-1"></i> 工作地址
              </label>
              <div class="relative">
                <i class="form-icon fas fa-building"></i>
                <input
                  type="text"
                  id="workAddress"
                  placeholder="例如：北京市海淀区科技园区"
                  class="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  v-model="formValue.workAddress"
                />
              </div>
            </div>

            <!-- 工作经验要求 -->
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                <i class="fas fa-user-clock mr-1"></i> 工作经验要求
              </label>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div class="toggle-option">
                  <input
                    type="radio"
                    id="exp0"
                    name="experience"
                    value="不限"
                    class="hidden"
                    v-model="formValue.workExperience"
                  />
                  <label
                    for="exp0"
                    class="block w-full py-3 text-center rounded-lg border-2 border-gray-200 cursor-pointer transition-all"
                  >
                    不限
                  </label>
                </div>
                <div class="toggle-option">
                  <input
                    type="radio"
                    id="exp1"
                    name="experience"
                    value="1年以内"
                    class="hidden"
                    v-model="formValue.workExperience"
                  />
                  <label
                    for="exp1"
                    class="block w-full py-3 text-center rounded-lg border-2 border-gray-200 cursor-pointer"
                  >
                    1年以内
                  </label>
                </div>
                <div class="toggle-option">
                  <input
                    type="radio"
                    id="exp2"
                    name="experience"
                    value="1至3年"
                    class="hidden"
                    v-model="formValue.workExperience"
                  />
                  <label
                    for="exp2"
                    class="block w-full py-3 text-center rounded-lg border-2 border-gray-200 cursor-pointer"
                  >
                    1至3年
                  </label>
                </div>
                <div class="toggle-option">
                  <input
                    type="radio"
                    id="exp3"
                    name="experience"
                    value="3年以上"
                    class="hidden"
                    v-model="formValue.workExperience"
                  />
                  <label
                    for="exp3"
                    class="block w-full py-3 text-center rounded-lg border-2 border-gray-200 cursor-pointer"
                  >
                    3年以上
                  </label>
                </div>
              </div>
            </div>

            <!-- 教育背景要求 -->
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                <i class="fas fa-graduation-cap mr-1"></i> 教育背景要求
              </label>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div class="toggle-option">
                  <input
                    type="radio"
                    id="edu1"
                    name="education"
                    value="专科"
                    class="hidden"
                    v-model="formValue.eduBackground"
                  />
                  <label
                    for="edu1"
                    class="block w-full py-3 text-center rounded-lg border-2 border-gray-200 cursor-pointer"
                  >
                    专科
                  </label>
                </div>
                <div class="toggle-option">
                  <input
                    type="radio"
                    id="edu2"
                    name="education"
                    value="本科"
                    class="hidden"
                    v-model="formValue.eduBackground"
                  />
                  <label
                    for="edu2"
                    class="block w-full py-3 text-center rounded-lg border-2 border-gray-200 cursor-pointer"
                  >
                    本科
                  </label>
                </div>
                <div class="toggle-option">
                  <input
                    type="radio"
                    id="edu3"
                    name="education"
                    value="研究生"
                    class="hidden"
                    v-model="formValue.eduBackground"
                  />
                  <label
                    for="edu3"
                    class="block w-full py-3 text-center rounded-lg border-2 border-gray-200 cursor-pointer"
                  >
                    研究生
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- 右侧区域：薪资范围 -->
          <div class="bg-light p-6 rounded-xl">
            <h3 class="text-lg font-semibold text-dark mb-4 flex items-center">
              <i class="fas fa-money-bill-wave mr-2 text-accent"></i> 薪资范围
            </h3>

            <div class="mb-6">
              <div class="slider-container" ref="sliderContainer">
                <div class="salary-slider" ref="slider">
                  <div
                    class="salary-track"
                    :style="{
                      left: `${(formValue.salaryStart / 50000) * 100}%`,
                      width: `${((formValue.salaryEnd - formValue.salaryStart) / 50000) * 100}%`,
                    }"
                  ></div>
                </div>
                <div
                  class="salary-thumb"
                  :style="{ left: `${(formValue.salaryStart / 50000) * 100}%` }"
                  @mousedown="startDrag('min')"
                ></div>
                <div
                  class="salary-thumb"
                  :style="{ left: `${(formValue.salaryEnd / 50000) * 100}%` }"
                  @mousedown="startDrag('max')"
                ></div>
              </div>
              <div class="relative">
                <div class="absolute left-0 top-0 text-xs text-gray-500">0</div>
                <div class="absolute right-0 top-0 text-xs text-gray-500">50K+</div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="form-group">
                <label for="minSalary" class="block text-sm font-medium text-gray-700 mb-2"
                  >最低薪资 (元/月)</label
                >
                <div class="relative">
                  <input
                    type="number"
                    id="minSalary"
                    min="0"
                    value="10000"
                    class="w-full pl-4 pr-2 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    v-model="formValue.salaryStart"
                  />
                  <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >¥</span
                  >
                </div>
              </div>

              <div class="form-group">
                <label for="maxSalary" class="block text-sm font-medium text-gray-700 mb-2"
                  >最高薪资 (元/月)</label
                >
                <div class="relative">
                  <input
                    type="number"
                    id="maxSalary"
                    min="0"
                    value="20000"
                    class="w-full pl-4 pr-2 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    v-model="formValue.salaryEnd"
                  />
                  <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >¥</span
                  >
                </div>
              </div>
            </div>

            <div class="mt-6 text-center">
              <div class="inline-block bg-primary bg-opacity-10 px-4 py-2 rounded-lg">
                <span class="text-sm font-semibold text-primary"
                  >{{ formValue.salaryStart }} - {{ formValue.salaryEnd }}</span
                >
                <span class="text-xs text-gray-500 ml-2">元/月</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 工作详细要求 -->
        <div class="form-group mt-6">
          <label for="jobDescription" class="block text-sm font-medium text-gray-700 mb-2">
            <i class="fas fa-file-alt mr-1"></i> 工作详细要求
          </label>
          <div class="relative">
            <textarea
              id="jobDescription"
              rows="6"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none"
              placeholder="请详细描述工作职责和任职要求..."
              v-model="formValue.detail"
            ></textarea>
          </div>
        </div>

        <!-- 按钮组 -->
        <div class="flex flex-col md:flex-row justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
          <button
            class="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
            @click="resetForm"
          >
            重置
          </button>
          <button
            class="px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition-all shadow-md hover:shadow-lg bg-blue-700"
            @click="formSubmit"
          >
            保存职位信息
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onUnmounted, reactive, ref, unref } from 'vue';
  import { useMessage } from 'naive-ui';
  import { useRoute, useRouter } from 'vue-router';
  import { getJobInfo, Job, saveJob } from '@/api/job/job';

  const message = useMessage();

  const defaultValueRef = () => ({
    id: 0,
    name: '',
    workAddress: '',
    workExperience: '不限',
    eduBackground: '专科',
    detail: '',
    pubTime: new Date(),
    salaryStart: 0,
    salaryEnd: 50000,
    cid: 0,
    status: 1,
  });

  let formValue = reactive(defaultValueRef());

  const r = useRoute();
  const router = useRouter();
  const fetchData = async () => {
    const jobId = Number(r.params.id);
    if (jobId == 0) return;
    const data: Job = await getJobInfo(jobId);
    console.log(data);
    formValue.id = data.id;
    formValue.name = data.name;
    formValue.workAddress = data.workAddress;
    formValue.workExperience = data.workExperience;
    formValue.eduBackground = data.eduBackground;
    formValue.detail = data.detail;
    formValue.pubTime = data.pubTime;
    formValue.salaryStart = data.salaryStart;
    formValue.salaryEnd = data.salaryEnd;
    formValue.cid = data.cid;
    formValue.status = data.status;
  };
  fetchData();

  async function formSubmit() {
    const resp = await saveJob(formValue);
    console.log(resp);
    const { code, msg } = resp;
    if (code == 200) {
      message.success(msg);
      router.back();
    } else {
      message.error(msg);
    }
  }

  const sliderContainer = ref<HTMLElement>();
  const slider = ref<HTMLElement>();
  const dragging = ref<string | null>(null);

  function getPosition(e: MouseEvent) {
    if (!slider.value) return 0;
    const rect = slider.value.getBoundingClientRect();
    let pos = (e.clientX - rect.left) / rect.width;
    pos = Math.max(0, Math.min(1, pos));
    return Math.round(pos * 50000);
  }

  function startDrag(type: string) {
    dragging.value = type;
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', stopDrag);
  }

  function handleDrag(e: MouseEvent) {
    if (!dragging.value) return;
    const value = getPosition(e);
    if (dragging.value === 'min') {
      formValue.salaryStart = Math.min(value, formValue.salaryEnd);
    } else {
      formValue.salaryEnd = Math.max(value, formValue.salaryStart);
    }
  }

  function stopDrag() {
    dragging.value = null;
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', stopDrag);
  }

  onUnmounted(() => {
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', stopDrag);
  });

  function resetForm() {
    formValue = Object.assign(unref(formValue), defaultValueRef());
  }
</script>

<style scoped>
  body {
    font-family: 'Inter', sans-serif;
    background-color: #f3f4f6;
    background-image: radial-gradient(#e0e7ff 1px, transparent 1px),
      radial-gradient(#d1d5db 1px, transparent 1px);
    background-position: 0 0, 25px 25px;
    background-size: 50px 50px;
    min-height: 100vh;
  }

  .job-card {
    border-radius: 16px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .job-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.2);
  }

  .form-group {
    position: relative;
    margin-bottom: 1.5rem;
  }

  .form-icon {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
    color: #94a3b8;
    transition: color 0.2s;
  }

  .form-input:focus + .form-icon {
    color: #3b82f6;
  }

  .slider-container {
    position: relative;
    padding: 20px 0;
  }

  .salary-slider {
    height: 3px;
    background: #cbd5e1;
    border-radius: 3px;
  }

  .salary-track {
    height: 100%;
    border-radius: 3px;
  }

  .salary-thumb {
    width: 20px;
    height: 20px;
    background: white;
    border: 2px solid #3b82f6;
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .salary-thumb:hover {
    transform: translateY(-50%) scale(1.15);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  }

  .toggle-option {
    transition: all 0.2s ease;
  }

  .toggle-option:hover {
    transform: translateY(-2px);
  }

  .toggle-option input:checked + label {
    border-color: #3b82f6;
    background-color: rgba(59, 130, 246, 0.1);
  }
</style>
