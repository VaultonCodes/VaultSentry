import { onMounted, reactive } from 'vue';
import { listDataByType } from '@/api/system/dict/data/index.ts';

export function useDict(dictType: Array<string>) {
  const dicts: any = reactive({});
  onMounted(async () => {
    if (dictType.length > 0) {
      for (const type of dictType) {
        const res: any = await listDataByType(type);
        if (res.data != null) {
          dicts[type] = res.data;
        }
      }
    }
  });
  return { dicts };
}
