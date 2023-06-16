import { ref } from 'vue'
import type { FollowType } from '@/types/Consult'
import { followDoctorAPI } from '@/api/Consult'

// 封装关注医生逻辑 规范使用
export const useFollow = (type: FollowType = "doc") => {
    // 加载效果
    const loading = ref<boolean>(false)

    // 关注逻辑
    const follow = async (item: { id: string, likeFlag: 0 | 1 }) => {
        // 加载中
        loading.value = true

        try {
            await followDoctorAPI(item.id, type)
            item.likeFlag = item.likeFlag === 1 ? 0 : 1
        } finally {
            // 加载完成
            loading.value = false
        }
    }

    return { loading, follow }
}