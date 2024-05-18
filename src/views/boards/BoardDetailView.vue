<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import Comment from '@/components/ui/Comment.vue'
import CommentInput from '@/components/ui/CommentInput.vue'
import Like from '@/components/ui/Like.vue'
import Pagination from '@/components/ui/Pagination.vue'
import ProfileImg from '@/components/ui/ProfileImg.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { QuillEditor } from '@vueup/vue-quill'
import { ref } from 'vue'

/*
TODO
api/boards/:id 요청하도록 수정
*/

const pageIdx = ref(1)

const paginationHandler = (idx: number) => {
  pageIdx.value = idx
}
</script>

<template>
  <main class="w-vw p-24 flex flex-col items-center">
    <!-- v:if isOwner == true -->
    <div class="w-full max-w-[800px] flex gap-2 pb-2">
      <Button type="light">수정</Button>
      <Button type="light">삭제</Button>
    </div>
    <article class="flex flex-col w-full max-w-[800px] rounded border p-4">
      <section class="p-3 flex flex-col gap-2 border-b">
        <RouterLink
          class="hover:underline text-zinc-600 text-sm"
          :to="{ name: 'board' }"
          >자유게시판</RouterLink
        >
        <h2 class="text-zinc-800 text-2xl font-semibold pb-2">
          글 제목 입니다. 제목이라구욧!
        </h2>
        <div class="flex justify-between items-end">
          <div class="flex items-center gap-2">
            <ProfileImg class="w-10 h-10" />
            <span class="flex flex-col justify-center">
              <h2 class="h-5 flex items-center text-zinc-600">user1</h2>
              <p class="h-5 flex items-center text-xs text-zinc-400 font-light">
                2024.05.17
              </p>
            </span>
          </div>
          <div
            class="flex justify-end items-center text-xs text-zinc-600 gap-3"
          >
            <button class="flex items-center gap-1">
              <FontAwesomeIcon icon="fa-regular fa-comment" />
              <p>댓글</p>
              <p>17</p>
            </button>
            <button>URL 복사</button>
          </div>
        </div>
      </section>
      <section class="no-border">
        <QuillEditor
          theme="snow"
          readOnly
          content="<h1>안녕하세요!</h1><p><br></p><p>게시글이 잘 작동하는지 확인하기 위한 게시글입니다.</p><p><br></p><h2>Where does it come from?</h2><p>'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32.</p><blockquote class='ql-align-justify'>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32.</blockquote><pre class='ql-syntax ql-align-justify' spellcheck='false'>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</pre><p><br></p>"
          contentType="html"
          :options="{ modules: { toolbar: false } }"
        />
      </section>

      <div
        class="flex justify-end items-center gap-3 text-xs text-zinc-600 pr-1"
      >
        <button class="flex items-center gap-1">
          <Like :value="false" />
          <p>좋아요</p>
          <p>21</p>
        </button>
        <button class="flex items-center gap-1">
          <FontAwesomeIcon icon="fa-regular fa-comment" />
          <p>댓글</p>
          <p>17</p>
        </button>
      </div>

      <!-- Comment Section -->
      <section
        id="comment"
        class="pt-3 pb-3 text-sm text-zinc-600 flex flex-col gap-4"
      >
        <div class="flex justify-start items-start gap-2 pb-2 border-b">
          <div class="w-9 h-9 flex justify-center items-center">
            <ProfileImg class="w-8 h-8" />
          </div>
          <CommentInput />
        </div>
        <ul class="flex flex-col items-end gap-2">
          <Comment
            writer="user1"
            content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            :time="new Date()"
          />
          <Comment
            writer="user1"
            content="Reply!!!"
            :time="new Date()"
            isReply
          />
          <Comment writer="user1" content="OK" :time="new Date()" isReply />
          <Comment
            writer="user1"
            content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            :time="new Date()"
          />
          <Comment writer="user1" content="Please help me" :time="new Date()" />
        </ul>
        <!-- comment count <= 15이면 표시 X -->
        <div class="w-full flex justify-center">
          <Pagination
            :idx="pageIdx"
            :countPerPage="15"
            :totalCount="178"
            @onClick="paginationHandler"
            @onPrev="paginationHandler"
            @onNext="paginationHandler"
          />
        </div>
      </section>
    </article>
  </main>
</template>
