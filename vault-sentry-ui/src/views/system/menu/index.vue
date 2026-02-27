<script setup lang="ts" name="menuPage">
import { nextTick, onMounted, reactive, ref } from 'vue';
import {
  add,
  batchDelete,
  cascaderList,
  deleteById,
  getById,
  list,
  update,
  updateSpread,
  updateStatus
} from '@/api/system/menu/index.ts';
import { useDict } from '@/hooks/dicts/index.ts';
import { MsgBox, MsgError, MsgInfo, MsgWarning, NoticeError, NoticeSuccess } from '@/utils/message.ts';
import { handleTree } from '@/utils/index.ts';

const { koiDicts } = useDict(['sys_menu_type']);
// 表格加载动画Loading
const loading = ref(false);
// 是否显示搜索表单[默认显示]
const showSearch = ref<boolean>(true); // 默认显示搜索条件

// 表格数据
const tableList = ref([
  {
    menuId: 1,
    menuName: '系统管理',
    menuType: '1',
    icon: 'Tools',
    auth: 'system:menu:list',
    component: 'system/menu/Index',
    isSpread: '0',
    menuStatus: '1',
    isVisible: '1',
    path: 'system',
    sorted: 1,
    children: [
      {
        menuId: 3,
        menuName: '用户管理',
        menuType: '2',
        icon: 'UserFilled',
        auth: 'system:menu:list',
        component: 'system/menu/Index',
        isSpread: '0',
        menuStatus: '1',
        isVisible: '1',
        path: 'system',
        sorted: 3
      },
      {
        menuId: 4,
        menuName: '角色管理',
        menuType: '2',
        icon: 'CameraFilled',
        auth: 'system:menu:list',
        component: 'system/menu/Index',
        isSpread: '0',
        menuStatus: '1',
        isVisible: '1',
        path: 'system',
        sorted: 4
      },
      {
        menuId: 9,
        menuName: '菜单管理',
        menuType: '2',
        icon: 'Menu',
        auth: 'system:menu:list',
        component: 'system/menu/Index',
        isSpread: '0',
        menuStatus: '1',
        isVisible: '1',
        path: 'system',
        sorted: 5
      }
    ]
  },
  {
    menuId: 2,
    menuName: '监控管理',
    menuType: '1',
    icon: 'Search',
    auth: 'system:menu:list',
    component: 'system/menu/Index',
    isSpread: '0',
    menuStatus: '1',
    isVisible: '1',
    path: 'system',
    sorted: 2,
    children: [
      {
        menuId: 5,
        menuName: '熊出没',
        menuType: '2',
        icon: 'CameraFilled',
        auth: 'system:menu:list',
        component: 'system/menu/Index',
        isSpread: '0',
        menuStatus: '1',
        isVisible: '1',
        path: 'system',
        sorted: 6
      },
      {
        menuId: 6,
        menuName: '海绵宝宝',
        menuType: '2',
        icon: 'Menu',
        auth: 'system:menu:list',
        component: 'system/menu/Index',
        isSpread: '0',
        menuStatus: '1',
        isVisible: '1',
        path: 'system',
        sorted: 7
      }
    ]
  }
]);

// 查询参数
const searchParams = ref({
  menuName: '',
  auth: '',
  menuStatus: ''
});

/** 重置搜索参数 */
const resetSearchParams = () => {
  searchParams.value = {
    menuName: '',
    auth: '',
    menuStatus: ''
  };
};

/** 搜索 */
const handleSearch = () => {
  console.log('搜索');
  handleTableData();
};

/** 重置 */
const resetSearch = () => {
  console.log('重置搜索');
  resetSearchParams();
  handleTreeList();
};

/** 树形表格查询 */
const handleTreeList = async () => {
  // try {
  //   loading.value = true;
  //   tableList.value = []; // 重置表格数据
  //   const res: any = await list(searchParams.value);
  //   console.log("菜单数据表格数据->", res.data);
  //   handleExpandKey(res.data);
  //   tableList.value = handleTree(res.data, "menuId");
  //   loading.value = false;
  // } catch (error) {
  //   console.log(error);
  //   koiNoticeError("数据查询失败，请刷新重试");
  // }
};

/** 树形表格[删除、批量删除等刷新使用] */
const handleTableData = async () => {
  try {
    const res: any = await list(searchParams.value);
    console.log('菜单数据表格数据->', res.data);
    handleExpandKey(res.data);
    tableList.value = handleTree(res.data, 'menuId');
  } catch (error) {
    console.log(error);
    koiNoticeError('数据查询失败，请刷新重试');
  }
};

// 静态页面防止报错(可直接删除)
// @ts-ignore
const handleStaticPage = () => {
  list(searchParams.value);
  handleExpandKey([]);
};

// 展开数据
const expandKey = ref();

/** 展开节点 */
const handleExpandKey = (data: any) => {
  if (data != null && data.length != 0) {
    expandKey.value = [];
    const resultList: string[] = [];
    data.forEach((obj: any) => {
      if (obj.parentId == '0' && obj.isSpread == '0') {
        resultList.push(obj.menuId);
      }
      if (obj.parentId != '0' && obj.isSpread == '0') {
        resultList.push(obj.menuId);
        resultList.push(obj.parentId);
      }
    });
    // 过滤数据
    const uniqueArray = [...new Set(resultList)];
    console.log('展开节点', uniqueArray);
    // 数组必须转为String类型的才生效
    expandKey.value = uniqueArray.map(String);
  } else {
    expandKey.value = [];
  }
};

onMounted(() => {
  // 获取表格数据
  handleTreeList();
});

const ids = ref([]); // 选择数组
const single = ref<boolean>(true); // 非单个禁用
const multiple = ref<boolean>(true); // 非多个禁用

/** 是否多选 */
const handleSelectionChange = (selection: any) => {
  // console.log(selection);
  ids.value = selection.map((item: any) => item.menuId);
  single.value = selection.length != 1; // 单选
  multiple.value = !selection.length; // 多选
};

// 级联下拉框
const cascaderOptions = ref([]);

/** 菜单级联数据 */
const handleCascader = async () => {
  try {
    cascaderOptions.value = [];
    const res: any = await cascaderList();
    if (res.data != null && res.data != undefined && res.data.length > 0) {
      cascaderOptions.value = handleTree(res.data, 'value');
    }
    // @ts-ignore
    cascaderOptions.value.unshift({
      label: '最顶级菜单',
      value: '0',
      parentId: '-1'
    });
  } catch (error) {
    console.log(error);
    koiMsgError('菜单级联数据查询失败，请重试');
  }
};

// 重新渲染表格状态
const refreshTreeTable = ref(true);
// 是否展开[默认折叠]
const isExpandAll = ref(false);

/** 展开/折叠 */
const toggleExpandAll = () => {
  refreshTreeTable.value = false;
  isExpandAll.value = !isExpandAll.value;
  nextTick(() => {
    refreshTreeTable.value = true;
  });
};

/** 添加 */
const handleAdd = () => {
  // 打开对话框
  koiDialogRef.value.koiOpen();
  koiNoticeSuccess('添加');
  // 重置表单
  resetForm();
  // 重置图标
  form.value.icon = '';
  // 标题
  title.value = '菜单添加';
  handleCascader();
  form.value.menuStatus = '1';
};

/** 回显数据 */
const handleEcho = async (id: any) => {
  if (id == null || id == '') {
    koiMsgWarning('请选择需要修改的数据');
    return;
  }
  try {
    const res: any = await getById(id);
    console.log('菜单回显数据', res.data);
    form.value = res.data;
  } catch (error) {
    console.log(error);
    koiNoticeError('数据获取失败，请刷新重试');
  }
};

/** 修改 */
const handleUpdate = async (row?: any) => {
  // 打开对话框
  koiDialogRef.value.koiOpen();
  koiNoticeSuccess('修改');
  // 重置表单
  resetForm();
  // 标题
  title.value = '菜单修改';
  const id = row ? row.menuId : ids.value[0];
  if (id == null || id == '') {
    koiMsgError('请选择需要修改的数据');
  }
  handleCascader();
  // 回显数据
  handleEcho(id);
};

// 添加 OR 修改对话框Ref
const koiDialogRef = ref();
// 标题
const title = ref('菜单管理');
// form表单Ref
const formRef = ref();
// form表单
let form = ref();

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
    parentId: '0',
    menuType: '2',
    icon: '',
    menuName: '',
    name: '',
    path: '',
    component: '',
    isVisible: '1',
    linkUrl: '',
    isKeepAlive: '0',
    isSpread: '0',
    auth: '',
    isTag: '0',
    isAffix: '0',
    sorted: 1
  };
};

/** 表单规则 */
const rules = reactive({
  parentId: [{ required: true, message: '请选择上级菜单', trigger: 'blur' }],
  menuType: [{ required: true, message: '请选择菜单类型', trigger: 'blur' }],
  menuName: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  isVisible: [{ required: true, message: '请选择是否显示', trigger: 'blur' }],
  auth: [{ required: true, message: '请输入权限字符', trigger: 'blur' }],
  sorted: [{ required: true, message: '请输入排序号', trigger: 'blur' }]
});

// 确定按钮是否显示Loading
const confirmLoading = ref(false);

/** 确定  */
const handleConfirm = () => {
  if (!formRef.value) return;
  confirmLoading.value = true;
  (formRef.value as any).validate(async (valid: any) => {
    if (valid) {
      // console.log("表单ID", form.value.menuId);
      if (form.value.menuId != null && form.value.menuId != '') {
        try {
          await update(form.value);
          koiNoticeSuccess('修改成功');
          confirmLoading.value = false;
          koiDialogRef.value.koiQuickClose();
          resetForm();
          handleTreeList();
        } catch (error) {
          console.log(error);
          confirmLoading.value = false;
          koiNoticeError('修改失败，请刷新重试');
        }
      } else {
        try {
          await add(form.value);
          koiNoticeSuccess('添加成功');
          confirmLoading.value = false;
          koiDialogRef.value.koiQuickClose();
          resetForm();
          handleTreeList();
        } catch (error) {
          console.log(error);
          confirmLoading.value = false;
          koiNoticeError('添加失败，请刷新重试');
        }
      }
    } else {
      koiMsgError('验证失败，请检查填写内容');
      confirmLoading.value = false;
    }
  });
};

/** 取消 */
const handleCancel = () => {
  koiDialogRef.value.koiClose();
};

/** 状态开关 */
const handleSwitch = (row: any) => {
  const text = row.menuStatus === '1' ? '启用' : '停用';
  koiMsgBox(`确认要[${text}]-[${row.menuName}]菜单吗？`)
    .then(async () => {
      if (!row.menuId || !row.menuStatus) {
        koiMsgWarning('请选择需要修改的数据');
        return;
      }
      try {
        await updateStatus(row.menuId, row.menuStatus);
        koiNoticeSuccess('修改成功');
      } catch (error) {
        console.log(error);
        koiNoticeError('修改失败，请刷新重试');
      }
    })
    .catch(() => {
      koiMsgError('已取消');
    });
};

/** 是否展开 */
const handleIsSpread = async (row: any) => {
  if (!row.menuId || !row.isSpread) {
    koiMsgWarning('请选择需要展开的数据');
    return;
  }
  try {
    await updateSpread(row.menuId, row.isSpread);
    handleTableData();
    koiNoticeSuccess('操作成功');
  } catch (error) {
    console.log(error);
    koiNoticeError('操作失败，请刷新重试');
  }
};

/** 删除 */
const handleDelete = (row: any) => {
  const id = row.menuId;
  if (id == null || id == '') {
    koiMsgWarning('请选择需要删除的数据');
    return;
  }
  koiMsgBox(`您确认需要删除菜单名称[${row.menuName}]么？`)
    .then(async () => {
      try {
        await deleteById(id);
        koiNoticeSuccess('删除成功');
        handleTableData();
      } catch (error) {
        console.log(error);
      }
    })
    .catch(() => {
      koiMsgError('已取消');
    });
};

/** 批量删除 */
const handleBatchDelete = () => {
  if (ids.value.length == 0) {
    koiMsgInfo('请选择需要删除的数据');
    return;
  }
  koiMsgBox('您确认需要进行批量删除么？删除后将无法进行恢复？')
    .then(async () => {
      try {
        await batchDelete(ids.value);
        koiNoticeSuccess('批量删除成功');
        handleTableData();
      } catch (error) {
        console.log(error);
      }
    })
    .catch(() => {
      koiMsgError('已取消');
    });
};
</script>

<template>
  <div class="koi-flex">
    <VaultCard>
      <!-- 搜索条件 -->
      <ElForm v-show="showSearch" :inline="true">
        <ElFormItem label="菜单名称" prop="menuName">
          <ElInput
            v-model="searchParams.menuName"
            placeholder="请输入菜单名称"
            clearable
            style="width: 220px"
            @keyup.enter.native="handleTreeList"
          ></ElInput>
        </ElFormItem>
        <ElFormItem label="菜单状态" prop="menuStatus">
          <ElSelect
            v-model="searchParams.menuStatus"
            placeholder="请选择菜单状态"
            clearable
            style="width: 220px"
            @keyup.enter.native="handleTreeList"
          >
            <ElOption label="启用" value="1" />
            <ElOption label="停用" value="0" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="权限标识" prop="auth">
          <ElInput
            v-model="searchParams.auth"
            placeholder="请输入权限标识"
            clearable
            style="width: 220px"
            @keyup.enter.native="handleTreeList"
          ></ElInput>
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
        <!--  @click="handleExpend()"  -->
        <ElCol v-auth="['system:role:add']" :span="1.5">
          <ElButton type="info" icon="Sort" plain @click="toggleExpandAll()">展开/折叠</ElButton>
        </ElCol>
        <VaultToolbar v-model:show-search="showSearch" @refresh-table="handleTableData"></VaultToolbar>
      </ElRow>

      <div class="h-20px"></div>
      <!-- 数据表格 -->
      <ElTable
        v-if="refreshTreeTable"
        v-loading="loading"
        border
        :data="tableList"
        :default-expand-all="isExpandAll"
        :expand-row-keys="expandKey"
        row-key="menuId"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        empty-text="暂时没有数据哟"
        @selection-change="handleSelectionChange"
      >
        <ElTableColumn type="selection" width="55" align="center" />
        <ElTableColumn label="序号" prop="menuId" width="80px" align="center" type="index"></ElTableColumn>
        <ElTableColumn
          label="菜单名称"
          prop="menuName"
          width="160px"
          align="left"
          :show-overflow-tooltip="true"
        ></ElTableColumn>
        <ElTableColumn label="菜单类型" prop="menuType" width="100px" align="center">
          <template #default="scope">
            <KoiTag :tag-options="koiDicts.sys_menu_type" :value="scope.row.menuType"></KoiTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="展开/折叠" prop="isSpread" width="100px" align="center">
          <template #default="scope">
            <ElSwitch
              v-model="scope.row.isSpread"
              active-text="展开"
              inactive-text="折叠"
              active-value="1"
              inactive-value="0"
              :inline-prompt="true"
              @click="handleIsSpread(scope.row)"
            ></ElSwitch>
          </template>
        </ElTableColumn>
        <ElTableColumn label="图标" prop="icon" width="80px" align="center">
          <template #default="scope">
            <!-- 使用 is 属性绑定组件名称 -->
            <div class="flex flex-justify-center">
              <ElIcon v-if="scope.row.icon && scope.row.icon.indexOf('koi-') == '-1'" :size="20">
                <component :is="scope.row.icon"></component>
              </ElIcon>
              <ElIcon v-if="scope.row.icon && scope.row.icon.indexOf('koi-') == '0'" :size="20">
                <component is="KoiSvgIcon" :name="scope.row.icon"></component>
              </ElIcon>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn
          label="权限标识"
          prop="auth"
          width="220px"
          align="center"
          :show-overflow-tooltip="true"
        ></ElTableColumn>
        <ElTableColumn
          label="页面路径"
          prop="component"
          width="220px"
          align="center"
          :show-overflow-tooltip="true"
        ></ElTableColumn>
        <!-- 注意：如果后端数据返回的是字符串"0" OR "1"，这里的active-value AND inactive-value不需要加冒号，会认为是字符串，否则：后端返回是0 AND 1数字，则需要添加冒号 -->
        <ElTableColumn label="菜单状态" prop="menuStatus" width="100px" align="center">
          <template #default="scope">
            <!-- {{ scope.row.menuStatus }} -->
            <ElSwitch
              v-model="scope.row.menuStatus"
              active-text="启用"
              inactive-text="停用"
              active-value="1"
              inactive-value="0"
              :inline-prompt="true"
              @click="handleSwitch(scope.row)"
            ></ElSwitch>
          </template>
        </ElTableColumn>
        <ElTableColumn label="是否显示" prop="isVisible" width="100px" align="center" :show-overflow-tooltip="true">
          <template #default="scope">
            <ElTag :type="scope.row.isVisible == '0' ? 'danger' : scope.row.isVisible == '1' ? 'primary' : 'warning'">
              {{ scope.row.isVisible == '0' ? '隐藏' : scope.row.isVisible == '1' ? '显示' : '未知状态' }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn
          label="路由path"
          prop="path"
          width="180px"
          align="center"
          :show-overflow-tooltip="true"
        ></ElTableColumn>
        <ElTableColumn label="显示顺序" prop="sorted" width="90px" align="center"></ElTableColumn>
        <ElTableColumn label="操作" align="center" width="120" fixed="right">
          <template #default="{ row }">
            <ElTooltip content="修改" placement="top">
              <ElButton
                v-auth="['system:role:update']"
                type="primary"
                icon="Edit"
                circle
                plain
                @click="handleUpdate(row)"
              ></ElButton>
            </ElTooltip>
            <ElTooltip content="删除" placement="top">
              <ElButton
                v-auth="['system:role:delete']"
                type="danger"
                icon="Delete"
                circle
                plain
                @click="handleDelete(row)"
              ></ElButton>
            </ElTooltip>
          </template>
        </ElTableColumn>
      </ElTable>
      <!-- 添加 OR 修改 -->
      <KoiDialog
        ref="koiDialogRef"
        :title="title"
        :loading="confirmLoading"
        :height="500"
        @koi-confirm="handleConfirm"
        @koi-cancel="handleCancel"
      >
        <template #content>
          <ElForm ref="formRef" :rules="rules" :model="form" label-width="auto" status-icon>
            <ElRow>
              <ElCol :sm="{ span: 24 }" :xs="{ span: 24 }">
                <!-- 菜单级联选择框 -->
                <ElFormItem label="菜单上级" prop="parentId">
                  <ElCascader
                    v-model="form.parentId"
                    placeholder="请选择菜单上级"
                    :options="cascaderOptions"
                    :props="{
                      expandTrigger: 'hover',
                      emitPath: false,
                      checkStrictly: true
                    }"
                    filterable
                    clearable
                    style="width: 540px"
                  >
                    <template #default="{ node, data }">
                      <span>{{ data.label }}</span>
                      <span v-if="!node.isLeaf">({{ data.children.length }})</span>
                    </template>
                  </ElCascader>
                </ElFormItem>
              </ElCol>
            </ElRow>

            <ElRow>
              <ElCol :sm="{ span: 24 }" :xs="{ span: 24 }">
                <!-- 菜单级联选择框 -->
                <ElFormItem label="菜单类型" prop="menuType">
                  <ElRadioGroup v-model="form.menuType">
                    <ElRadio
                      v-for="(item, index) in koiDicts.sys_menu_type"
                      :key="item.dictValue + index"
                      :value="item.dictValue"
                      border
                      >{{ item.dictLabel }}</ElRadio
                    </el-radio>
                  </ElRadioGroup>
                </ElFormItem>
              </ElCol>
            </ElRow>

            <ElRow>
              <ElCol v-if="form.menuType < 3" :sm="{ span: 24 }" :xs="{ span: 24 }">
                <div class="m-b-15px m-l-8px flex flex-items-center">
                  <ElFormItem prop="icon"></ElFormItem>
                  <div class="w-70px">菜单图标</div>
                  <KoiSelectIcon v-model="form.icon" width="300"></KoiSelectIcon>
                </div>
              </ElCol>
            </ElRow>

            <ElRow :gutter="10">
              <ElCol :sm="{ span: 12 }" :xs="{ span: 24 }">
                <ElFormItem label="菜单名称" prop="menuName">
                  <ElInput v-model="form.menuName" placeholder="请输入菜单名称" clearable />
                </ElFormItem>
              </ElCol>
              <ElCol :sm="{ span: 12 }" :xs="{ span: 24 }">
                <ElFormItem label="显示排序" prop="sorted">
                  <ElInputNumber v-model="form.sorted" clearable />
                </ElFormItem>
              </ElCol>
            </ElRow>

            <ElRow :gutter="10">
              <ElCol :sm="{ span: 12 }" :xs="{ span: 24 }">
                <ElFormItem label="是否显示" prop="isVisible">
                  <ElRadioGroup v-model="form.isVisible">
                    <ElRadio value="1">是</ElRadio>
                    <ElRadio value="0">否</ElRadio>
                  </ElRadioGroup>
                </ElFormItem>
              </ElCol>
              <ElCol :sm="{ span: 12 }" :xs="{ span: 24 }">
                <ElFormItem label="权限字符" prop="auth">
                  <ElInput v-model="form.auth" placeholder="权限字符[system:user:list]" clearable />
                </ElFormItem>
              </ElCol>
            </ElRow>

            <ElRow v-if="form.menuType == '2'">
              <ElCol :sm="{ span: 24 }" :xs="{ span: 24 }">
                <ElFormItem label="页面路径" prop="component">
                  <ElInput v-model="form.component" placeholder="请输入页面路径[system/user/index]" clearable />
                </ElFormItem>
              </ElCol>
            </ElRow>

            <ElRow v-if="form.menuType < 3" :gutter="10">
              <ElCol :sm="{ span: 12 }" :xs="{ span: 24 }">
                <ElFormItem label="路由名称" prop="name">
                  <ElInput v-model="form.name" placeholder="例如：user[唯一]" clearable />
                </ElFormItem>
              </ElCol>
              <ElCol :sm="{ span: 12 }" :xs="{ span: 24 }">
                <ElFormItem label="路由Path" prop="path">
                  <ElInput v-model="form.path" placeholder="例如：/user[唯一]" clearable />
                </ElFormItem>
              </ElCol>
            </ElRow>

            <ElRow :gutter="10">
              <ElCol v-if="form.menuType < 3" :sm="{ span: 12 }" :xs="{ span: 24 }">
                <ElFormItem label="是否折叠" prop="isSpread">
                  <ElRadioGroup v-model="form.isSpread">
                    <ElRadio value="1">是</ElRadio>
                    <ElRadio value="0">否</ElRadio>
                  </ElRadioGroup>
                </ElFormItem>
              </ElCol>
              <ElCol v-if="form.menuType < 3" :sm="{ span: 12 }" :xs="{ span: 24 }">
                <ElFormItem label="是否固钉" prop="isAffix">
                  <ElRadioGroup v-model="form.isAffix">
                    <ElRadio value="1">是</ElRadio>
                    <ElRadio value="0">否</ElRadio>
                  </ElRadioGroup>
                </ElFormItem>
              </ElCol>
            </ElRow>

            <ElRow>
              <ElCol :sm="{ span: 24 }" :xs="{ span: 24 }">
                <ElFormItem label="外链地址" prop="linkUrl">
                  <ElInput v-model="form.linkUrl" placeholder="请输入外链地址[输入值则判断为外链地址]" clearable />
                </ElFormItem>
              </ElCol>
            </ElRow>
          </ElForm>
          {{ form }}
        </template>
      </KoiDialog>
    </KoiCard>
  </div>
</template>

<style lang="scss" scoped></style>
