import type { KnowledgePage, KnowledgeParams } from "@/types/consult";
import Request from "@/utils/Request";

// 知识加载
export const getKnowledgeAPI = (params: KnowledgeParams) => Request<KnowledgePage>('GET', '/patient/home/knowledge', params)