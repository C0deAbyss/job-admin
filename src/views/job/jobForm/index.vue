<template>
  <div>
    <!--    <div class="n-layout-page-header">-->
    <!--      <n-card :bordered="false" title="基础表单">-->
    <!--        表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。表单域标签也可支持响应式。-->
    <!--      </n-card>-->
    <!--    </div>-->
    <n-card :bordered="false" class="mt-4 proCard">
      <!--      <n-grid cols="1 s:1 m:3 l:3 xl:3 2xl:3" responsive="screen">-->
      <!--        <n-grid-item offset="0 s:0 m:1 l:1 xl:1 2xl:1">-->
      <n-grid cols="1 s:1 m:3 l:3 xl:3 2xl:3" responsive="screen">
        <n-grid-item>
          <n-form
            :label-width="90"
            :model="formValue"
            :rules="rules"
            label-placement="left"
            ref="formRef"
            class="py-8"
          >
            <n-form-item label="职位名" path="name">
              <n-input v-model:value="formValue.name" placeholder="输入职位名" />
            </n-form-item>
            <n-form-item label="工作地址" path="mobile">
              <n-input placeholder="工作地址" v-model:value="formValue.workAddress" />
            </n-form-item>
            <n-form-item label="工作经验" path="mobile">
              <n-input placeholder="工作经验" v-model:value="formValue.workExperience" />
            </n-form-item>
            <n-form-item label="教育背景" path="mobile">
              <n-input placeholder="教育背景" v-model:value="formValue.eduBackground" />
            </n-form-item>
            <n-form-item label="详细" path="mobile">
              <n-input type="textarea" placeholder="详细" v-model:value="formValue.detail" />
            </n-form-item>
            <n-form-item label="最低薪资" path="mobile">
              <n-input-number v-model:value="formValue.salaryStart">
                <template #prefix> 最低</template>
              </n-input-number>
            </n-form-item>
            <n-form-item label="最高薪资" path="mobile">
              <n-input-number v-model:value="formValue.salaryEnd">
                <template #prefix> 最高</template>
              </n-input-number>
            </n-form-item>

            <div style="margin-left: 80px">
              <n-space>
                <n-button type="primary" @click="formSubmit">提交</n-button>
                <n-button @click="resetForm">重置</n-button>
              </n-space>
            </div>
          </n-form>
        </n-grid-item>
      </n-grid>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, unref } from 'vue';
  import { useMessage } from 'naive-ui';
  import { useRoute, useRouter } from 'vue-router';
  import { getJobInfo, Job, saveJob } from '@/api/job/job';

  const rules = {
    name: {
      required: true,
      message: '请输入职位名',
      trigger: 'blur-sm',
    },
    workAddress: {
      required: true,
      message: '请输入工作地址',
      trigger: 'blur-sm',
    },
    workExperience: {
      required: true,
      message: '请输入工作经验',
      trigger: 'blur-sm',
    },
    eduBackground: {
      required: true,
      message: '请输入学历',
      trigger: 'blur-sm',
    },
    detail: {
      required: true,
      message: '请输入工作详细',
      trigger: 'blur-sm',
    },
  };

  const formRef: any = ref(null);
  const message = useMessage();

  const defaultValueRef = () => ({
    id: 0,
    name: '',
    workAddress: '',
    workExperience: '',
    eduBackground: '',
    detail: '',
    pubTime: new Date(),
    salaryStart: 0,
    salaryEnd: 0,
    cid: 0,
    status: 0,
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

  function formSubmit() {
    formRef.value.validate(async (errors) => {
      if (!errors) {
        const resp = await saveJob(formValue);
        console.log(resp);
        const { code, msg } = resp;
        if (code == 200) {
          message.success(msg);
          router.back();
        } else {
          message.error(msg);
        }
      } else {
        message.error('验证失败，请填写完整信息');
      }
    });
  }

  function resetForm() {
    formRef.value.restoreValidation();
    formValue = Object.assign(unref(formValue), defaultValueRef());
  }
</script>
