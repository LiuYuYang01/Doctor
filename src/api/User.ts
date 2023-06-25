import Request from "@/utils/Request";
import type { Patient, UserInfo } from '@/types/User'

// 获取用户信息
export const getUserInfoAPI = () => Request<UserInfo>("GET", "/patient/myuser")

// 获取患者详情
export const getPatientDetailAPI = (id: string) => Request<Patient>("GET", `/patient/info/${id}`)
