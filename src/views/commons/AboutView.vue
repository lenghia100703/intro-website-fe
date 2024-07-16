<template>
    <div class="about-us">
        <div class="title-page">
            <h1 class="intro-title">Về chúng tôi</h1>
        </div>
        <div class="spacing"></div>
        <div class="content">
            <el-row justify="space-between">
                <el-col :span="10">
                    <div>
                        <el-button style="background-color: #f0f9eb; color: #67c23a" type="success" round plain>Giới
                            thiệu
                        </el-button>
                    </div>
                    <br />
                    <div class="intro-title">
                        An Quý Cường - Giải pháp cho bao bì và bìa carton
                    </div>
                    <br />
                    <div class="intro-boss">Giám đốc: Lại Duy Chung</div>
                    <br />
                    <div class="intro-text">
                        Chúng tôi là công ty chuyên sản xuất bao bì chất lượng cao, cung cấp giải pháp đóng gói an toàn
                        và hiệu quả cho mọi loại hàng hóa.
                    </div>
                </el-col>
                <el-col :span="12" class="intro-text">
                    Công ty chúng tôi sở hữu dây chuyền sản xuất hiện đại, công nghệ tiên tiến cùng đội ngũ kỹ thuật
                    viên giàu kinh nghiệm,
                    luôn sẵn sàng đáp ứng mọi nhu cầu khắt khe của thị trường. Chúng tôi cung cấp đa dạng các loại bao
                    bì như thùng carton, bao bì nhựa, bao bì giấy, đảm bảo tính thẩm mỹ và độ bền cao.
                    <br />
                    Ngoài ra, chúng tôi cũng đặc biệt chú trọng đến việc phát triển các giải pháp bao bì thân thiện với
                    môi trường, góp phần bảo vệ hành tinh xanh.
                    Sản phẩm của chúng tôi không chỉ đáp ứng các tiêu chuẩn chất lượng quốc tế mà còn giúp khách hàng
                    quảng bá thương hiệu một cách hiệu quả thông qua dịch vụ in ấn chuyên nghiệp.
                    <br />
                    Với sứ mệnh "Bảo vệ và đồng hành cùng sản phẩm của bạn", chúng tôi cam kết mang đến cho khách hàng
                    những sản phẩm bao bì tốt nhất cùng dịch vụ hậu mãi chu đáo.
                    Hãy để chúng tôi đồng hành cùng bạn trong việc bảo vệ và nâng tầm giá trị hàng hóa của bạn.
                </el-col>
            </el-row>
            <br />
            <br />
            <br />

            <el-row justify="space-between" align="middle">
                <el-col :span="10">
                    <el-row>
                        <el-col :span="12">
                            <el-card style="border-top: 0; border-left: 0" shadow="none" class="box-card">
                                <div class="card-content">
                                    <span class="number">390k+</span>
                                    <span class="description">Khách hàng hài lòng</span>
                                </div>
                            </el-card>
                        </el-col>
                        <el-col :span="12">
                            <el-card style="border-top: 0; border-right: 0" shadow="none" class="box-card">
                                <div class="card-content">
                                    <span class="number">4+</span>
                                    <span class="description">Năm kinh nghiệm</span>
                                </div>
                            </el-card>
                        </el-col>
                        <el-col :span="12">
                            <el-card style="border-bottom: 0; border-left: 0" shadow="none" class="box-card">
                                <div class="card-content">
                                    <span class="number">6+</span>
                                    <span class="description">Sản phẩm cốt lõi</span>
                                </div>
                            </el-card>
                        </el-col>
                        <el-col :span="12">
                            <el-card style="border-bottom: 0; border-right: 0" shadow="none" class="box-card">
                                <div class="card-content">
                                    <span class="number">10+</span>
                                    <span class="description">Nhân sự cốt lõi</span>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <img style="width: 100%" src="../../assets/images/background.jpg" alt="bg" />
                </el-col>
            </el-row>
        </div>
    </div>
    <el-backtop :right="50" :bottom="100" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { loadingFullScreen } from '@/utils/loadingFullScreen'

onMounted(() => {
    loadingFullScreen()
})
</script>

<style scoped>
.about-us {
    margin: 0 auto;
}

.title-page {
    background-color: #f4ffed;
    padding: 50px 40px;
    text-align: center;
}

.content {
    width: 75%;
    margin: 0 auto;
}

.spacing {
    height: 50px;
}

.intro-title {
    font-size: 35px;
    font-weight: 800;
}

.intro-text {
    color: #687799;
    font-size: 17px;
}

.intro-boss {
    font-size: 20px;
    font-weight: 700;
    color: var(--el-color-primary);
}

.box-card {
    text-align: center;
}

.card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.number {
    font-size: 2em;
    color: #409eff;
    font-weight: bold;
}

.description {
    margin-top: 10px;
    font-size: 1.2em;
}
</style>
