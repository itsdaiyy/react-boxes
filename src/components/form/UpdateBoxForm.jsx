import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { useUpdateBox } from "@/hooks/useBoxes";
import { apiUploadImage } from "@/services/apiBoxes";
import { getExpirationDate, isExpired } from "@/utils/helpers";

UpdateBoxForm.propTypes = { row: PropTypes.object, setOpen: PropTypes.func };

const formSchema = z.object({
  size: z.string(),
  condition: z.string(),
  retention_days: z.number(),
  status: z.string(),
  image: z.instanceof(FileList).optional(),
});

export default function UpdateBoxForm({ row, setOpen }) {
  // 保存到期日
  const retentionDate = getExpirationDate(row.updated_at, row.retention_days);
  const { updateBox, isUpdating } = useUpdateBox();

  const form = useForm({
    defaultValues: {
      size: row.size,
      condition: row.condition,
      retention_days: row.retention_days,
      status: row.status,
      image: undefined,
    },
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values) {
    const uploadedImage = values.image?.[0] || null;
    let imageUrl = row.image_url; // 預設使用舊圖片
    const formattedValues = {
      size: values.size,
      condition: values.condition,
      retention_days: Number(values.retention_days),
      status: values.status,
    };
    try {
      // 上傳圖片
      if (uploadedImage) {
        const res = await apiUploadImage(
          "box-images",
          uploadedImage,
          row.user_id,
        );
        const { publicUrl } = await res;
        imageUrl = publicUrl;
      }
      // 更新boxes資料
      await updateBox({
        boxId: row.id,
        values: { ...formattedValues, image_url: imageUrl },
      });
      setOpen(false);
    } catch (error) {
      console.error("Form submission error", error);
    }
  }

  return (
    <>
      <div className="mb-4 flex gap-4">
        <div className="overflow-hidden rounded">
          <img
            src={row.image_url}
            alt="照片"
            className="h-[150px] w-[150px] transition-transform duration-700 hover:scale-150"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <p>紙箱編號：{row.id}</p>
          <p>新增時間：{row.created_at?.replace("T", " ").slice(0, 16)}</p>
          <p>更新時間：{row.updated_at?.replace("T", " ").slice(0, 16)}</p>
          <p
            className={isExpired(retentionDate) ? "text-red-500" : "text-black"}
          >
            保存到期日：
            {retentionDate}
          </p>
          <p>回收會員：{row.user_id?.slice(0, 18)}</p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1.5">
          <FormField
            control={form.control}
            name="image"
            render={({ field: { onChange, ref } }) => (
              <FormItem>
                <FormLabel>紙箱照片</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    ref={ref}
                    onChange={(e) => onChange(e.target.files)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>紙箱大小</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={row.size}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="特大">特大</SelectItem>
                    <SelectItem value="大">大</SelectItem>
                    <SelectItem value="中">中</SelectItem>
                    <SelectItem value="小">小</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="condition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>紙箱保存等級</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={row.condition}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="全新">全新</SelectItem>
                    <SelectItem value="優">優</SelectItem>
                    <SelectItem value="普通">普通</SelectItem>
                    <SelectItem value="差">差</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="retention_days"
            render={({ field }) => (
              <FormItem>
                <FormLabel>紙箱保留天數</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={
                    row.retention_days ? row.retention_days.toString() : "0"
                  }
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0" disabled>
                      0
                    </SelectItem>
                    <SelectItem value="7">7</SelectItem>
                    <SelectItem value="30">30</SelectItem>
                    <SelectItem value="60">60</SelectItem>
                    <SelectItem value="90">90</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>紙箱狀態</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={row.status}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="可認領">可認領</SelectItem>
                    <SelectItem value="自用">自用</SelectItem>
                    <SelectItem value="售出" disabled>
                      售出
                    </SelectItem>
                    <SelectItem value="報廢">報廢</SelectItem>
                    <SelectItem value="保留到期">保留到期</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-2 py-2">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => {
                setOpen(false);
                toast.error("取消更新");
              }}
            >
              取消
            </button>
            <button type="submit" className="btn" disabled={isUpdating}>
              {isUpdating ? "更新中" : "確認"}
            </button>
          </div>
        </form>
      </Form>
    </>
  );
}
