import type { FieldRule } from "vant"

const nameRules: FieldRule[] = [
    { required: true, message: '请输入姓名' },
    { pattern: /^(?:[\u4e00-\u9fa5·]{2,16})$/, message: '中文2-16个字符' }
]
  
const idCardRules: FieldRule[] = [
    { required: true, message: '请输入身份证号' },
    {
      pattern:
        /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
      message: '身份证号不正确'
    }
]
  
export { nameRules, idCardRules }
  