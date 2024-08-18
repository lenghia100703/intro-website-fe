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
        products.value = res.data.slice(0, 3)
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
<!--        <div class="benefit">-->
<!--            <el-row justify="space-between">-->
<!--                <el-col :lg='11' :md='12' :sm='12' :span="11" :xs='12' class="mobile-margin-bottom-css">-->
<!--                    <div>-->
<!--                        <el-button plain round size="large" style="background-color: #f0f9eb; color: #67c23a"-->
<!--                                   type="success">-->
<!--                            Giới thiệu-->
<!--                        </el-button>-->
<!--                    </div>-->
<!--                </el-col>-->
<!--                <el-col :lg='6' :md='12' :sm='12' :span="6" :xs='12' class="button-more-style mobile-margin-bottom-css">-->
<!--                    <el-button round size="large" type="success" @click="handleRoute(PATHS.ABOUT)">Xem thêm</el-button>-->
<!--                </el-col>-->
<!--            </el-row>-->
<!--            <br />-->
<!--            <el-row justify="space-between" align="middle">-->
<!--                <el-col :lg='14' :md='14' :sm='16' :span="10" :xs='24'>-->
<!--                    <div class="intro-title">-->
<!--                        Về chúng tôi-->
<!--                    </div>-->
<!--                    <br />-->
<!--                    <div class="intro-text">-->
<!--                        <img class="bg-img-carousel" src="../../assets/images/IMG_1.jpg" alt="image"/>-->
<!--                    </div>-->
<!--                    <div class="intro-boss">Giám đốc: Lại Duy Chung</div>-->
<!--                    <br />-->
<!--                </el-col>-->
<!--                <el-col :lg='10' :md='14' :sm='16' :span="12" :xs='24' class="intro-text">-->
<!--                    Xưởng sản xuất bao bì được thành lập từ 2019. Với quy mô đầu tư nhà máy gần 5000m2 chúng tôi tập-->
<!--                    trung vào lĩnh vực bìa carton và offset mang đến cho người tiêu dùng và các doanh nghiệp những sản-->
<!--                    phảm đóng gói phù hợp. Phương châm của công ty đưa ra:-->
<!--                    <br />-->
<!--                    <el-text size="large" tag="b" type="primary">-->
<!--                        "CHẤT LƯỢNG ỔN ĐỊNH - THIẾT KẾ ĐẸP MẮT - GIÁ THÀNH TỐT NHẤT"-->
<!--                    </el-text>.-->
<!--                </el-col>-->
<!--            </el-row>-->
<!--        </div>-->

        <div class="value">
            <div class="value-content">
<!--                <el-row>-->
<!--                    <div>-->
<!--                        <el-button plain round style="background-color: #fff" text type="success">-->
<!--                            Về chúng tôi-->
<!--                        </el-button>-->
<!--                    </div>-->
<!--                </el-row>-->
<!--                <br />-->
                <el-row justify="center">
                    <el-col :lg='11' :md='14' :sm='16' :span="12" :xs='24' class="intro-text">
                        <div class="value-title">
                            Về chúng tôi
                        </div>
                        <br />
                        <el-row gutter="5" justify="space-between" style="margin-left: 20px">
                            <el-col :span="23" class="mobile-margin-bottom-css">
                                <div class="intro-text">
                                    Xưởng sản xuất bao bì được thành lập từ 2019. Với quy mô đầu tư nhà máy gần 5000m2 chúng tôi tập
                                    trung vào lĩnh vực bìa carton và offset mang đến cho người tiêu dùng và các doanh nghiệp những sản
                                    phảm đóng gói phù hợp. Phương châm của công ty đưa ra:
                                    <br />
                                    <el-text size="large" tag="b" type="primary">
                                        "CHẤT LƯỢNG ỔN ĐỊNH - THIẾT KẾ ĐẸP MẮT - GIÁ THÀNH TỐT NHẤT"
                                    </el-text>.
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :lg='11' :md='14' :sm='16' :span="10" :xs='24' style="text-align: center">
                        <div class="intro-text">
                            <img class="bg-img-carousel" src="../../assets/images/IMG_1.jpg" alt="image"/>
                        </div>
                        <div class="intro-boss">Giám đốc: Lại Duy Chung</div>
                        <br />
                    </el-col>
                </el-row>
            </div>
        </div>

        <div class="value">
            <div class="value-content">
<!--                <el-row>-->
<!--                    <div>-->
<!--                        <el-button plain round style="background-color: #fff" text type="success">-->
<!--                            Giá trị cốt lõi-->
<!--                        </el-button>-->
<!--                    </div>-->
<!--                </el-row>-->
<!--                <br />-->
                <el-row justify="space-evenly">
                    <el-col :lg='13' :md='12' :sm='12' :span="11" :xs='24'
                            style="display: flex; align-items: center; justify-content: center">
                        <div class="border-image">
                            <img alt="background" class="bg-img" src='../../assets/images/IMG_6.jpg' />
                        </div>
                    </el-col>
                    <el-col :lg='11' :md='12' :sm='12' :span="11" :xs='24' style="text-align: center">
                        <div class="value-title">
                            Sứ mệnh và Tầm nhìn
                        </div>
                        <br />
                        <el-row gutter="5" justify="space-between" style="text-align: left">
                            <el-col :span="23" class="mobile-margin-bottom-css">
                                <div class="intro-text">
                                    Với sứ mệnh
                                    <el-text tag="b" style="font-size: 18px; color: #333333">
                                        “Bảo vệ và đồng hành cùng sản phẩm của bạn”
                                    </el-text>
                                    chúng tôi mang đến bao bì chất lượng cao, giá hợp lí. An Quý Cường
                                    không ngừng đổi mới và áp dụng công nghệ tiên tiến nhằm nâng cao chất
                                    lượng sản phẩm và dịch vụ, trở thành công ty dẫn đầu trong ngành sản xuất bao bì
                                    carton tại Việt Nam.
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
        </div>

        <div class="product">
            <el-row justify="space-between">
                <el-col :lg='11' :md='12' :sm='12' :span="11" :xs='12' class="mobile-margin-bottom-css">
                    <div class="mobile-center-css">
                        <el-button plain round size="large" style="background-color: #f0f9eb; color: #539f2f; font-size: 16px"
                                   type="success">
                            Sản phẩm
                        </el-button>
                    </div>
                </el-col>
                <el-col :lg='6' :md='12' :sm='12' :span="6" :xs='12' class="button-more-style mobile-margin-bottom-css">
                    <el-button round size="large" type="success" @click="handleRoute(PATHS.ALL_PRODUCT)">
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

        <div class="news">
            <el-row justify="space-between">
                <el-col :lg='11' :md='12' :sm='12' :span="11" :xs='12' class="mobile-margin-bottom-css">
                    <div class="mobile-center-css">
                        <el-button plain round size="large" style="background-color: #f0f9eb; color: #539f2f; font-size: 16px"
                                   type="success">
                            Tin tức mới
                        </el-button>
                    </div>
                </el-col>
                <el-col :lg='6' :md='12' :sm='12' :span="6" :xs='12' class="button-more-style mobile-margin-bottom-css">
                    <el-button round size="large" type="success" @click="handleRoute(PATHS.NEWS)">Xem tất cả</el-button>
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
    margin-top: 100px;
    border-radius: 50px;
    background-color: var(--el-bg-color-default);
    padding: 80px 40px;
}

.value-title {
    font-size: 35px;
    font-weight: 800;
    text-align: center;
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

.product-title {
    font-size: 30px;
    font-weight: 800;
}

.news {
    margin-top: 100px;
}

.bg-img-carousel {
    width: 70%;
    border-radius: 16px;
}

.bg-img {
    width: 100%;
    border-radius: 16px;
}

.intro-title {
    font-size: 35px;
    font-weight: 800;
}

.intro-text {
    font-size: 18px;
}

.intro-boss {
    font-size: 20px;
    font-weight: 700;
    color: #333333;
}

.border-image {
    border-radius: 20px;
    width: 70%;
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
        font-size: 32px;
    }

    .intro-title {
        font-size: 30px;
    }

    .product-title {
        font-size: 25px;
        text-align: center;
    }

    .value {
        padding: 60px 30px;
    }

    .value-title {
        text-align: center;
    }

    .border-image {
        width: 100%;
    }
}
</style>
