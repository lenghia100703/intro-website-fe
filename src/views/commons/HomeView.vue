<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useTransition } from '@vueuse/core'
import BenefitCard from '@/components/cards/BenefitCard.vue'
import ProductCard from '@/components/cards/ProductCard.vue'
import NewsCard from '@/components/cards/NewsCard.vue'
import { loadingFullScreen } from '@/utils/loadingFullScreen'
import { useRouter } from 'vue-router'
import { PATHS } from '@/router/paths'

const source = ref(0)
const outputValue = useTransition(source, {
    duration: 1500,
})
source.value = 172000

const router = useRouter()

const handleRoute = (path: string) => {
    router.push(path)
}

const data = ref([
    {
        image: "http://127.0.0.1:3030/src/assets/images/background.jpg"
    },
    {
        image: "http://127.0.0.1:3030/src/assets/images/background.jpg"
    }
])

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
    }
])

const products = [
    {
        name: 'Thùng carton 3 lớp',
        description: 'Thùng carton 3 lớp là bao bì chắc chắn, bảo vệ hàng hóa an toàn trong vận chuyển. Sản phẩm chịu lực tốt, phù hợp cho nhiều loại hàng hóa, và dễ dàng in ấn để quảng bá thương hiệu.',
        to: 'thung-carton-3',
    },
    {
        name: 'Thùng carton 5 lớp',
        description: 'Thùng carton 3 lớp là bao bì chắc chắn, bảo vệ hàng hóa an toàn trong vận chuyển. Sản phẩm chịu lực tốt, phù hợp cho nhiều loại hàng hóa, và dễ dàng in ấn để quảng bá thương hiệu.',
        to: 'thung-carton-5',
    },
    {
        name: 'Thùng carton 3 lớp',
        description: 'Thùng carton 3 lớp là bao bì chắc chắn, bảo vệ hàng hóa an toàn trong vận chuyển. Sản phẩm chịu lực tốt, phù hợp cho nhiều loại hàng hóa, và dễ dàng in ấn để quảng bá thương hiệu.',
        to: 'thung-carton-3',
    }
]

const news = [
    {
        to: '/news/1',
        title: 'Bao jumbo quai ống: Ưu-nhược điểm',
        description: 'Bao Jumbo quai hình ống là một loại bao FIBC đặc biệt được tạo ra để giúp cho việc bốc xếp bằng xe nâng được dễ dàng hơn. Hai đai này được làm từ chính loại vải tạo nên bao jumbo nên có độ bền cơ học cao cũng như khả năng chịu tải lớn.'
    },
    {
        to: '/news/1',
        title: 'Bao jumbo quai ống: Ưu-nhược điểm',
        description: 'Bao Jumbo quai hình ống là một loại bao FIBC đặc biệt được tạo ra để giúp cho việc bốc xếp bằng xe nâng được dễ dàng hơn. Hai đai này được làm từ chính loại vải tạo nên bao jumbo nên có độ bền cơ học cao cũng như khả năng chịu tải lớn.'
    },
    {
        to: '/news/1',
        title: 'Bao jumbo quai ống: Ưu-nhược điểm',
        description: 'Bao Jumbo quai hình ống là một loại bao FIBC đặc biệt được tạo ra để giúp cho việc bốc xếp bằng xe nâng được dễ dàng hơn. Hai đai này được làm từ chính loại vải tạo nên bao jumbo nên có độ bền cơ học cao cũng như khả năng chịu tải lớn.'
    },
]

onMounted(() => {
    loadingFullScreen()
})
</script>

<template>
    <div style="margin-top: 10px">
        <el-carousel :interval='5000' trigger='click' arrow='always' height='663px'>
            <el-carousel-item style='height: 663px' v-for='item in data' :key='item'>
                <el-image :src='item.image' fit='fill' />
            </el-carousel-item>
        </el-carousel>
    </div>
    <br />
    <br />
    <div class="container">
        <div class="benefit">
            <el-row justify="space-evenly">
                <el-col :span="(24 / benefitCards.length) - 1" v-for="item in benefitCards">
                    <BenefitCard :number="item.number" :icon="item.icon" :title="item.title" :description="item.description" />
                </el-col>
            </el-row>
        </div>

        <div class="value">
            <div class="value-content">
                <el-row justify="space-evenly">
                    <el-col :span="11">
                        <div>
                            <el-button style="background-color: #fff" type="success" round plain text>Giá trị cốt lõi</el-button>
                        </div>
                        <div class="value-title">
                            Nâng tầm giá trị của khách hàng
                        </div>
                        <el-row justify="space-between" gutter="5">
                            <el-col :span="10">
                                <div class="sub-title-value">Sứ mệnh</div>
                                <div>
                                    Với sứ mệnh “Bảo vệ và đồng hành cùng sản phẩm của bạn”
                                    chúng tôi mang đến bao bì chất lượng cao, giá hợp lí
                                </div>
                            </el-col>
                            <el-col :span="10">
                                <div class="sub-title-value">Tầm nhìn</div>
                                <div>
                                    Trở thành công ty dẫn đầu trong ngành sản xuất bao bì carton tại Việt Nam,
                                    An Quý Cường không ngừng đổi mới và áp dụng công nghệ tiên tiến nhằm nâng cao chất lượng sản phẩm và dịch vụ.
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="11">
                        <div style="float: right" class="statistical">
                            <div class="number-statistical">+60</div>
                            <div class="text-statistical">tỉnh thành có mặt</div>
                        </div>
                        <div style="margin-top: 170px" class="statistical">
                            <div class="number-statistical">+10</div>
                            <div class="text-statistical">sản phẩm</div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>

        <div class="product">
            <div>
                <el-button  style="background-color: #f0f9eb; color: #67c23a" type="success" round plain>Sản phẩm tiêu biểu</el-button>
            </div>
            <br />
            <el-row justify="space-between">
                <el-col :span="11">
                    <div class="product-title">Cùng khám phá các sản phẩm của Công ty chúng tôi</div>
                </el-col>
                <el-col :span="6" style="display: flex; justify-content: flex-end; align-items: center;">
                    <el-button @click="handleRoute(PATHS.ALL_PRODUCT)" type="success" size="large" round>Xem tất cả</el-button>
                </el-col>
            </el-row>
            <br />
            <el-row justify="space-between">
                <el-col :span="7" v-for="item in products">
                    <ProductCard :title="item.name" :description="item.description" :to="item.to" />
                </el-col>
            </el-row>
        </div>

        <div class="news">
            <div>
                <el-button  style="background-color: #f0f9eb; color: #67c23a" type="success" round plain>Tin tức mới</el-button>
            </div>
            <br />
            <el-row justify="space-between">
                <el-col :span="11">
                    <div class="product-title">Theo dõi tin tức mới nhất của Công ty chúng tôi</div>
                </el-col>
                <el-col :span="6" style="display: flex; justify-content: flex-end; align-items: center;">
                    <el-button @click="handleRoute(PATHS.NEWS)" type="success" size="large" round>Xem tất cả</el-button>
                </el-col>
            </el-row>
            <br />
            <el-row justify="space-between">
                <el-col :span="7" v-for="item in news">
                    <NewsCard :title="item.title" :description="item.description" :to="item.to" />
                </el-col>
            </el-row>
        </div>
    </div>
    <el-backtop :right="50" :bottom="100" />
</template>

<style scoped>
.container {
    width: 75%;
    margin: 0 auto;
    height: auto;
    padding-bottom: 200px;
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
    height: 550px;
}

.product-title {
    font-size: 30px;
    font-weight: 800;
}

.news {
    margin-top: 100px;
}
</style>
