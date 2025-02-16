import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
// react query: 更新單一筆紙箱紀錄
import { useMutation } from "@tanstack/react-query";
import { apiUpdateBox } from "@/services/apiBoxes";

const formSchema = z.object({
  size: z.string().optional(),
  condition: z.string().optional(),
  retention_days: z.string().optional(),
  status: z.string().optional(),
});

export default function UpdateBoxForm({ row }) {
  const { mutate, status } = useMutation({
    mutationFn: apiUpdateBox,
    onSuccess: () => {
      console.log("update successfully");
    },
    onError: (error) => {
      console.error("更新失敗:", error);
    },
  });
  const form = useForm({
    defaultValues: {
      size: row.size,
      condition: row.condition,
      retention_days: row.retention_days?.toString(),
      status: row.status,
    },
    resolver: zodResolver(formSchema),
  });
  const { reset } = form;

  function onSubmit(values) {
    try {
      console.log(values);
      mutate(row, values);
      reset();
    } catch (error) {
      console.error("Form submission error", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1.5">
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
                onValueChange={field.onChange}
                defaultValue={row.retention_days?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
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
              <Select onValueChange={field.onChange} defaultValue={row.status}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="可認領">可認領</SelectItem>
                  <SelectItem value="自用">自用</SelectItem>
                  <SelectItem value="售出">售出</SelectItem>
                  <SelectItem value="報廢">報廢</SelectItem>
                  <SelectItem value="保留到期">保留到期</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex">
          <button
            type="submit"
            className="btn ml-auto"
            disabled={status === "pending"}
          >
            {status === "pending" ? "更新中" : "確認送出"}
          </button>
        </div>
      </form>
    </Form>
  );
}
