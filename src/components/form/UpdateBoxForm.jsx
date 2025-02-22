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
import { useUpdateBox } from "@/hooks/useBoxes";

UpdateBoxForm.propTypes = { row: PropTypes.object, setOpen: PropTypes.func };

const formSchema = z.object({
  size: z.string(),
  condition: z.string(),
  retention_days: z.number(),
  status: z.string(),
});

export default function UpdateBoxForm({ row, setOpen }) {
  const { updateBox, isUpdating } = useUpdateBox();
  const form = useForm({
    defaultValues: {
      size: row.size,
      condition: row.condition,
      retention_days: row.retention_days,
      status: row.status,
    },
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values) {
    const formattedValues = {
      ...values,
      retention_days: Number(values.retention_days),
    };
    try {
      updateBox({ boxId: row.id, values: formattedValues });
      console.log(row.id, formattedValues);
      setOpen(false);
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
        <div className="flex justify-end gap-2">
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
  );
}
