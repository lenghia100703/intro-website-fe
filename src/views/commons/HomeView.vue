<script lang="ts" setup>

import { onMounted, onUnmounted, ref } from 'vue'
import ProductCard from '@/components/cards/ProductCard.vue'
import NewsCard from '@/components/cards/NewsCard.vue'
import { loadingFullScreen } from '@/utils/loadingFullScreen'
import { useRouter } from 'vue-router'
import { PATHS } from '@/router/paths'
import { getProductByPage } from '@/services/product'
import { getNewsByPage } from '@/services/news'
import { convertDateTime } from '@/helpers/convertDateTime'
import img1 from '../../assets/images/IMG_1.jpg'
import img2 from '../../assets/images/IMG_2.jpg'
import img3 from '../../assets/images/IMG_3.jpg'
import img4 from '../../assets/images/IMG_4.jpg'
import img5 from '../../assets/images/IMG_5.jpg'
import img6 from '../../assets/images/IMG_6.jpg'
import img7 from '../../assets/images/IMG_7.jpg'
import img8 from '../../assets/images/IMG_8.jpg'
import img9 from '../../assets/images/IMG_9.jpg'

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9]

const router = useRouter()

const handleRoute = (path: string) => {
    router.push(path)
}

const products = ref<any[]>([])
const news = ref<any[]>([])

const isMobile = ref(window.innerWidth <= 767)

const loadProductData = async (page: any) => {
    try {
        const res = await getProductByPage(page)
        products.value = res.data
    } catch (e) {
        console.log(e)
    }
}

const loadNewsData = async (page: any) => {
    try {
        const res = await getNewsByPage(page)
        news.value = res.data.slice(0, 3)
    } catch (e) {
        console.log(e)
    }
}

const updateIsMobile = () => {
    isMobile.value = window.innerWidth <= 767
}

onMounted(async () => {
    loadingFullScreen()
    await loadProductData(1)
    await loadNewsData(1)
    window.addEventListener('resize', updateIsMobile)
})

onUnmounted(() => {
    window.removeEventListener('resize', updateIsMobile)
})
</script>

<template>
    <el-row justify="space-between" class="carousel-title">
        <el-col :lg='11' :md='12' :sm='12' :span="11" :xs='12' class="mobile-margin-bottom-css">
            <div>
                <el-button plain round size="large" style="background-color: #f0f9eb; color: #539f2f; font-size: 16px"
                           type="success">
                    Hình ảnh sản xuất
                </el-button>
            </div>
        </el-col>
        <el-col :lg='11' :md='12' :sm='12' :span="11" :xs='12' class="mobile-margin-bottom-css">
        </el-col>
    </el-row>
    <div class="carousel">
        <el-carousel :indicator-position='isMobile ? "none" : ""' :type='isMobile ? "" : "card"' arrow="always"
                     height="auto">
            <el-carousel-item v-for="(image, index) in images" :key="index" style="height: auto">
                <img :src="image" alt="background" class="bg-img-carousel" />
            </el-carousel-item>
        </el-carousel>
    </div>
    <br />
    <br />
    <div class="container">
        <div class="product">
            <el-row justify="space-between">
                <el-col :lg='11' :md='12' :sm='12' :span="11" :xs='12' class="mobile-margin-bottom-css">
                    <div class="mobile-center-css">
                        <el-button plain round size="large"
                                   style="background-color: #f0f9eb; color: #539f2f; font-size: 16px"
                                   type="success">
                            Sản phẩm
                        </el-button>
                    </div>
                </el-col>
                <el-col :lg='6' :md='12' :sm='12' :span="6" :xs='12' class="button-more-style mobile-margin-bottom-css">
                    <el-button class="btn-more" round size="large" type="success" @click="handleRoute(PATHS.ALL_PRODUCT)">
                        Xem tất cả
                    </el-button>
                </el-col>
            </el-row>
            <br />
            <el-row justify="space-between">
                <el-col v-for="item in products" v-if="products.length > 0" :lg='7' :md='12' :sm='12' :span="7"
                        :xs='24'>
                    <ProductCard :description="item.description" :img="item.image" :title="item.name"
                                 :to='"/detail-product/" + item.id' />
                </el-col>
                <el-col v-else style="text-align: center">
                    <div style="font-size: 20px; font-weight: 700; margin-top: 50px">Chưa có sản phẩm nào!</div>
                </el-col>
            </el-row>
        </div>
        <div class="value">
            <div class="value-content">
                <el-row justify="center">
                    <el-col :lg='24' :md='14' :sm='16' :span="12" :xs='24' class="intro-text">
                        <div class="value-title" style="font-size: 45px">
                            Về chúng tôi
                        </div>
                        <br />
                        <el-row gutter="5" justify="space-between">
                            <el-col :span="24" class="mobile-margin-bottom-css">
                                <div style="text-align: center;">
                                    <el-text style="font-size: 26px; color: black; font-weight: 800" size="large" tag="b">
                                        XƯỞNG SẢN XUẤT BAO BÌ AN QUÝ CƯỜNG
                                    </el-text>
                                </div>
                                <br />
                                <div class="intro-text">
                                    <div>
                                        được thành lập từ 2019, quy mô đầu tư nhà máy gần 5000m2 và các trang thiết bị hiện
                                        đại, chúng tôi tập trung vào lĩnh vực về giấy như thùng giấy carton, thùng giấy
                                        offset mang đến cho người tiêu dùng và các doanh nghiệp những sản phảm đóng gói phù
                                        hợp.
                                    </div>
                                    <br />
                                    <div style="text-align: center">
                                        <el-text style="font-size: 24px; font-weight: 800" size="large" tag="b" type="success">CÔNG TY ĐẦU TƯ VÀ THƯƠNG MẠI AN QUÝ
                                            CƯỜNG
                                        </el-text>
                                    </div>
                                    đưa ra phương châm cốt lõi cho sản phẩm là
                                    <br />
                                    <div style="text-align: center">
                                        <el-text style="font-size: 20px; font-weight: 800" size="large" tag="b" type="primary">
                                            "CHẤT LƯỢNG ỔN ĐỊNH - THIẾT KẾ ĐẸP MẮT - GIÁ THÀNH TỐT NHẤT".
                                        </el-text>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <br />
                <br />
                <el-row align="middle" justify="space-between">
                    <el-col :lg='11' :md='12' :sm='12' :span="11" :xs='24' style="text-align: center">
                        <div class="value-title">
                            Sứ mệnh và Tầm nhìn
                        </div>
                        <br />
                        <el-row gutter="5" justify="space-between" style="text-align: left">
                            <el-col :span="24" class="mobile-margin-bottom-css">
                                <div class="intro-text">
                                    Với sứ mệnh
                                    <el-text tag="b" style="font-size: 18px; color: #333333">
                                        “Bảo vệ và đồng hành cùng sản phẩm của bạn”
                                    </el-text>
                                    chúng tôi mang đến bao bì chất lượng cao, giá hợp lí.
                                    <el-text style="font-size: 18px" type="success" tag="b">An Qúy Cường</el-text>
                                    không ngừng đổi mới và áp dụng công nghệ tiên tiến nhằm nâng cao chất
                                    lượng sản phẩm và dịch vụ, trở thành công ty dẫn đầu trong ngành sản xuất bao bì
                                    carton tại Việt Nam.
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :lg='12' :md='12' :sm='12' :span="11" :xs='24' class="img-sm">
                        <div class="border-image" style="width: 90%">
                            <img alt="background" class="bg-img" src='../../assets/images/IMG_6.jpg' />
                        </div>
                    </el-col>

                </el-row>
            </div>
        </div>
        <div class="news">
            <el-row justify="space-between">
                <el-col :lg='11' :md='12' :sm='12' :span="11" :xs='12' class="mobile-margin-bottom-css">
                    <div class="mobile-center-css">
                        <el-button plain round size="large"
                                   style="background-color: #f0f9eb; color: #539f2f; font-size: 16px"
                                   type="success">
                            Tin tức mới
                        </el-button>
                    </div>
                </el-col>
                <el-col :lg='6' :md='12' :sm='12' :span="6" :xs='12' class="button-more-style mobile-margin-bottom-css">
                    <el-button class="btn-more" round size="large" type="success" @click="handleRoute(PATHS.NEWS)">Xem tất cả</el-button>
                </el-col>
            </el-row>
            <br />
            <el-row gutter="20">
                <el-col v-for="item in news" v-if="news.length > 0" :lg='8' :md='12' :sm='12' :span="8" :xs='24'
                        style="margin-bottom: 20px">
                    <NewsCard :createdAt="convertDateTime(item.createdAt)" :description="item.description"
                              :img="item.image"
                              :title="item.title" :to='"/detail-news/" + item.id' />
                </el-col>
                <el-col v-else style="text-align: center">
                    <div style="font-size: 20px; font-weight: 700; margin-top: 50px">Chưa có tin tức nào!</div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 75%;
    margin: 0 auto;
    height: auto;
    padding-bottom: 100px;
}

.carousel-title {
    width: 75%;
    margin: 30px auto 10px;
}

.carousel {
    text-align: center;
}

.value {
    border-radius: 50px;
    padding: 80px 50px;
}

.value-title {
    font-size: 35px;
    font-weight: 800;
    text-align: center;
    color: var(--el-color-danger);
}

.button-more-style {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.product {
    margin-top: 100px;
    height: auto;
}

.news {
    margin-top: 100px;
}

.bg-img-carousel {
    width: 85%;
    border-radius: 16px;
}

.bg-img {
    width: 100%;
    border-radius: 16px;
}

.intro-text {
    font-size: 18px;
    margin: 0 auto;
    display: block;
    max-width: fit-content;
}

.btn-more:hover {
    margin-top: -3px;
}

.border-image {
    border-radius: 20px;
    width: 70%;
}

.img-sm {
    display: flex;
    justify-content: right;
}

@media only screen and (max-width: 883px) {
    .container {
        width: 85%;
    }
}

@media only screen and (max-width: 767px) {
    .mobile-margin-bottom-css {
        margin-bottom: 30px;
    }

    .carousel-title {
        width: 85%;
    }

    .bg-img-carousel {
        width: 100%;
        height: auto;
    }

    .value-title {
        font-size: 32px !important;
    }

    .value {
        padding: 60px 0;
    }

    .value-title {
        text-align: center;
    }

    .border-image {
        width: 100%;
    }

    .img-sm {
        justify-content: center;
    }
}
</style>
