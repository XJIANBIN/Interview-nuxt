<template>
  <div class="index">
    <el-data-table
      v-bind="$data"
      :onNew="onNew"
      :onEdit="onEdit"
      :onDelete="onDelete"
    >
    </el-data-table>
  </div>
</template>

<script>
const pageSize = 10
export default {
  data() {
    return {
      url: '/getList',
      columns: [
        {type: 'selection'},
        {prop: 'componentName', label: '组件名称'},
        {
          prop: 'categoryType',
          label: '分类',
          formatter: row => {
            let obj = {
              0: '前端组件',
              1: '测试子组件',
              2: '分布式工具',
              3: '应用服务',
              4: '数据存储',
              5: '分布式存储'
            }
            return obj[row.categoryType]
          }
        },
        {prop: 'version', label: '版本'},
        {
          prop: 'language',
          label: '开发语言',
          width: '150px'
        },
        {prop: 'lastUpdateTime', label: '最后更新时间'},
        {
          prop: 'status',
          label: '状态',
          formatter: row => {
            let status = row.status == 0 ? '下线' : '上线',
              tag = ''
            if (row.status == 0) {
              tag = <span />
            } else {
              tag = <span class="el-item-status" />
            }
            tag.text = status
            return tag
          }
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
      hasView: true,
      extraButtons: [
        {
          text: '下架',
          atClick: row => {
            this.$axios.$delete('/deletelistItem', {
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
          $options: ['下线', '上线'].map((f, index) => ({
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
  methods: {
    onNew(data, row) {
      return this.$axios.$post('/newList', {...data})
    },
    onEdit(data, row) {
      return this.$axios.$post('/editList', {...data})
    },
    onDelete(selected) {
      return this.$axios.$delete('/deletelistItem', {
        data: selected.id || selected.map(v => v.id)
      })
    }
  }
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
