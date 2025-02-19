import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PropTypes from "prop-types";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaPen, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { useUpdateStationInfo } from "@/hooks/useUpdateStationInfo";

const formSchema = z.object({
  station_name: z.string().nonempty("站點名稱不得為空"),
  address: z.string().nonempty("地址不得為空"),
  phone: z.string().nonempty("電話不得為空"),
});

AdminInfoForm.propTypes = { station: PropTypes.object };

function AdminInfoForm({ station }) {
  const [isEditing, setIsEditing] = useState(false);
  const { updateStation } = useUpdateStationInfo();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      station_name: station.station_name,
      address: station.address,
      phone: station.phone,
    },
  });

  function onSubmit(values) {
    try {
      console.log(values);
      updateStation(values);
    } catch (error) {
      console.error("Form submission error", error);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold text-gray-700">轉運站長</p>
        <button type="button" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? (
            <FaTimes size={20} />
          ) : (
            <FaPen className="text-main-600" size={20} />
          )}
        </button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto max-w-3xl space-y-4 py-6"
        >
          <FormField
            control={form.control}
            name="station_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <h6 className="text-gray-700">站點名稱</h6>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="請輸入站點名稱"
                    value={station.station_name}
                    type="text"
                    {...field}
                    disabled={!isEditing}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="mt-6">
                <FormLabel>
                  <h6 className="text-gray-700">地址</h6>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="請輸入站點地址"
                    value={station.address}
                    type="text"
                    {...field}
                    disabled={!isEditing}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="mt-6">
                <FormLabel>
                  <h6 className="text-gray-700">電話</h6>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="請輸入電話號碼"
                    value={station.phone}
                    type="text"
                    {...field}
                    disabled={!isEditing}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {isEditing && (
            <button className="btn" type="submit">
              確認修改
            </button>
          )}
        </form>
      </Form>
    </>
  );
}

export default AdminInfoForm;
