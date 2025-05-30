<template>
  <n-card :bordered="false">
    <BasicForm @register="register" @submit="handleSubmit" @reset="handleReset">
      <template #statusSlot="{ model, field }">
        <n-input v-model:value="model[field]" />
      </template>
    </BasicForm>
  </n-card>
  <n-card :bordered="false" class="mt-3">
    <BasicTable
      :columns="columns"
      :request="loadDataTable"
      :row-key="(row:ListData) => row.id"
      ref="actionRef"
      :actionColumn="actionColumn"
      @update:checked-row-keys="onCheckedRow"
      :scroll-x="1090"
      :striped="true"
    >
      <template #tableTitle>
        <n-button type="primary" @click="addTable">
          <template #icon>
            <n-icon>
              <PlusOutlined />
            </n-icon>
          </template>
          新建
        </n-button>
      </template>

      <template #toolbar> </template>
    </BasicTable>

    <n-modal v-model:show="showModal" :show-icon="false" preset="dialog" title="新建">
      <n-form
        :model="formParams"
        :rules="rules"
        ref="formRef"
        label-placement="left"
        :label-width="80"
        class="py-4"
      >
        <n-form-item label="名称" path="name">
          <n-input placeholder="请输入名称" v-model:value="formParams.name" />
        </n-form-item>
        <n-form-item label="地址" path="address">
          <n-input type="textarea" placeholder="请输入地址" v-model:value="formParams.address" />
        </n-form-item>
        <n-form-item label="日期" path="date">
          <n-date-picker type="datetime" placeholder="请选择日期" v-model:value="formParams.date" />
        </n-form-item>
      </n-form>

      <template #action>
        <n-space>
          <n-button @click="() => (showModal = false)">取消</n-button>
          <n-button type="info" :loading="formBtnLoading" @click="confirmForm">确定</n-button>
        </n-space>
      </template>
    </n-modal>
  </n-card>
</template>

<script lang="ts" setup>
  import { h, onMounted, reactive, ref } from 'vue';
  import { BasicTable, TableAction } from '@/components/Table';
  import { BasicForm, FormSchema, useForm } from '@/components/Form/index';
  import { columns, ListData } from './columns';
  import { PlusOutlined } from '@vicons/antd';
  import { useRouter } from 'vue-router';
  import { type FormRules, useMessage } from 'naive-ui';
  import { getJobList } from '@/api/job/job';
  import { useUserStore } from '@/store/modules/user';

  const rules: FormRules = {
    name: {
      required: true,
      trigger: ['blur-sm', 'input'],
      message: '请输入名称',
    },
    address: {
      required: true,
      trigger: ['blur-sm', 'input'],
      message: '请输入地址',
    },
    date: {
      type: 'number',
      required: true,
      trigger: ['blur-sm', 'change'],
      message: '请选择日期',
    },
  };

  const schemas: FormSchema[] = [
    {
      field: 'name',
      component: 'NInput',
      label: '职位名',
      componentProps: {
        placeholder: '请输入职位名',
        onInput: (e: any) => {
          console.log(e);
        },
      },
      rules: [{ required: true, message: '请输入职位名', trigger: ['blur-sm'] }],
    },
    // {
    //   field: 'mobile',
    //   component: 'NInputNumber',
    //   label: '手机',
    //   componentProps: {
    //     placeholder: '请输入手机号码',
    //     showButton: false,
    //     onInput: (e: any) => {
    //       console.log(e);
    //     },
    //   },
    // },
    // {
    //   field: 'type',
    //   component: 'NSelect',
    //   label: '类型',
    //   componentProps: {
    //     placeholder: '请选择类型',
    //     options: [
    //       {
    //         label: '舒适性',
    //         value: 1,
    //       },
    //       {
    //         label: '经济性',
    //         value: 2,
    //       },
    //     ],
    //     onUpdateValue: (e: any) => {
    //       console.log(e);
    //     },
    //   },
    // },
    // {
    //   field: 'makeDate',
    //   component: 'NDatePicker',
    //   label: '预约时间',
    //   defaultValue: 1183135260000,
    //   componentProps: {
    //     type: 'date',
    //     clearable: true,
    //     onUpdateValue: (e: any) => {
    //       console.log(e);
    //     },
    //   },
    // },
    // {
    //   field: 'makeTime',
    //   component: 'NTimePicker',
    //   label: '停留时间',
    //   componentProps: {
    //     clearable: true,
    //     onUpdateValue: (e: any) => {
    //       console.log(e);
    //     },
    //   },
    // },
    // {
    //   field: 'status',
    //   label: '状态',
    //   //插槽
    //   slot: 'statusSlot',
    // },
    // {
    //   field: 'makeProject',
    //   component: 'NCheckbox',
    //   label: '预约项目',
    //   componentProps: {
    //     placeholder: '请选择预约项目',
    //     options: [
    //       {
    //         label: '种牙',
    //         value: 1,
    //       },
    //       {
    //         label: '补牙',
    //         value: 2,
    //       },
    //       {
    //         label: '根管',
    //         value: 3,
    //       },
    //     ],
    //     onUpdateChecked: (e: any) => {
    //       console.log(e);
    //     },
    //   },
    // },
    // {
    //   field: 'makeSource',
    //   component: 'NRadioGroup',
    //   label: '来源',
    //   componentProps: {
    //     options: [
    //       {
    //         label: '网上',
    //         value: 1,
    //       },
    //       {
    //         label: '门店',
    //         value: 2,
    //       },
    //     ],
    //     onUpdateChecked: (e: any) => {
    //       console.log(e);
    //     },
    //   },
    // },
  ];

  const router = useRouter();
  const formRef: any = ref(null);
  const actionRef = ref();

  const showModal = ref(false);
  const formBtnLoading = ref(false);
  const formParams = reactive({
    name: '',
    address: '',
    date: null,
  });

  const actionColumn = reactive({
    width: 220,
    title: '操作',
    key: 'action',
    fixed: 'right',
    render(record) {
      return h(TableAction as any, {
        style: 'button',
        actions: [
          {
            label: '删除',
            onClick: handleDelete.bind(null, record),
            // 根据业务控制是否显示 isShow 和 auth 是并且关系
            ifShow: () => {
              return true;
            },
            // 根据权限控制是否显示: 有权限，会显示，支持多个
            auth: ['job_manage'],
          },
          {
            label: '编辑',
            onClick: handleEdit.bind(null, record),
            ifShow: () => {
              return true;
            },
            auth: ['job_manage'],
          },
        ],
        // dropDownActions: [
        //   {
        //     label: '启用',
        //     key: 'enabled',
        //     // 根据业务控制是否显示: 非enable状态的不显示启用按钮
        //     ifShow: () => {
        //       return true;
        //     },
        //   },
        //   {
        //     label: '禁用',
        //     key: 'disabled',
        //     ifShow: () => {
        //       return true;
        //     },
        //   },
        // ],
        select: (key) => {
          window['$message'].info(`您点击了，${key} 按钮`);
        },
      });
    },
  });

  const [register, { getFieldsValue }] = useForm({
    gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
    labelWidth: 80,
    schemas,
  });

  function addTable() {
    // showModal.value = true;
    router.push({ name: 'job_form', params: { id: 0 } });
  }

  const loadDataTable = async (res) => {
    const { data } = await getJobList({ ...getFieldsValue(), ...res });
    return data;
  };

  function onCheckedRow(rowKeys) {
    console.log(rowKeys);
  }

  function reloadTable() {
    actionRef.value.reload();
  }

  function confirmForm(e) {
    e.preventDefault();
    formBtnLoading.value = true;
    formRef.value.validate((errors) => {
      if (!errors) {
        window['$message'].success('新建成功');
        setTimeout(() => {
          showModal.value = false;
          reloadTable();
        });
      } else {
        window['$message'].error('请填写完整信息');
      }
      formBtnLoading.value = false;
    });
  }

  function handleEdit(record: Recordable) {
    console.log('点击了编辑', record);
    router.push({ name: 'job_form', params: { id: record.id } });
  }

  function handleDelete(record: Recordable) {
    console.log('点击了删除', record);
    window['$message'].info('点击了删除');
  }

  function handleSubmit(values: Recordable) {
    console.log(values);
    reloadTable();
  }

  function handleReset(values: Recordable) {
    console.log(values);
  }

  const userStore = useUserStore();
  const message = useMessage();
  onMounted(() => {
    const token = userStore.token;
    if (token.split('.')[2] == '0') {
      message.error('暂无公司信息，请先创建');
      router.push({ name: 'company_console' });
    }
  });
</script>

<style lang="less" scoped></style>
