<script setup lang='ts'>

import FAIcon from '@/components/commons/FAIcon.vue'
</script>

<template>
    <div class='main-footer'>
        <div class='container-footer'>
            <el-row>
                <el-col :span='24'>
                    <p class='title'>VỀ CHÚNG TÔI</p>
                    <p>
                        Chúng tôi là công ty chuyên sản xuất bao bì chất lượng cao, cung cấp giải pháp đóng gói an toàn
                        và hiệu quả cho mọi loại hàng hóa. Với công nghệ hiện đại và đội ngũ chuyên nghiệp,
                        chúng tôi cam kết mang đến sản phẩm vượt trội và dịch vụ tận tâm.
                    </p>
                </el-col>
                <el-col :span='24'>
                    <p class='title'>CÔNG TY CỔ PHẦN ĐẦU TƯ VÀ THƯƠNG MẠI AN QUÝ CƯỜNG</p>
                    <el-row :gutter='12'>
                        <el-col :span='24' style="margin-bottom: 12px">
                            <p class='info'>
                                ĐỊA CHỈ
                                <span>
                                    Số 73, Đại lộ Thịnh Lang, Phường Thịnh Lang, TP.Hòa Bình, Tỉnh Hòa Bình
                                </span>
                            </p>
                        </el-col>
                        <el-col :span='24'>
                            <p class='info'>
                                HOTLINE
                                <span style="color: var(--el-color-primary)">
                                    084 688 1815 – 091 394 5746
                                </span>
                            </p>
                            <p class='info'>
                                EMAIL
                                <span style="color: var(--el-color-primary)">
                                    <el-link type="primary" href="mailto:baobianquycuong@gmail.com">
                                        baobianquycuong@gmail.com
                                    </el-link>
                                </span>
                            </p>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>

        <div class='copyright'>
            <div class='container-copyright'>
                <el-button circle>
                    <el-link href="https://www.facebook.com/profile.php?id=61563084612410" target="_blank"
                             :underline="false">
                        <FAIcon class='icon' style="font-size: 24px" icon='fa-brands fa-facebook' color="blue" />
                    </el-link>
                </el-button>
                <el-button circle>
                    <el-link href="mailto:baobianquycuong@gmail.com"
                             :underline="false">
                        <FAIcon class='icon' size='large' icon='fa-regular fa-envelope' color="red" />
                    </el-link>
                </el-button>
                <el-button circle>
                    <el-link href="https://zalo.me/0846881815" target="_blank"
                             :underline="false">
                        <img style="width: 24px" src="../../assets/images/zalo-icon.svg" alt="icon-zalo" />
                    </el-link>
                </el-button>
            </div>
        </div>
        <el-divider class="container-footer" />
        <div style="text-align: center">
            <img style="width: 100px" src="../../assets/images/logo_circle.png" alt="icon-zalo" />
        </div>
        <div style="width: 95%; margin: 0 auto; text-align: center; font-size: 17px; font-weight: 600">
            Copyright © 2024 Công ty Cổ phần Đầu tư và Thương mại An Quý Cường
        </div>
    </div>

</template>

<style scoped>
.main-footer {
    background-color: var(--el-bg-color-default);
    background-repeat: no-repeat;
    background-size: cover;
    padding: 30px 0 24px;
    height: auto;
    margin-top: 50px;
}

.container-footer {
    width: 85%;
    margin-left: auto;
    margin-right: auto;
}

.container-copyright {
    width: 75%;
    margin-left: auto;
    margin-right: auto;
}

.title {
    font-size: 22px;
    font-weight: bold;
}

.info {
    font-size: 13px;
    position: relative;
    font-weight: 600;
}

.info span {
    position: absolute;
    left: 76px;
}

.copyright {
    text-align: center;
    padding: 10px 0;
    width: 100%;
}

</style>