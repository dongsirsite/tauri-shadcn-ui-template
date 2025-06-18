import * as React from "react"

import { cn } from "@/lib/utils"
// 定义 Table 组件的 props 类型
interface TableProps extends React.ComponentProps<"table"> {
  className?: string;
  enableRightDrag?: boolean; // 新增参数，控制是否开启右键拖动
  enableFixedHeader?: boolean; // 新增参数，控制是否开启表头固定
}
const useTableDragScroll = (enableRightDrag: boolean) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (enableRightDrag && e.button === 2) { // 2 代表右键
      setIsDragging(true);
      setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
      setScrollLeft(containerRef.current?.scrollLeft || 0);
      containerRef.current?.style.setProperty("cursor", "grabbing");
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current || !enableRightDrag) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current.offsetLeft || 0);
    const walk = x - startX;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (enableRightDrag && e.button === 2) { // 2 代表右键
      setIsDragging(false);
      containerRef.current?.style.setProperty("cursor", "default");
    }
  };

  const handleMouseLeave = () => {
    if (!isDragging || !enableRightDrag) return;
    setIsDragging(false);
    containerRef.current?.style.setProperty("cursor", "default");
  };

  const handleMouseEnter = () => {
    if (!isDragging || !enableRightDrag) {
      containerRef.current?.style.setProperty("cursor", "default");
    }
  };

  // 阻止右键菜单默认行为
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    if (enableRightDrag) {
      e.preventDefault();
    }
  };

  return {
    containerRef,
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseLeave,
    onMouseEnter: handleMouseEnter,
    onContextMenu: handleContextMenu,
  };
};
function Table({ className, enableRightDrag = false, enableFixedHeader = false, ...props }: TableProps) {
  const {
    containerRef,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
    onMouseEnter,
    onContextMenu,
  } = useTableDragScroll(enableRightDrag);

  if (enableFixedHeader) {
    return (
       <div
        ref={containerRef}
      data-slot="table-container"
      className="relative w-full "
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      onContextMenu={onContextMenu}
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
    )
  }
  return (
    <div
        ref={containerRef}
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      onContextMenu={onContextMenu}
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
