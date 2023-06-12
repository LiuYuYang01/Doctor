// 用户信息
export type User = {
    /** token令牌 */
    token: string
    /** 用户ID */
    id: string
    /** 用户名称 */
    account: string
    /** 手机号 */
    mobile: string
    /** 头像 */
    avatar: string
}


// 排除User类型中的token，返回一个新类型OmitUser
type OmitUser = Omit<User, 'token'>

// 个人信息
export type UserInfo = OmitUser & {
    /** 关注 */
    likeNumber: number
    /** 收藏 */
    collectionNumber: number
    /** 积分 */
    score: number
    /** 优惠券 */
    couponNumber: number
    // 订单信息
    orderInfo: {
        /** 待付款 */
        paidNumber: number
        /** 待发货 */
        receivedNumber: number
        /** 待收货 */
        shippedNumber: number
        /** 已完成 */
        finishedNumber: number
    }
}