import Request from "@/utils/Request";
import type { UserInfo } from '@/types/User'

// 获取用户信息
export const getUserInfoAPI = () => Request<UserInfo>("GET", "/patient/myuser")