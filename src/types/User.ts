// 用户信息
// export type User = {
//     /** token令牌 */
//     token: string
//     /** 用户ID */
//     id: string
//     /** 用户名称 */
//     account: string
//     /** 手机号 */
//     mobile: string
//     /** 头像 */
//     avatar: string
// }

export interface User {
    data: {
      author: {
        avatar_url: string,
        loginname: string
      },
      author_id: string,
      content: string,
      create_at: string,
      goods: boolean,
      id: string,
      last_reply_at: string,
      reply_count: number,
      tab: string,
      title: string,
      top: boolean,
      visit_count: number
    }[],
    success: boolean
  }