import { FormPopover } from "@/components/form/form-popover";
import { Hint } from "@/components/Hint";
import { Skeleton } from "@/components/ui/skeleton";
import { MAX_FREE_BOARDS } from "@/constants/boards";
import { db } from "@/lib/db";
import { getAvailableCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { HelpCircle, User2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export const BoardList = async() => {
  const { orgId } = auth();

if (!orgId) {
  return redirect("/select-org");
}

const boards = await db.board.findMany({
  where: {
    orgId,
  },
  orderBy: {
    createdAt: "desc"
  }
});

const availableCount = await getAvailableCount()
const isPro = await checkSubscription();

  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        Your boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {boards.map((board) => (
  <Link
    key={board.id}
    href={`/board/${board.id}`}
    className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"
    style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
  >
    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
    <p className="relative font-semibold text-white">
      {board.title}
    </p>
  </Link>
))}

        <FormPopover sideOffset={10} side="right">
        <div
          role="button"
          className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition p-4"
        >
          <p className="text-sm whitespace-nowrap">Create new board</p>
          <span className="text-xs">
            {isPro? "Unlimited":`${MAX_FREE_BOARDS - availableCount} remaining`}
          </span>
          <Hint
          sideOffset={40}
          description={`
            Free Workspace can have up tp 5 open board. For unlimited boards upgrade this workspace
            `}
          >
            <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]"/>
          </Hint>
        </div>
        </FormPopover>
      </div>
    </div>
  );
};


BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  );
}

