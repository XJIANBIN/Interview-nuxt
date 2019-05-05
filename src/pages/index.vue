<template>
  <div class="index">
    <el-data-table
      v-bind="$data"
      ref="elDataTable"
    >
    </el-data-table>
  </div>
</template>

<script>
const pageSize = 10,
  categoryType = {
    0: '前端组件',
    1: '测试子组件',
    2: '分布式工具',
    3: '应用服务',
    4: '数据存储',
    5: '分布式存储'
  }
import Tools from '@/assets/js/tools'
export default {
  data() {
    return {
      url: '/componentList',
      columns: [
        {type: 'selection'},
        {prop: 'componentName', label: '组件名称'},
        {
          prop: 'categoryType',
          label: '分类',
          formatter: row => {
            return categoryType[row.categoryType]
          }
        },
        {prop: 'version', label: '版本'},
        {
          prop: 'language',
          label: '开发语言',
          width: '150px'
        },
        {
          prop: 'lastUpdateTime',
          label: '最后更新时间',
          formatter: row => {
            return Tools.formateTime(row.lastUpdateTime)
          }
        },
        {
          prop: 'status',
          label: '状态',
          formatter: row =>
            row.status === 1 ? (
              <div class="el-item-status">上架</div>
            ) : (
              <div>下架</div>
            )
        }
      ],
      searchForm: [
        {
          $el: {placeholder: '请输入'},
          label: '组件名称',
          $id: 'componentName',
          $type: 'input'
        },
        {
          $el: {placeholder: '请输入'},
          label: '分类',
          $id: 'category',
          $type: 'input'
        },
        {
          $el: {placeholder: '请输入'},
          label: '状态',
          $id: 'status',
          $type: 'input'
        }
      ],
      // hasView: true,
      hasEdit: false,
      extraButtons: [
        {
          type: 'primary',
          text: '查看',
          atClick: row => {
            // hack处理，el-data-table 未暴露弹窗调出接口
            this.$refs['elDataTable'].onDefaultView(row)
            return Promise.resolve()
          }
        },
        {
          text: '编辑',
          atClick: row => {
            // hack处理，el-data-table 未暴露弹窗调出接口
            this.$refs['elDataTable'].onDefaultEdit(row)
            return Promise.resolve()
          }
        },
        {
          text: '下架',
          atClick: row => {
            this.$axios.$delete(`/componentList/${row.id}`, {
              data: [row.id]
            })
            return Promise.resolve()
          }
        }
      ],
      dataPath: 'data.content',
      totalPath: 'data.totalElements',
      form: [
        {
          $type: 'input',
          $id: 'componentName',
          label: '组件名称',
          rules: [
            {
              required: true,
              message: '请输入名称',
              trigger: 'blur',
              transform: v => v && v.trim()
            }
          ],
          $el: {placeholder: '请输入'}
        },
        {
          $type: 'select',
          $id: 'categoryType',
          label: '组件类型',
          rules: [{required: true, message: '请选择组件类型', trigger: 'blur'}],
          $options: [
            '前端组件',
            '测试子组件',
            '分布式工具',
            '应用服务',
            '数据存储',
            '分布式存储'
          ].map((f, index) => ({label: f, value: index})),
          $el: {
            placeholder: '请选择'
          }
        },
        {
          $type: 'input',
          $id: 'version',
          label: '版本',
          rules: [
            {
              required: true,
              message: '请输入版本',
              trigger: 'blur',
              transform: v => v && v.trim()
            }
          ],
          $el: {placeholder: '请输入'}
        },
        {
          $type: 'input',
          $id: 'language',
          label: '语言',
          rules: [
            {
              required: true,
              message: '请输入语言',
              trigger: 'blur',
              transform: v => v && v.trim()
            }
          ],
          $el: {placeholder: '请输入'}
        },
        {
          $type: 'select',
          $id: 'status',
          label: '状态',
          rules: [{required: true, message: '请选择状态', trigger: 'blur'}],
          $options: ['下架', '上架'].map((f, index) => ({
            label: f,
            value: index
          })),
          $el: {
            placeholder: '请选择'
          }
        }
      ]
    }
  },
  computed: {},
  methods: {}
}
</script>
<style lang="less" scoped>
.index {
  .home-img {
    width: 100%;
  }

  .el-item-status {
    color: #80b928;
  }
}
</style>
