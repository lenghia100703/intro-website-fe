<script setup lang='ts'>

import FAIcon from '@/components/commons/FAIcon.vue'
</script>

<template>
    <div class='main-footer'>
        <div class='container-footer'>
            <el-row>
                <el-col :span='14'>
                    <p class='title'>CÔNG TY CỔ PHẦN ĐẦU TƯ VÀ THƯƠNG MẠI AN QUÝ CƯỜNG</p>
                    <el-row :gutter='12'>
                        <el-col :span='12'>
                            <p class='info'>
                                ĐỊA CHỈ
                                <span>
                                    Số 73, Đại lộ Thịnh Lang, Phường Thịnh Lang, TP.Hòa Bình, Tỉnh Hòa Bình
                                </span>
                            </p>
                        </el-col>
                        <el-col :span='12'>
                            <p class='info'>
                                HOTLINE
                                <span style="color: var(--el-color-primary)">
                                    084 688 1815 – 091 394 5746
                                </span>
                            </p>
                            <p class='info'>
                                EMAIL
                                <span style="color: var(--el-color-primary)">
                                    baobianquycuong@gmail.com
                                </span>
                            </p>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span='2'></el-col>
                <el-col :span='8'>
                    <p class='title'>VỀ CHÚNG TÔI</p>
                    <p>
                        Chúng tôi là công ty chuyên sản xuất bao bì chất lượng cao, cung cấp giải pháp đóng gói an toàn và hiệu quả cho mọi loại hàng hóa. Với công nghệ hiện đại và đội ngũ chuyên nghiệp,
                        chúng tôi cam kết mang đến sản phẩm vượt trội và dịch vụ tận tâm.
                    </p>
                </el-col>
            </el-row>
        </div>

        <div class='copyright'>
            <div class='container-copyright'>
                <el-button circle>
                    <FAIcon class='icon' size="large" icon='fa-brands fa-facebook' color="blue" />
                </el-button>
                <el-button circle>
                    <FAIcon class='icon' size='large' icon='fa-brands fa-youtube' color="red"  />
                </el-button>
                <el-button circle>
                    <img style="width: 24px" src="../../assets/images/zalo-icon.svg" alt="icon-zalo" />
                </el-button>
            </div>
        </div>
        <el-divider class="container-footer" />
        <div style="text-align: center">
            <img style="width: 100px" src="../../assets/images/logo.jpg" alt="icon-zalo" />
        </div>
        <div style="text-align: center; font-size: 17px; font-weight: 600">
            Copyright © 2024 Công ty Cổ phần Đầu tư và Thương mại An Quý Cường
        </div>
    </div>

</template>

<style scoped>
.main-footer {
    background-color: #f4ffed;
    background-repeat: no-repeat;
    background-size: cover;
    padding: 30px 0 24px;
    height: auto;
    margin-top: 50px;
}

.container-footer {
    width: 75%;
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

.tel {
    top: 34px;
}

.image {
    width: 70%;
}

.copyright {
    text-align: center;
    padding: 10px 0;
    width: 100%;
}

</style>