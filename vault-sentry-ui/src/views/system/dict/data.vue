<script setup lang="ts" name="dictDataPage">
import { nextTick, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import {
  add,
  batchDelete,
  deleteById,
  getById,
  listDataByType,
  listDictType,
  listPage,
  update,
  updateStatus
} from '@/api/system/dict/data/index.ts';
import { MsgBox, MsgError, MsgInfo, MsgWarning, NoticeError, NoticeSuccess } from '@/utils/message';

// 表格加载动画Loading
const loading = ref(false);
// 是否显示搜索表单[默认显示]
const showSearch = ref<boolean>(true); // 默认显示搜索条件
// 表格数据
const tableList = ref<any>([
  {
    dictId: 1,
    dictType: 'YU-ADMIN',
    dictLabel: '天才',
    dictStatus: '1',
    sorted: 1,
    remark: '超级管理员',
    createTime: '2023-08-08 23:00:00'
  },
  {
    dictId: 2,
    dictType: '张大仙',
    dictLabel: '小天才',
    dictStatus: '1',
    sorted: 2,
    remark: '虎牙688，每晚七点半，不见不散！',
    createTime: '2023-08-08 23:00:00'
  },
  {
    dictId: 3,
    dictType: '菜鸡',
    dictLabel: '干饭',
    dictStatus: '1',
    sorted: 3,
    remark: '小小菜鸡，可笑可笑',
    createTime: '2023-08-08 23:00:00'
  }
]);

// 查询参数
const searchParams = ref({
  pageNo: 1, // 第几页
  pageSize: 10, // 每页显示多少条
  dictType: '',
  dictLabel: '',
  dictStatus: ''
});

const total = ref<number>(0);

/** 重置搜索参数 */
const resetSearchParams = () => {
  searchParams.value = {
    pageNo: 1,
    pageSize: 10,
    dictLabel: '',
    dictStatus: '',
    dictType: routeParam.value
  };
};

/** 搜索 */
const handleSearch = () => {
  console.log('搜索');
  searchParams.value.pageNo = 1;
  handleListPage();
};

/** 重置 */
const resetSearch = () => {
  console.log('重置搜索');
  resetSearchParams();
  handleListPage();
};

/** @current-change：点击分页组件页码发生变化：例如：切换第2、3页 OR 上一页 AND 下一页 OR 跳转某一页 */
/** @size-change：点击分页组件下拉选择条数发生变化：例如：选择10条/页、20条/页等 */
// 分页查询，@current-change AND @size-change都会触发分页，调用后端分页接口
/** 数据表格 */
const handleListPage = async () => {
  // total.value = 400;
  try {
    loading.value = true;
    tableList.value = []; // 重置表格数据
    const res: any = await listPage(searchParams.value);
    console.log('字典数据表格数据->', res.data);
    tableList.value = res.data.records;
    total.value = res.data.total;
    loading.value = false;
  } catch (error) {
    console.log(error);
    MsgError('数据查询失败，请刷新重试');
  }
};

/** 数据表格[删除、批量删除等刷新使用] */
const handleTableData = async () => {
  try {
    const res: any = await listPage(searchParams.value);
    console.log('字典数据表格数据->', res.data);
    tableList.value = res.data.records;
    total.value = res.data.total;
    console.log('字典数据表格数据');
  } catch (error) {
    console.log(error);
    MsgError('数据查询失败，请刷新重试');
  }
};
const route = useRoute();
let routeParam = ref();

onMounted(() => {
  routeParam.value = route.params.dictType || ''; // 有值
  searchParams.value.dictType = routeParam.value;
  // 获取表格数据
  handleListPage();
  handleDictType();
  handleFormDict();
  handleTableDict();
});

// 下拉框数据
const tagOptions = ref();

/** 字典翻译下拉框 */
const handleFormDict = async () => {
  try {
    tagOptions.value = [];
    const res: any = await listDataByType('sys_tag_type');
    console.log('字典数据', res.data);
    tagOptions.value = res.data;
  } catch (error) {
    console.log(error);
  }
};

// 下拉框数据
const dictLabelOptions = ref();

/** 字典翻译下拉框 */
const handleTableDict = async () => {
  try {
    dictLabelOptions.value = [];
    const res: any = await listDataByType(searchParams.value.dictType);
    console.log('字典数据', res.data);
    dictLabelOptions.value = res.data;
  } catch (error) {
    console.log(error);
  }
};

// 字典类型名称下拉框
const dictOptions = ref();

/** 字典类型名称下拉框 */
const handleDictType = async () => {
  try {
    const res: any = await listDictType();
    dictOptions.value = res.data;
  } catch (error) {
    console.log(error);
  }
};

const ids = ref([]); // 选择数组
const single = ref<boolean>(true); // 非单个禁用
const multiple = ref<boolean>(true); // 非多个禁用

/** 是否多选 */
const handleSelectionChange = (selection: any) => {
  console.log(selection);
  ids.value = selection.map((item: any) => item.dictId);
  single.value = selection.length != 1; // 单选
  multiple.value = !selection.length; // 多选
};

/** 添加 */
const handleAdd = () => {
  // 打开对话框
  dialogRef.value.open();
  NoticeSuccess('添加');
  // 重置表单
  resetForm();
  // 标题
  title.value = '字典添加';
  form.value.dictStatus = '1';
  form.value.dictType = routeParam.value;
};

/** 回显数据 */
const handleEcho = async (id: any) => {
  if (id == null || id == '') {
    MsgWarning('请选择需要修改的数据');
    return;
  }
  try {
    const res: any = await getById(id);
    console.log(res.data);
    form.value = res.data;
  } catch (error) {
    NoticeError('数据获取失败，请刷新重试');
    console.log(error);
  }
};

/** 修改 */
const handleUpdate = async (row?: any) => {
  // 打开对话框
  dialogRef.value.open();
  NoticeSuccess('修改');
  // 重置表单
  resetForm();
  // 标题
  title.value = '字典修改';
  const dictId = row ? row.dictId : ids.value[0];
  if (dictId == null || dictId == '') {
    MsgError('请选择需要修改的数据');
  }
  console.log(dictId);
  // 回显数据
  handleEcho(dictId);
};

// 添加 OR 修改对话框Ref
const dialogRef = ref();
// 标题
const title = ref('字典管理');
// form表单Ref
const formRef = ref<any>();
// form表单
let form = ref<any>({
  dictId: '',
  dictType: '',
  dictLabel: '',
  dictValue: '',
  dictStatus: '',
  dictTag: '',
  dictColor: '',
  sorted: 1,
  remark: ''
});

/** 清空表单数据 */
const resetForm = () => {
  // 等待 DOM 更新完成
  nextTick(() => {
    if (formRef.value) {
      // 重置该表单项，将其值重置为初始值，并移除校验结果
      formRef.value.resetFields();
    }
  });
  form.value = {
    dictId: '',
    dictType: '',
    dictLabel: '',
    dictValue: '',
    dictStatus: '',
    dictTag: '',
    dictColor: '',
    sorted: 1,
    remark: ''
  };
};

/** 表单规则 */
const rules = reactive({
  dictLabel: [{ required: true, message: '请输入字典名称', trigger: 'blur' }],
  dictValue: [{ required: true, message: '请输入字典数据', trigger: 'blur' }],
  dictTag: [{ required: true, message: '请输入选择标签类型', trigger: 'blur' }],
  dictStatus: [{ required: true, message: '请输入选择字典状态', trigger: 'blur' }]
});

// 确定按钮是否显示Loading
const confirmLoading = ref(false);

/** 确定  */
const handleConfirm = () => {
  if (!formRef.value) return;
  confirmLoading.value = true;
  (formRef.value as any).validate(async (valid: any) => {
    if (valid) {
      console.log('表单ID', form.value.dictId);
      if (form.value.dictId != null && form.value.dictId != '') {
        try {
          await update(form.value);
          NoticeSuccess('修改成功');
          confirmLoading.value = false;
          dialogRef.value.quickClose();
          resetForm();
          handleListPage();
        } catch (error) {
          console.log(error);
          confirmLoading.value = false;
          NoticeError('修改失败，请刷新重试');
        }
      } else {
        try {
          await add(form.value);
          NoticeSuccess('添加成功');
          confirmLoading.value = false;
          dialogRef.value.quickClose();
          resetForm();
          handleListPage();
        } catch (error) {
          console.log(error);
          confirmLoading.value = false;
          NoticeError('添加失败，请刷新重试');
        }
      }
      handleTableDict();
      // let loadingTime = 1;
      // setInterval(() => {
      //   loadingTime--;
      //   if (loadingTime === 0) {
      //     NoticeSuccess("朕让你提交了么？信不信锤你");
      //     confirmLoading.value = false;
      //     resetForm();
      //     dialogRef.value.quickClose();
      //   }
      // }, 1000);
    } else {
      MsgError('验证失败，请检查填写内容');
      confirmLoading.value = false;
    }
  });
};

/** 取消 */
const handleCancel = () => {
  dialogRef.value.close();
};

/** 状态开关 */
const handleSwitch = (row: any) => {
  const text = row.dictStatus === '1' ? '启用' : '停用';
  MsgBox(`确认要[${text}]-[${row.dictLabel}]字典吗？`)
    .then(async () => {
      if (!row.dictId || !row.dictStatus) {
        MsgWarning('请选择需要修改的数据');
        return;
      }
      try {
        await updateStatus(row.dictId, row.dictStatus);
        NoticeSuccess('修改成功');
      } catch (error) {
        console.log(error);
        handleTableData();
        NoticeError('修改失败，请刷新重试');
      }
    })
    .catch(() => {
      MsgError('已取消');
    });
};

/** 删除 */
const handleDelete = (row: any) => {
  const id = row.dictId;
  if (id == null || id == '') {
    MsgWarning('请选择需要删除的数据');
    return;
  }
  MsgBox(`您确认需要删除字典名称[${row.dictLabel}]么？`)
    .then(async () => {
      try {
        await deleteById(id);
        handleTableData();
        NoticeSuccess('删除成功');
      } catch (error) {
        console.log(error);
        handleTableData();
        NoticeError('删除失败，请刷新重试');
      }
    })
    .catch(() => {
      MsgError('已取消');
    });
};

/** 批量删除 */
const handleBatchDelete = () => {
  if (ids.value.length == 0) {
    MsgInfo('请选择需要删除的数据');
    return;
  }
  MsgBox('您确认需要进行批量删除么？')
    .then(async () => {
      try {
        // console.log("ids",ids.value)
        await batchDelete(ids.value);
        handleTableData();
        NoticeSuccess('批量删除成功');
      } catch (error) {
        console.log(error);
        handleTableData();
        NoticeError('批量删除失败，请刷新重试');
      }
    })
    .catch(() => {
      MsgError('已取消');
    });
};
</script>

<template>
  <div class="vault-flex">
    <VaultCard>
      <!-- 搜索条件 -->
      <ElForm v-show="showSearch" :inline="true">
        <ElFormItem label="字典类型" prop="dictType">
          <ElSelect v-model="searchParams.dictType" clearable style="width: 220px" @keyup.enter.native="handleListPage">
            <ElOption v-for="item in dictOptions" :key="item.dictType" :label="item.dictName" :value="item.dictType" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="字典名称" prop="dictLabel">
          <ElInput
            v-model="searchParams.dictLabel"
            placeholder="请输入字典名称"
            clearable
            style="width: 220px"
            @keyup.enter.native="handleListPage"
          ></ElInput>
        </ElFormItem>
        <ElFormItem label="字典状态" prop="dictStatus">
          <ElSelect
            v-model="searchParams.dictStatus"
            placeholder="请选择字典状态"
            clearable
            style="width: 220px"
            @keyup.enter.native="handleListPage"
          >
            <ElOption label="启用" value="1" />
            <ElOption label="停用" value="0" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem>
          <ElButton v-throttle="handleSearch" type="primary" icon="search" plain>搜索</ElButton>
          <ElButton v-debounce="resetSearch" type="danger" icon="refresh" plain>重置</ElButton>
        </ElFormItem>
      </ElForm>

      <!-- 表格头部按钮 -->
      <ElRow :gutter="10">
        <ElCol v-auth="['system:role:add']" :span="1.5">
          <ElButton type="primary" icon="plus" plain @click="handleAdd()">添加</ElButton>
        </ElCol>
        <ElCol v-auth="['system:role:update']" :span="1.5">
          <ElButton type="success" icon="edit" plain :disabled="single" @click="handleUpdate()">修改</ElButton>
        </ElCol>
        <ElCol v-auth="['system:role:delete']" :span="1.5">
          <ElButton type="danger" icon="delete" plain :disabled="multiple" @click="handleBatchDelete()">删除</ElButton>
        </ElCol>
        <ElCol v-auth="['system:role:export']" :span="1.5">
          <ElButton type="warning" icon="download" plain>导出</ElButton>
        </ElCol>
        <VaultToolbar v-model:show-search="showSearch" @refresh-table="handleListPage"></VaultToolbar>
      </ElRow>

      <div class="h-20px"></div>
      <!-- 数据表格 -->
      <ElTable
        v-loading="loading"
        border
        :data="tableList"
        empty-text="暂时没有数据哟"
        @selection-change="handleSelectionChange"
      >
        <ElTableColumn type="selection" width="55" align="center" />
        <ElTableColumn label="序号" prop="dictId" width="120px" align="center" type="index"></ElTableColumn>
        <ElTableColumn label="字典类型" prop="dictType" width="180px" align="center"></ElTableColumn>
        <ElTableColumn label="字典名称" prop="dictValue" width="120px" :show-overflow-tooltip="true" align="center">
          <template #default="scope">
            <VaultTag :tag-options="dictLabelOptions" :value="scope.row.dictValue"></VaultTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="字典键值" prop="dictValue" width="120px" align="center"></ElTableColumn>
        <!-- 注意：如果后端数据返回的是字符串"0" OR "1"，这里的active-value AND inactive-value不需要加冒号，会认为是字符串，否则：后端返回是0 AND 1数字，则需要添加冒号 -->
        <ElTableColumn label="字典状态" prop="dictStatus" width="100px" align="center">
          <template #default="scope">
            <!-- {{ scope.row.dictStatus }} -->
            <ElSwitch
              v-model="scope.row.dictStatus"
              active-text="启用"
              inactive-text="停用"
              active-value="1"
              inactive-value="0"
              :inline-prompt="true"
              @change="handleSwitch(scope.row)"
            ></ElSwitch>
          </template>
        </ElTableColumn>
        <ElTableColumn label="字典排序" prop="sorted" width="100px" align="center"></ElTableColumn>
        <ElTableColumn
          label="字典备注"
          prop="remark"
          width="260px"
          :show-overflow-tooltip="true"
          align="center"
        ></ElTableColumn>
        <ElTableColumn label="创建时间" prop="createTime" width="180px" align="center"></ElTableColumn>
        <ElTableColumn label="操作" align="center" width="120" fixed="right">
          <template #default="{ row }">
            <ElTooltip content="修改" placement="top">
              <ElButton
                type="primary"
                v-auth="['system:role:update']"
                icon="Edit"
                circle
                plain
                @click="handleUpdate(row)"
              ></ElButton>
            </ElTooltip>
            <ElTooltip content="删除" placement="top">
              <ElButton
                type="danger"
                v-auth="['system:role:delete']"
                icon="Delete"
                circle
                plain
                @click="handleDelete(row)"
              ></ElButton>
            </ElTooltip>
          </template>
        </ElTableColumn>
      </ElTable>

      <div class="h-20px"></div>
      <!-- {{ searchParams.pageNo }} --- {{ searchParams.pageSize }} -->
      <!-- 分页 -->
      <ElPagination
        v-show="total > 0"
        v-model:current-page="searchParams.pageNo"
        v-model:page-size="searchParams.pageSize"
        background
        :page-sizes="[10, 20, 50, 100, 200]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleListPage"
        @current-change="handleListPage"
      />

      <!-- 添加 OR 修改 -->
      <VaultDialog
        ref="dialogRef"
        :title="title"
        :loading="confirmLoading"
        @confirm="handleConfirm"
        @cancel="handleCancel"
      >
        <template #content>
          <ElForm ref="formRef" :rules="rules" :model="form" label-width="80px" status-icon>
            <ElRow :gutter="10">
              <ElCol :sm="{ span: 12 }" :xs="{ span: 24 }">
                <ElFormItem label="字典名称" prop="dictLabel">
                  <ElInput v-model="form.dictLabel" placeholder="请输入字典名称" clearable />
                </ElFormItem>
              </ElCol>
              <ElCol :sm="{ span: 12 }" :xs="{ span: 24 }">
                <ElFormItem label="字典数据" prop="dictValue">
                  <ElInput v-model="form.dictValue" placeholder="请输入字典数据" clearable />
                </ElFormItem>
              </ElCol>
            </ElRow>

            <ElRow :gutter="10">
              <ElCol :sm="{ span: 12 }" :xs="{ span: 24 }">
                <ElFormItem label="标签类型" prop="dictTag">
                  <ElSelect v-model="form.dictTag" placeholder="请选择标签类型" style="width: 220px">
                    <ElOption
                      v-for="item in tagOptions"
                      :key="item.dictValue"
                      :label="item.dictLabel"
                      :value="item.dictTag"
                      clearable
                    />
                  </ElSelect>
                </ElFormItem>
              </ElCol>
              <ElCol :sm="{ span: 12 }" :xs="{ span: 24 }">
                <ElFormItem label="字典状态" prop="dictStatus">
                  <ElSelect v-model="form.dictStatus" placeholder="请选择字典状态" style="width: 260px" clearable>
                    <ElOption label="启用" value="1" />
                    <ElOption label="停用" value="0" />
                  </ElSelect>
                </ElFormItem>
              </ElCol>
            </ElRow>
            <ElRow :gutter="10">
              <ElCol :sm="{ span: 12 }" :xs="{ span: 24 }">
                <ElFormItem label="标签颜色" prop="dictColor">
                  <ElInput v-model="form.dictColor" placeholder="请输入背景颜色(16进制)" clearable />
                </ElFormItem>
              </ElCol>
              <ElCol :sm="{ span: 12 }" :xs="{ span: 24 }">
                <ElFormItem label="字典排序" prop="sorted">
                  <ElInputNumber v-model="form.sorted" style="width: 260px" clearable />
                </ElFormItem>
              </ElCol>
            </ElRow>
            <ElRow>
              <ElCol :sm="{ span: 24 }" :xs="{ span: 24 }">
                <ElFormItem label="字典备注" prop="remark">
                  <ElInput v-model="form.remark" :rows="3" type="textarea" placeholder="请输入字典备注" />
                </ElFormItem>
              </ElCol>
            </ElRow>
          </ElForm>
          {{ form }}
        </template>
      </VaultDialog>
    </VaultCard>
  </div>
</template>

<style lang="scss" scoped></style>
