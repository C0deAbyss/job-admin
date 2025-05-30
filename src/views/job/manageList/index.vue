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

      <template #toolbar></template>
    </BasicTable>

    <n-modal v-model:show="showModal" :show-icon="false" preset="dialog" title="提示">
      <n-text>删除之后无法恢复，确认删除？</n-text>
      <template #action>
        <n-space>
          <n-button @click="() => (showModal = false)">取消</n-button>
          <n-button type="error" @click="confirmDelete">确定</n-button>
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
  import { useRoute, useRouter } from 'vue-router';
  import { type FormRules, useMessage } from 'naive-ui';
  import { deleteJob, getJobList } from '@/api/job/job';
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
  ];

  const router = useRouter();
  const formRef: any = ref(null);
  const actionRef = ref();

  const showModal = ref(false);
  const formBtnLoading = ref(false);

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

  function handleEdit(record: Recordable) {
    console.log('点击了编辑', record);
    router.push({ name: 'job_form', params: { id: record.id } });
  }

  const deleteId = ref(0);

  function handleDelete(record: Recordable) {
    showModal.value = true;
    deleteId.value = record.id;
  }

  const route = useRoute();
  async function confirmDelete() {
    const { code } = await deleteJob(deleteId.value);
    if (code == 200) {
      message.success('删除成功');
    } else {
      message.error('删除失败');
    }
    showModal.value = false;
    window.location.href = route.fullPath;
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
