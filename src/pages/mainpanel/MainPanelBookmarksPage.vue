<template>

***

</template>

<script lang="ts" setup>

import BookmarksPage from "src/bookmarks/pages/BookmarksPage.vue";
import {onMounted, ref, watchEffect} from "vue";
import Analytics from "src/utils/google-analytics";
import {uid, useQuasar} from "quasar";
import {useRoute, useRouter} from "vue-router";

const $q = useQuasar()
const router = useRouter()
const route = useRoute()

const bookmarkId = ref('')

onMounted(() => {
  Analytics.firePageViewEvent('MainPanelBookmarksPage', document.location.href);
})


watchEffect(() => {
  bookmarkId.value = route.params.id as string
})


// const importBookmarks = () => $q.dialog({
//   component: ImportFromBookmarksDialog,
//   componentProps: {
//     count: nonFolders().length,
//     foldersCount: folders().length,
//     inSidePanel: props.inSidePanel
//   }
// })

const deleteBookmarkFolder = () => {

  $q.dialog({
    title: 'Please Confirm Deleting of Bookmarks Folder',
    message: 'Do you really want to delete this folder (and potentially all its subfolders and bookmarks)? This cannot be undone.',
    cancel: true,
    persistent: true
  }).onOk(() => {
    const parentId = bookmarksStore.currentBookmark.chromeBookmark.parentId
    BookmarksService.deleteBookmarksFolder(bookmarksStore.currentBookmark.chromeBookmark.id)
    if (parentId) {
      router.push("/mainpanel/bookmarks/" + parentId)
    }
  }).onCancel(() => {
  }).onDismiss(() => {
  })
}
</script>
