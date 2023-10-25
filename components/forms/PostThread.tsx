"use client"
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { usePathname, useRouter } from "next/navigation";
import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";

// import { updateUser } from "@/lib/actions/user.actions";
// import { userValidation } from "@/lib/validations/user";
interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

function PostThread({ userId }: { userId: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });
  const onSubmit = async (values : z.infer<typeof ThreadValidation>) => {
            await createThread({
                text : values.thread ,
                author : userId,
                communityId: null,
                path : pathname
            });

            router.push('/');
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10 "
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full gap- mt-10">
              <FormLabel className="text-base-semibold text-light-2 mb-5">
                Content
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={15}
                  placeholder="Enter the Content of the thread"
                  className="account-form_input no-focus "
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-5 bg-primary-500 flex flex-col justify-start gap-10" >Post Thread</Button>
      </form>
    </Form>
  );
}

export default PostThread;
