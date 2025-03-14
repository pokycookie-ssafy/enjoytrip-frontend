<script setup lang="ts">
import { api } from '@/axios.config'
import Button from '@/components/ui/Button.vue'
import Dropdown from '@/components/ui/Dropdown.vue'
import Input, { type IInputInfo } from '@/components/ui/Input.vue'
import { useToastStore } from '@/stores/toast'
import type { IResponse } from '@/types/Response'
import { getLastDate, getLastYear } from '@/utils/calendar'
import { telDecoder, telIncoder, telRool } from '@/utils/telInput'
import { validateBlank, validatePassword } from '@/utils/validator'
import { onMounted, ref, watch } from 'vue'

const emits = defineEmits<{
  (e: 'onNext'): void
}>()

const { addToast } = useToastStore()

const name = ref('')
const nickname = ref('')
const email = ref('')
const password = ref('')
const passwordCheck = ref('')
const phone = ref('')

const nameInfo = ref<IInputInfo | null>(null)
const nicknameInfo = ref<IInputInfo | null>(null)
const emailInfo = ref<IInputInfo | null>(null)
const passwordInfo = ref<IInputInfo | null>(null)
const passwordCheckInfo = ref<IInputInfo | null>(null)
const phoneInfo = ref<IInputInfo | null>(null)

const yearArr = ref<number[]>([])
const monthArr = ref<number[]>([])
const dateArr = ref<number[]>([])

const birthYear = ref<number | null>(null)
const birthMonth = ref<number | null>(null)
const birthDate = ref<number | null>(null)

const gender = ref<string | null>(null)
const agency = ref<string | null>(null)

const submitHandler = async () => {
  nameInfo.value = null
  nicknameInfo.value = null
  emailInfo.value = null
  passwordInfo.value = null
  passwordCheckInfo.value = null
  phoneInfo.value = null

  if (!validateBlank(email.value)) {
    emailInfo.value = {
      message: '이메일을 입력해주세요',
      status: 'danger',
    }
    return
  }

  if (!validateBlank(password.value)) {
    passwordInfo.value = {
      message: '비밀번호를 입력해주세요',
      status: 'danger',
    }
    return
  }

  if (!validateBlank(passwordCheck.value)) {
    passwordCheckInfo.value = {
      message: '비밀번호 확인란을 입력해주세요',
      status: 'danger',
    }
    return
  }

  if (!validateBlank(nickname.value)) {
    nicknameInfo.value = {
      message: '닉네임을 입력해주세요',
      status: 'danger',
    }
    return
  }

  if (!validateBlank(name.value)) {
    nameInfo.value = {
      message: '이름을 입력해주세요',
      status: 'danger',
    }
    return
  }

  if (!validateBlank(phone.value)) {
    phoneInfo.value = {
      message: '전화번호를 입력해주세요',
      status: 'danger',
    }
    return
  }

  if (!validatePassword(password.value, passwordCheck.value)) {
    passwordCheckInfo.value = {
      message: '비밀번호가 일치하지 않습니다',
      status: 'danger',
    }
    return
  }

  if (gender.value === null) {
    addToast('성별을 입력해주세요', 'danger')
    return
  }
  if (birthYear.value === null) {
    addToast('생년월일을 입력해주세요', 'danger')
    return
  }
  if (birthMonth.value === null) {
    addToast('생년월일을 입력해주세요', 'danger')
    return
  }
  if (birthDate.value === null) {
    addToast('생년월일을 입력해주세요', 'danger')
    return
  }
  if (agency.value === null) {
    addToast('통신사를 선택해주세요', 'danger')
    return
  }

  try {
    const { data } = await api.post<IResponse<any>>('/users', {
      name: name.value,
      nickname: nickname.value,
      email: email.value,
      password: password.value,
      phone: phone.value,
      birthday: `${birthYear.value
        ?.toString()
        .padStart(2, '0')}-${birthMonth.value
        ?.toString()
        .padStart(2, '0')}-${birthDate.value?.toString().padStart(2, '0')}`,
      gender: gender.value,
    })
    console.log(data)
    emits('onNext')
  } catch (err) {
    console.error(err)
  }
}

watch([birthYear, birthMonth], ([year, month]) => {
  if (!year || !month) return

  const lastDate = getLastDate(year, month - 1)
  const tmpDateArr = []
  for (let i = 0; i < lastDate; i++) {
    tmpDateArr.push(i + 1)
  }
  dateArr.value = tmpDateArr
})

onMounted(() => {
  const lastYear = getLastYear()
  const lastMonth = 12

  const tmpYearArr = []
  for (let i = 1970; i <= lastYear; i++) {
    tmpYearArr.push(i)
  }

  const tmpMonthArr = []
  for (let i = 0; i < lastMonth; i++) {
    tmpMonthArr.push(i + 1)
  }

  yearArr.value = tmpYearArr
  monthArr.value = tmpMonthArr
})
</script>

<template>
  <section class="flex flex-col w-full gap-2">
    <div class="flex sm:flex-row flex-col gap-2 w-full">
      <div class="flex flex-col gap-2 pt-4 pb-4 flex-1">
        <h3 class="text-indigo-600 font-semibold text-sm pl-1">회원정보</h3>
        <Input
          :value="email"
          :info="emailInfo ?? undefined"
          class="w-full"
          label="이메일"
          @onChange="(v) => (email = v)"
        />
        <Input
          :value="password"
          :info="passwordInfo ?? undefined"
          class="w-full"
          label="비밀번호"
          @onChange="(v) => (password = v)"
          type="password"
        />
        <Input
          :value="passwordCheck"
          :info="passwordCheckInfo ?? undefined"
          class="w-full"
          label="비밀번호 확인"
          @onChange="(v) => (passwordCheck = v)"
          type="password"
        />
        <Input
          :value="nickname"
          :info="nicknameInfo ?? undefined"
          class="w-full"
          label="닉네임"
          @onChange="(v) => (nickname = v)"
        />
      </div>
      <div class="flex flex-col gap-2 pt-4 pb-4 flex-1">
        <h3 class="text-indigo-600 font-semibold text-sm pl-1">개인정보</h3>
        <Input
          class="w-full"
          label="이름"
          :info="nameInfo ?? undefined"
          :value="name"
          @onChange="(v) => (name = v)"
        />
        <div class="flex gap-2">
          <Dropdown
            class="flex-1"
            :placeholder="birthYear?.toString().concat('년') ?? '생년월일'"
            autoClose
          >
            <p
              class="w-full p-2 hover:bg-indigo-600 hover:text-white text-sm text-zinc-600"
              @click="birthYear = e"
              v-for="e in yearArr"
            >
              {{ e }}년
            </p>
          </Dropdown>
          <Dropdown
            class="w-24"
            :placeholder="birthMonth?.toString().concat('월') ?? '월'"
            autoClose
          >
            <p
              class="w-full p-2 hover:bg-indigo-600 hover:text-white text-sm text-zinc-600"
              @click="birthMonth = e"
              v-for="e in monthArr"
            >
              {{ e }}월
            </p>
          </Dropdown>
          <Dropdown
            class="w-24"
            :placeholder="birthDate?.toString().concat('일') ?? '일'"
            autoClose
          >
            <p
              class="w-full p-2 hover:bg-indigo-600 hover:text-white text-sm text-zinc-600"
              @click="birthDate = e"
              v-for="e in dateArr"
            >
              {{ e }}일
            </p>
            <p
              class="w-full p-2 hover:bg-indigo-600 hover:text-white text-sm text-zinc-600"
              v-if="dateArr.length === 0"
            >
              선택
            </p>
          </Dropdown>
        </div>
        <Dropdown class="w-full" :placeholder="gender ?? '성별'" autoClose>
          <button class="dropdown-li" @click="gender = '남'">남</button>
          <button class="dropdown-li" @click="gender = '여'">여</button>
          <button class="dropdown-li" @click="gender = '공개안함'">
            공개안함
          </button>
        </Dropdown>
        <div class="flex gap-2">
          <Dropdown class="w-28" :placeholder="agency ?? '통신사'" autoClose>
            <button class="dropdown-li" @click="agency = 'SKT'">SKT</button>
            <button class="dropdown-li" @click="agency = 'KT'">KT</button>
            <button class="dropdown-li" @click="agency = 'LG U+'">LG U+</button>
            <button class="dropdown-li" @click="agency = '알뜰폰'">
              알뜰폰
            </button>
          </Dropdown>
          <Input
            class="flex-1"
            :value="phone"
            label="전화번호"
            :info="phoneInfo ?? undefined"
            @onChange="(v) => (phone = v)"
            :encoder="telIncoder"
            :decoder="telDecoder"
            :rule="telRool"
          />
        </div>
      </div>
    </div>
    <Button class="mt-12" @onClick="submitHandler">다음</Button>
  </section>
</template>
