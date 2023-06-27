import type { DoctorPage, FollowType, KnowledgePage, KnowledgeParams, PageParams, TopDep, Image, PartialConsult } from "@/types/Consult";
import Request from "@/utils/Request";

// 知识加载
export const getKnowledgeAPI = (params: KnowledgeParams) => Request<KnowledgePage>('GET', '/patient/home/knowledge', params)

// 推荐医生
export const getDoctorPageAPI = (params: PageParams) => Request<DoctorPage>('GET', '/home/page/doc', params)

// 关注医生
export const followDoctorAPI = (id: string, type: FollowType = 'doc') => Request<any>('POST', '/like', { id, type })

// 获取科室
export const getAllDepAPI = () => Request<TopDep[]>('GET', '/dep/all')

// 上传图片
export const uploadImageAPI = (file: File) => {
    const fd = new FormData()

    fd.append('file', file)

    return Request<Image>('POST', '/upload', fd)
}

import type { ConsultOrderPreData, ConsultOrderPreParams } from '@/types/Consult'

// 拉取预支付订单信息
export const getConsultOrderPreAPI = (params: ConsultOrderPreParams) =>
    Request<ConsultOrderPreData>('GET', '/patient/consult/order/pre', params)

// 生成订单
export const createConsultOrderAPI = (data: PartialConsult) =>
    Request<{ id: string }>('POST', '/patient/consult/order', data)

// 获取支付地址  0 是微信  1 支付宝
export const getConsultOrderPayUrlAPI = (params: {
    paymentMethod: 0 | 1
    orderId: string
    payCallback: string
}) => Request<{ payUrl: string }>('POST', '/patient/consult/pay', params)