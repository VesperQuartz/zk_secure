"use client"
import React from "react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useUserStore } from "@/app/store";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useCreateUser } from "@/app/hooks/api"
import { LoaderPinwheel } from "lucide-react"

const formSchema = z.object({
  username: z.string().min(3, { message: "length of username must be more than 3" })
})
export const AddUser = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);
  const [open, setOpen] = React.useState(user === undefined);
  const create = useCreateUser();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create user</AlertDialogTitle>
        </AlertDialogHeader>
        <React.Fragment>
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => {
              console.log(data);
              create.mutate({ username: data.username }, {
                onSuccess: (data) => {
                  setUser(data)
                  setOpen(false)
                }
              })
            })} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="enter your username" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2">
                <Button type="submit">{create.isPending ? <LoaderPinwheel className="animate-spin" /> : "Submit"}</Button>
                <Button type="button" variant={"destructive"} onClick={() => setOpen(false)}>Close</Button>
              </div>
            </form>
          </Form>
        </React.Fragment>
      </AlertDialogContent>
    </AlertDialog>

  )
}
