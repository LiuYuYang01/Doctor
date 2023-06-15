import type { DoctorPage, KnowledgePage, KnowledgeParams, PageParams } from "@/types/consult";
import Request from "@/utils/Request";

// 知识加载
export const getKnowledgeAPI = (params: KnowledgeParams) => Request<KnowledgePage>('GET', '/patient/home/knowledge', params)

// 推荐医生
export const getDoctorPageAPI = (params: PageParams) => Request<DoctorPage>('GET', '/home/page/doc', params)