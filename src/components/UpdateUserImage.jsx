import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateMember } from "@/hooks/useUpdateMember";
import { apiUploadImage } from "@/services/apiAuth";

const FormSchema = z.object({
  avatar: z.instanceof(FileList).optional(),
  avatar_url: z.string(), // 確保 username 有值
});

function UpdateUserImage() {
  const { updateMember, updateMemberError, isUpdating } = useUpdateMember();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      avatar: "",
      avatar_url:
        "https://zmxloeyrugpwhymnzped.supabase.co/storage/v1/object/public/avatars//my-notion-face-portrait.jpg",
    },
  });

  async function onSubmit(data) {
    console.log(data);
    const res = await apiUploadImage(
      "box-images",
      data.avatar[0],
      "8b9acdef-b856-4c78-ac16-36d199737957",
    );
    console.log("res", res);

    // updateMember({
    //   data: {
    //     avatar_url: data.avatar_url,
    //   },
    // });
  }

  const avatarRef = form.register("avatar");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <Input type="file" {...avatarRef} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="avatar_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>avatar_url</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
export default UpdateUserImage;
