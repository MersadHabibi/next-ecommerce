"use client";

import { Button } from "@/components/ui/button";
import { FolderSync, ImagePlus, Plus, PlusCircle } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Noto_Sans } from "next/font/google";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import FileInput from "../FileInput";
import { useState } from "react";
import Image from "next/image";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["600"] });

export default function AddCategpry() {
  const [image, setImage] = useState<File>();

  function onSelectImage(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) setImage(event.target.files[0]);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex-center size-9 rounded-md bg-black text-white transition hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80">
        <Plus />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="border-b border-secondry pb-4 dark:border-secondry-dark">
          <AlertDialogTitle className={cn("text-xl", notoSans.className)}>
            Add new category
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Title
            </Label>
            <Input placeholder="title" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Image
            </Label>
            <div className="col-span-3">
              <AspectRatio ratio={16 / 16} className="w-full">
                {image ? (
                  <Image
                    className="h-full w-full rounded-md object-cover"
                    src={URL.createObjectURL(image)}
                    alt="image"
                    width={200}
                    height={200}
                  />
                ) : (
                  <FileInput
                    id="image"
                    onchange={onSelectImage}
                    classname="dark:bg-neutral-900 dark:hover:bg-neutral-800 bg-neutral-200/60">
                    <ImagePlus className="size-12" />
                  </FileInput>
                )}
              </AspectRatio>
            </div>
          </div>
          <AlertDialogFooter className="flex !flex-row items-center justify-end gap-x-2 pt-4">
            <AlertDialogCancel className="mt-0">Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit" className="bg-black dark:bg-white">
              Add
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
