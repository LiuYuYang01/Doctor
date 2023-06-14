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

// 家庭档案-患者信息
export type Patient = {
    /** 患者ID */
    id?: string
    /** 患者名称 */
    name: string
    /** 身份证号 */
    idCard: string
    /** 0不默认  1默认 */
    defaultFlag: 0 | 1
    /** 0 女  1 男 */
    gender: 0 | 1
    /** 性别文字 */
    genderValue?: string
    /** 年龄 */
    age?: number
}

// 家庭档案-患者信息列表
export type PatientList = Patient[]

// 患者信息
export type Patient = {
    id?: string
    name: string
    idCard: string
    defaultFlag: 0 | 1
    gender: 0 | 1
    genderValue?: string
    age?: number
}