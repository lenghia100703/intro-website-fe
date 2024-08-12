import { ElMessage } from 'element-plus'

export const copyToClipboard = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text)
        ElMessage({
            type: 'success',
            message: 'Đã sao chép vào Clipboard!',
        })
    } catch (e) {
        console.error('Failed to copy: ', e)
    }
}