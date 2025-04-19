import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useStationSignup } from "../../hooks/authentication/useStationSignup";
import { useDebouncedLatLng } from "@/hooks/authentication/useDebouncedLatLng";
import { convertToIntlPhoneFormat } from "@/utils/helpers";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const style = {
  input: `border-main-100 bg-white focus-visible:border-none focus-visible:ring-main-500 focus:border-none focus:ring-main-500`,
};

const formSchema = z.object({
  station_name: z.string().min(1, {
    message: "站點名稱為必填欄位",
  }),
  address: z.string().min(5, {
    message: "地址至少要有五個字",
  }),
  phone: z
    .string()
    .min(1, { message: "電話為必填欄位" })
    .regex(/^(0[2-8]\d{7,8}|09\d{8})$/, {
      message: "請輸入正確格式的電話號碼",
    }),
});

function StationSignupForm() {
  const { createStationAsync, isCreatingStation } = useStationSignup();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      station_name: "",
      address: "",
      phone: "",
    },
  });

  const {
    latLng,
    fetchLatLng,
    isLoading: isLoadingLatLng,
    errorMessage,
  } = useDebouncedLatLng({
    setFromErrorMessage: (message) => {
      form.setError("address", {
        type: "manual",
        message,
      });
    },
  });

  async function onSubmit(value) {
    if (!latLng) {
      form.setFocus("address");
      form.setError("address", {
        type: "manual",
        message: errorMessage,
      });
      return;
    }

    const newStation = {
      ...value,
      ...latLng,
      available_slots: { L: 0, M: 0, S: 0, XL: 0 },
      image_url: "",
      phone: convertToIntlPhoneFormat(value.phone),
    };

    await createStationAsync(newStation);
  }

  function handleAddressChange(e, field) {
    field.onChange(e);
    fetchLatLng(e.target.value);
  }

  return (
    <>
      {/* row */}
      <div className="flex h-full items-center">
        {/* col */}
        <div className="flex grow flex-col gap-5 rounded-xl bg-main-100 p-6 shadow shadow-neutral-400 md:flex-row md:justify-between md:p-10">
          <h1 className="fs-5 md:fs-4 flex flex-col font-semibold text-zinc-800 md:font-semibold">
            <span>申請成為轉運站</span>
            <span>加入轉運站長的行列</span>
          </h1>

          <div className="md:w-3/5">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="station_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-950">站點名稱</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="請輸入您的站點名稱"
                          className={style.input}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-950">站點地址</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="請輸入您的站點地址"
                          className={style.input}
                          value={field.value}
                          onChange={(e) => handleAddressChange(e, field)}
                        />
                      </FormControl>

                      {isLoadingLatLng ? (
                        <p className="text-sm text-main-600">
                          <span className="me-2 inline-block h-[14px] w-[14px] animate-spin rounded-full border-[3px] border-main-200 border-t-main-600"></span>
                          查詢地址中
                        </p>
                      ) : (
                        <FormMessage className="text-red-600" />
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-950">聯絡電話</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="請輸入您的聯絡電話"
                          className={style.input}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col items-start gap-5 text-start md:flex-row md:items-center">
                  <button
                    type="submit"
                    className="btn"
                    disabled={isCreatingStation}
                  >
                    送出申請
                  </button>
                  <p className="flex flex-col text-xs text-zinc-500">
                    <span>送出申請即表示您同意接受我們的</span>
                    <span>
                      <a
                        href="#"
                        className="text-second-300 no-underline hover:underline"
                      >
                        服務條款和隱私政策
                      </a>
                      &nbsp;與&nbsp;
                      <a
                        href="#"
                        className="text-second-300 no-underline hover:underline"
                      >
                        智慧財產聲明
                      </a>
                    </span>
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default StationSignupForm;
