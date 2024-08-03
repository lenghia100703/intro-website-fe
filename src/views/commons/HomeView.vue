<script setup lang="ts">

import { onMounted, ref } from 'vue'
import BenefitCard from '@/components/cards/BenefitCard.vue'
import ProductCard from '@/components/cards/ProductCard.vue'
import NewsCard from '@/components/cards/NewsCard.vue'
import { loadingFullScreen } from '@/utils/loadingFullScreen'
import { useRouter } from 'vue-router'
import { PATHS } from '@/router/paths'
import { getProductByPage } from '@/services/product'
import { getNewsByPage } from '@/services/news'
import { convertDateTime } from '@/helpers/convertDateTime'

const router = useRouter()

const handleRoute = (path: string) => {
    router.push(path)
}

const benefitCards = ref([
    {
        number: '01',
        icon: 'fa-solid fa-piggy-bank',
        title: 'Giá cả cạnh tranh',
        description: 'Chúng tôi cam kết cung cấp sản phẩm và dịch vụ với mức giá hấp dẫn, đảm bảo khách hàng nhận được giá trị tốt nhất so với chi phí bỏ ra.\n' +
            '            Bằng việc liên tục nghiên cứu thị trường và tối ưu hóa quy trình sản xuất, chúng tôi không chỉ mang lại giá cả hợp lý mà còn duy trì chất lượng vượt trội, giúp khách hàng yên tâm và tin tưởng khi lựa chọn chúng tôi.',
    },
    {
        number: '02',
        icon: 'fa-solid fa-user-tie',
        title: 'Thiết kế chuyên nghiệp',
        description: 'Chúng tôi luôn chú trọng đến từng chi tiết, từ khâu lên ý tưởng đến triển khai, nhằm mang lại những sản phẩm và dịch vụ không chỉ đẹp mắt mà còn tối ưu về tính năng và trải nghiệm người dùng. Đội ngũ thiết kế của chúng tôi là những chuyên gia giàu kinh nghiệm, sáng tạo và tận tâm, luôn cập nhật những xu hướng mới nhất để mang đến những giải pháp thiết kế hiện đại và hiệu quả nhất cho khách hàng.',
    },
    {
        number: '03',
        icon: 'fa-solid fa-up-right-and-down-left-from-center',
        title: 'Giải pháp ở mọi quy mô',
        description: 'Dù bạn là doanh nghiệp nhỏ, vừa hay lớn, chúng tôi đều có các dịch vụ và sản phẩm được thiết kế để đáp ứng nhu cầu cụ thể của bạn. Với sự linh hoạt và chuyên nghiệp, chúng tôi đảm bảo rằng mọi khách hàng đều nhận được giá trị tối ưu và sự hỗ trợ tốt nhất, giúp bạn phát triển bền vững và thành công trên thị trường.',
    },
])

const products = ref<any[]>([])
const news = ref<any[]>([])

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

onMounted(async () => {
    loadingFullScreen()
    await loadProductData(1)
    await loadNewsData(1)
})
</script>

<template>
    <div style="margin-top: 10px; text-align: center">
        <img src='../../../src/assets/images/background.jpg' class="bg-img" alt="background" />
    </div>
    <br />
    <br />
    <div class="container">
        <div class="benefit">
            <el-row justify="center" :gutter="30">
                <el-col style="margin-bottom: 30px" :xs='24' :sm='12' :md='12' :lg='7' v-for="item in benefitCards">
                    <BenefitCard :number="item.number" :icon="item.icon" :title="item.title"
                                 :description="item.description" />
                </el-col>
            </el-row>
        </div>

        <div class="value">
            <div class="value-content">
                <el-row justify="space-evenly">
                    <el-col :xs='24' :sm='12' :md='12' :lg='11' :span="11">
                        <div>
                            <el-button style="background-color: #fff" type="success" round plain text>Giá trị cốt lõi
                            </el-button>
                        </div>
                        <div class="value-title">
                            Nâng tầm giá trị của khách hàng
                        </div>
                        <el-row justify="space-between" gutter="5">
                            <el-col class="mobile-margin-bottom-css" :xs='24' :sm='12' :md='12' :lg='11' :span="11">
                                <div class="sub-title-value">Sứ mệnh</div>
                                <div>
                                    Với sứ mệnh “Bảo vệ và đồng hành cùng sản phẩm của bạn”
                                    chúng tôi mang đến bao bì chất lượng cao, giá hợp lí
                                </div>
                            </el-col>
                            <el-col class="mobile-margin-bottom-css" :xs='24' :sm='12' :md='12' :lg='11' :span="11">
                                <div class="sub-title-value">Tầm nhìn</div>
                                <div>
                                    Trở thành công ty dẫn đầu trong ngành sản xuất bao bì carton tại Việt Nam,
                                    An Quý Cường không ngừng đổi mới và áp dụng công nghệ tiên tiến nhằm nâng cao chất
                                    lượng sản phẩm và dịch vụ.
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs='24' :sm='12' :md='12' :lg='11' :span="11">
                        <div style="float: right" class="statistical">
                            <div class="number-statistical">15+</div>
                            <div class="text-statistical">năm kinh nghiệm</div>
                        </div>
                        <div style="margin-top: 170px" class="statistical">
                            <div class="number-statistical">4+</div>
                            <div class="text-statistical">sản phẩm</div>
                        </div>
                        <div style="float: right" class="statistical">
                            <div class="number-statistical">20+</div>
                            <div class="text-statistical">nhân sự cốt lõi</div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>

        <div class="product">
            <div class="mobile-center-css">
                <el-button style="background-color: #f0f9eb; color: #67c23a" type="success" round plain>
                    Sản phẩm tiêu biểu
                </el-button>
            </div>
            <br />
            <el-row justify="space-between">
                <el-col class="mobile-margin-bottom-css" :xs='24' :sm='12' :md='12' :lg='11' :span="11">
                    <div class="product-title">Cùng khám phá các sản phẩm của Công ty chúng tôi</div>
                </el-col>
                <el-col :xs='24' :sm='12' :md='12' :lg='6' :span="6" class="button-more-style">
                    <el-button @click="handleRoute(PATHS.ALL_PRODUCT)" type="success" size="large" round>
                        Xem tất cả
                    </el-button>
                </el-col>
            </el-row>
            <br />
            <el-row justify="space-between">
                <el-col :xs='24' :sm='12' :md='12' :lg='7' :span="7" v-for="item in products" v-if="products.length > 0">
                    <ProductCard :img="item.image" :title="item.name" :description="item.description"
                                 :to='"/detail-product/" + item.id' />
                </el-col>
                <el-col style="text-align: center" v-else>
                    <div style="font-size: 20px; font-weight: 700; margin-top: 50px">Chưa có sản phẩm nào!</div>
                </el-col>
            </el-row>
        </div>

        <div class="news">
            <div class="mobile-center-css">
                <el-button style="background-color: #f0f9eb; color: #67c23a" type="success" round plain>
                    Tin tức mới
                </el-button>
            </div>
            <br />
            <el-row justify="space-between">
                <el-col class="mobile-margin-bottom-css" :xs='24' :sm='12' :md='12' :lg='11' :span="11">
                    <div class="product-title">Theo dõi tin tức mới nhất của Công ty chúng tôi</div>
                </el-col>
                <el-col :xs='24' :sm='12' :md='12' :lg='6' :span="6" class="button-more-style">
                    <el-button @click="handleRoute(PATHS.NEWS)" type="success" size="large" round>Xem tất cả</el-button>
                </el-col>
            </el-row>
            <br />
            <el-row gutter="20">
                <el-col :xs='24' :sm='12' :md='12' :lg='8' :span="8" style="margin-bottom: 20px" v-for="item in news" v-if="news.length > 0">
                    <NewsCard :img="item.image" :title="item.title" :description="item.description"
                              :to='"/detail-news/" + item.id' :createdAt="convertDateTime(item.createdAt)" />
                </el-col>
                <el-col style="text-align: center" v-else>
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
    padding-bottom: 200px;
}

.custom-carousel {
    height: 663px;
}

.value {
    margin-top: 100px;
    border-radius: 50px;
    background-color: #f4ffed;
    padding: 80px 40px;
}

.value-title {
    font-size: 45px;
    font-weight: 800;
}

.button-more-style {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.sub-title-value {
    font-size: 22px;
    font-weight: 700;
}

.statistical {
    text-align: center;
    width: 100px;
    padding: 25px 20px 25px 20px;
    background-color: #FFFFFF;
    border-radius: 30px 30px 30px 30px;
}

.number-statistical {
    font-size: 35px;
    font-weight: 700;
}

.text-statistical {
    font-size: 18px;
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
}
</style>
