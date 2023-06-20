import type { DoctorPage, FollowType, KnowledgePage, KnowledgeParams, PageParams, TopDep, Image } from "@/types/Consult";
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