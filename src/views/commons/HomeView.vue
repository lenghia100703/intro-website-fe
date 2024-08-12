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
    <div style="margin-top: 10px; text-align: center">
        <el-carousel :indicator-position='isMobile ? "none" : ""' :type='isMobile ? "" : "card"' arrow="always"
                     height="auto">
            <el-carousel-item v-for="(image, index) in images" :key="index" style="height: auto">
                <img :src="image" alt="background" class="bg-img" />
            </el-carousel-item>
        </el-carousel>
    </div>
    <br />
    <br />
    <div class="container">
        <div class="benefit">
            <!--            <el-row justify="center" :gutter="30">-->
            <!--                <el-col style="margin-bottom: 30px" :span="24" v-for="(item, index) in benefitCards" :key="index">-->
            <!--                    <BenefitCard-->
            <!--                        :number="item.number"-->
            <!--                        :icon="item.icon"-->
            <!--                        :title="item.title"-->
            <!--                        :description="item.description"-->
            <!--                        :style="{ float: (index % 2 === 1) ? 'right' : 'none' }"-->
            <!--                    />-->
            <!--                </el-col>-->
            <!--            </el-row>-->
            <div class="hidden-md-and-up">
                <el-button plain round size="large" style="background-color: #f0f9eb; color: #67c23a" type="success">
                    Giới thiệu
                </el-button>
            </div>
            <br />
            <el-row justify="space-between">
                <el-col :lg='11' :md='12' :sm='12' :span="11" :xs='24' class="mobile-margin-bottom-css">
                    <div class="product-title hidden-md-and-up">Cùng tìm hiểu về công ty chúng tôi</div>
                    <div class="hidden-sm-and-down">
                        <el-button plain round size="large" style="background-color: #f0f9eb; color: #67c23a"
                                   type="success">
                            Giới thiệu
                        </el-button>
                    </div>
                </el-col>
                <el-col :lg='6' :md='12' :sm='12' :span="6" :xs='24' class="button-more-style">
                    <el-button round size="large" type="success" @click="handleRoute(PATHS.ABOUT)">Xem thêm</el-button>
                </el-col>
            </el-row>
            <br />
            <el-row justify="space-between">
                <el-col :lg='10' :md='14' :sm='16' :span="10" :xs='24'>
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
                <el-col :lg='12' :md='14' :sm='16' :span="12" :xs='24' class="intro-text">
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
        </div>

        <div class="value">
            <div class="value-content">
                <el-row justify="space-evenly">
                    <el-col :lg='11' :md='12' :sm='12' :span="11" :xs='24'>
                        <div>
                            <el-button plain round style="background-color: #fff" text type="success">Giá trị cốt lõi
                            </el-button>
                        </div>
                        <div class="value-title">
                            Sứ mệnh và Tầm nhìn
                        </div>
                        <br />
                        <el-row gutter="5" justify="space-between">
                            <el-col :span="23" class="mobile-margin-bottom-css">
                                <div>
                                    Với sứ mệnh “Bảo vệ và đồng hành cùng sản phẩm của bạn”
                                    chúng tôi mang đến bao bì chất lượng cao, giá hợp lí. An Quý Cường
                                    không ngừng đổi mới và áp dụng công nghệ tiên tiến nhằm nâng cao chất
                                    lượng sản phẩm và dịch vụ, trở thành công ty dẫn đầu trong ngành sản xuất bao bì
                                    carton tại Việt Nam.
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :lg='13' :md='12' :sm='12' :span="11" :xs='24'
                            style="display: flex; align-items: center; justify-content: right">
                        <img alt="background" class="bg-img" src='../../assets/images/IMG_6.jpg' />
                    </el-col>
                </el-row>
            </div>
        </div>

        <div class="product">
            <div class="mobile-center-css hidden-md-and-up">
                <el-button plain round size="large" style="background-color: #f0f9eb; color: #67c23a" type="success">
                    Sản phẩm tiêu biểu
                </el-button>
            </div>
            <br />
            <el-row justify="space-between">
                <el-col :lg='11' :md='12' :sm='12' :span="11" :xs='24' class="mobile-margin-bottom-css">
                    <div class="product-title hidden-md-and-up">Cùng khám phá các sản phẩm của công ty</div>
                    <div class="mobile-center-css hidden-sm-and-down">
                        <el-button plain round size="large" style="background-color: #f0f9eb; color: #67c23a"
                                   type="success">
                            Sản phẩm tiêu biểu
                        </el-button>
                    </div>
                </el-col>
                <el-col :lg='6' :md='12' :sm='12' :span="6" :xs='24' class="button-more-style">
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
            <div class="mobile-center-css hidden-md-and-up">
                <el-button plain round size="large" style="background-color: #f0f9eb; color: #67c23a" type="success">
                    Tin tức mới
                </el-button>
            </div>
            <br />
            <el-row justify="space-between">
                <el-col :lg='11' :md='12' :sm='12' :span="11" :xs='24' class="mobile-margin-bottom-css">
                    <div class="product-title hidden-md-and-up">Theo dõi tin tức mới nhất của công ty</div>
                    <div class="mobile-center-css hidden-sm-and-down">
                        <el-button plain round size="large" style="background-color: #f0f9eb; color: #67c23a"
                                   type="success">
                            Tin tức mới
                        </el-button>
                    </div>
                </el-col>
                <el-col :lg='6' :md='12' :sm='12' :span="6" :xs='24' class="button-more-style">
                    <el-button round size="large" type="success" @click="handleRoute(PATHS.NEWS)">Xem tất cả</el-button>
                </el-col>
            </el-row>
            <br />
            <el-row gutter="20">
                <el-col v-for="item in news" v-if="news.length > 0" :lg='8' :md='12' :sm='12' :span="8" :xs='24'
                        style="margin-bottom: 20px">
                    <NewsCard :createdAt="convertDateTime(item.createdAt)" :description="item.description" :img="item.image"
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

.value {
    margin-top: 100px;
    border-radius: 50px;
    background-color: var(--el-bg-color-default);
    padding: 80px 40px;
}

.value-title {
    font-size: 35px;
    font-weight: 800;
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

.bg-img {
    width: 70%;
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


@media only screen and (max-width: 883px) {
    .container {
        width: 85%;
    }
}

@media only screen and (max-width: 767px) {
    .mobile-margin-bottom-css {
        margin-bottom: 30px;
    }

    .button-more-style {
        justify-content: center;
    }

    .bg-img {
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
}
</style>
