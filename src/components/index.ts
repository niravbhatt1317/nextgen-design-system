// Every component this library exports.
//
// ORDER IS ALPHABETICAL, AND THAT IS LOAD-BEARING. Add your component in its
// alphabetical place - do not append to the end.
//
// This file is the one file every new component has to touch, so it is the one
// place two people working in parallel are guaranteed to collide. When the list
// was in append-order, both of us added at the last line and conflicted on
// every single pull request. Alphabetical insertion puts two new components
// hundreds of lines apart, and git merges them without a word.

// Avatar — circle or rounded square, photo or initials. The colour is derived
// from the name, so one person is always one colour.
export { Avatar, AvatarStack, avatarVariants, toneForName, initialsForName } from './Avatar';
export type {
  AvatarProps,
  AvatarOwnProps,
  AvatarStackProps,
  AvatarVariantsType,
  AvatarTone,
  AvatarSize,
  AvatarShape,
} from './Avatar';

// Badge — one atom covering status pills, chips, counts, protocol pills and
// icon-only status marks, which the source systems built as five components.
// Four switches: what it means, how loud it is, its corner radius and its size.
export { Badge, badgeVariants } from './Badge';
export type {
  BadgeProps,
  BadgeOwnProps,
  BadgeVariantsType,
  BadgeTone,
  BadgeEmphasis,
  BadgeShape,
  BadgeSize,
} from './Badge';

// Button
export { Button, ButtonVariants } from './Button';
export type { ButtonProps, ButtonVariantsType } from './Button';

// ButtonGroup
export { ButtonGroup, buttonGroupVariants } from './ButtonGroup';
export type { ButtonGroupProps, ButtonGroupVariants } from './ButtonGroup';

// Card — a surface that holds related content in the page. It does not open,
// close, float or freeze the page behind it; those are Modal and Popover, which
// borrow this surface and add their own behaviour. Clickable and collapsible
// ship as separate components so a control inside a control cannot be written.
export {
  Card,
  CardMedia,
  CardHeader,
  CardBody,
  CardFooter,
  ClickableCard,
  CollapsibleCard,
  cardVariants,
} from './Card';
export type {
  CardProps,
  CardOwnProps,
  CardSurface,
  CardPadding,
  CardMediaProps,
  CardHeaderProps,
  CardHeaderOwnProps,
  CardBodyProps,
  CardFooterProps,
  CardFooterOwnProps,
  ClickableCardProps,
  ClickableCardOwnProps,
  CollapsibleCardProps,
  CollapsibleCardOwnProps,
} from './Card';

// Checkbox
export * from './Checkbox';

// CodeWell — read-only monospace surface. Both Org Mgmt and Agent Fleet asked
// for exactly this in their audits.
export { CodeWell, codeWellVariants } from './CodeWell';
export type { CodeWellProps, CodeWellVariantsType, CodeWellSurface } from './CodeWell';

// Combobox
export { Combobox, comboboxTriggerVariants } from './Combobox';
export type {
  ComboboxProps,
  ComboboxOption,
  ComboboxTriggerVariants,
  RenderOptionProps,
  RenderTriggerProps,
} from './Combobox';

// Command
export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from './Command';
export type {
  CommandProps,
  CommandDialogProps,
  CommandInputProps,
  CommandListProps,
  CommandEmptyProps,
  CommandGroupProps,
  CommandItemProps,
  CommandSeparatorProps,
  CommandShortcutProps,
} from './Command';

// Container
export { Container, containerVariants } from './Container';
export type { ContainerProps, ContainerVariants } from './Container';

// Dialog
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './Dialog';
export type {
  DialogProps,
  DialogTriggerProps,
  DialogPortalProps,
  DialogOverlayProps,
  DialogContentProps,
  DialogHeaderProps,
  DialogFooterProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogCloseProps,
} from './Dialog';

// DropdownMenu
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from './DropdownMenu';
export type {
  DropdownMenuProps,
  DropdownMenuTriggerProps,
  DropdownMenuGroupProps,
  DropdownMenuPortalProps,
  DropdownMenuSubProps,
  DropdownMenuRadioGroupProps,
  DropdownMenuSubTriggerProps,
  DropdownMenuSubContentProps,
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuCheckboxItemProps,
  DropdownMenuRadioItemProps,
  DropdownMenuLabelProps,
  DropdownMenuSeparatorProps,
  DropdownMenuShortcutProps,
} from './DropdownMenu';

// Backward compatibility (deprecated)
/** @deprecated Use DropdownMenu instead. Will be removed in v2.0.0 */
export { DropdownMenu as Dropdown } from './DropdownMenu';

// Flex
export { Flex, flexVariants } from './Flex';
export type { FlexProps, FlexVariants } from './Flex';

// Form
export { Form, FormField, FormLabel, FormControl, FormMessage, FormDescription } from './Form';
export type {
  FormProps,
  FormFieldProps,
  FormLabelProps,
  FormControlProps,
  FormMessageProps,
  FormDescriptionProps,
} from './Form';

// Grid
export { Grid, gridVariants } from './Grid';
export type { GridProps, GridVariants } from './Grid';

// HoverCard
export {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  HoverCardPortal,
  HoverCardArrow,
} from './HoverCard';
export type {
  HoverCardProps,
  HoverCardTriggerProps,
  HoverCardContentProps,
  HoverCardArrowProps,
} from './HoverCard';

// Icon
export { Icon, iconVariants, iconRegistry, iconNames } from './Icon';
export type { IconProps, IconVariants, IconName, IconSize, IconColor } from './Icon';

// IconTile — tinted container for a single icon. Org Mgmt's most duplicated
// inline pattern.
export { IconTile, iconTileVariants } from './IconTile';
export type {
  IconTileProps,
  IconTileVariantsType,
  IconTileTone,
  IconTileSize,
  IconTileShape,
} from './IconTile';

// Input
export { Input, InputVariants } from './Input';
export type { InputProps, InputVariantsType } from './Input';

// InputGroup
export {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupButton,
  InputGroupTextarea,
} from './InputGroup';
export type {
  InputGroupProps,
  InputGroupAddonProps,
  InputGroupInputProps,
  InputGroupTextProps,
  InputGroupButtonProps,
  InputGroupTextareaProps,
} from './InputGroup';

// Item
export { Item, itemVariants } from './Item';
export type { ItemProps, ItemVariants } from './Item';

// Label — the uppercase micro-heading, settling three competing letter-spacings
export { Label, labelVariants } from './Label';
export type { LabelProps, LabelVariantsType, LabelSize } from './Label';

// OTPInput
export { OTPInput } from './OTPInput';
export type { OTPInputProps } from './OTPInput';

// Pagination
export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  paginationLinkVariants,
} from './Pagination';
export type {
  PaginationProps,
  PaginationContentProps,
  PaginationItemProps,
  PaginationLinkProps,
  PaginationEllipsisProps,
} from './Pagination';

// Popover
export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor, PopoverClose } from './Popover';
export type { PopoverProps, PopoverTriggerProps, PopoverContentProps } from './Popover';

// Progress — value fill with optional baseline and floor markers
export { Progress, progressVariants } from './Progress';
export type {
  ProgressProps,
  ProgressOwnProps,
  ProgressVariantsType,
  ProgressTone,
  ProgressSize,
} from './Progress';

// Radio
export * from './Radio';

// Resizable
export { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './Resizable';
export type {
  ResizablePanelGroupProps,
  ResizablePanelProps,
  ResizableHandleProps,
} from './Resizable';

// ScrollArea
export { ScrollArea, ScrollAreaViewport, ScrollBar, ScrollAreaCorner } from './ScrollArea';
export type {
  ScrollAreaProps,
  ScrollAreaViewportProps,
  ScrollBarProps,
  ScrollAreaCornerProps,
  ScrollOrientation,
} from './ScrollArea';

// SecretDots — a masked secret, at a fixed length so it leaks nothing
export { SecretDots, BULLET_COUNT } from './SecretDots';
export type { SecretDotsProps, SecretDotsSize } from './SecretDots';

// Select
export { Select, selectTriggerVariants } from './Select';
export type {
  SelectProps,
  SelectOption,
  SelectOptionGroup,
  SelectMode,
  SelectSize,
} from './Select';

// Separator
export { Separator, separatorVariants } from './Separator';
export type { SeparatorProps, SeparatorVariants } from './Separator';

// Sheet
export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  sheetVariants,
} from './Sheet';
export type {
  SheetProps,
  SheetTriggerProps,
  SheetPortalProps,
  SheetOverlayProps,
  SheetContentProps,
  SheetHeaderProps,
  SheetFooterProps,
  SheetTitleProps,
  SheetDescriptionProps,
  SheetCloseProps,
  SheetSide,
  SheetVariants,
} from './Sheet';

// Sidebar
export {
  Sidebar,
  SidebarHeader,
  SidebarSearch,
  SidebarContent,
  SidebarSection,
  SidebarLabel,
  SidebarCollapse,
  SidebarItem,
  SidebarFooter,
  sidebarVariants,
} from './Sidebar';
export type {
  SidebarProps,
  SidebarVariants,
  SidebarHeaderProps,
  SidebarSearchProps,
  SidebarContentProps,
  SidebarSectionProps,
  SidebarLabelProps,
  SidebarCollapseProps,
  SidebarItemProps,
  SidebarFooterProps,
} from './Sidebar';

// Skeleton
export { Skeleton, skeletonVariants } from './Skeleton';
export type { SkeletonProps, SkeletonVariants } from './Skeleton';

// Spinner
export { Spinner, spinnerVariants } from './Spinner';
export type { SpinnerProps, SpinnerVariants } from './Spinner';

// Stack
export { Stack, stackVariants } from './Stack';
export type { StackProps, StackVariants } from './Stack';

// Switch
export { MotadataSwitch, motadataSwitchRootVariants, motadataSwitchThumbVariants } from './Switch';
export type { MotadataSwitchProps, MotadataSwitchVariants } from './Switch';

// Table — density, striping, sticky header, alignment, sort and selection state
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableGroupRow,
  TableExpandTrigger,
  TableHead,
  TableCell,
  TableCaption,
  tableHeadVariants,
  tableCellVariants,
  tableRowVariants,
  tableGroupRowVariants,
  TableToolbar,
  TableToolbarActions,
  TableSortMenu,
  TableViewMenu,
  TableBulkBar,
  TableBulkAction,
  TableBulkSeparator,
  DataTable,
  TableFilterMenu,
  TableFilterChips,
  TableColumnMenu,
  TableColumnBoundary,
  useColumnWidths,
  useColumnReorder,
  useTableColumns,
  toCsv,
  useTableFilters,
  useTablePagination,
  useTableSelection,
  useTableSort,
} from './Table';
export type {
  ColumnWidths,
  UseColumnWidths,
  UseColumnWidthsOptions,
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableFooterProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
  TableCaptionProps,
  TableGroupRowProps,
  TableExpandTriggerProps,
  TableDensity,
  TableAlign,
  TableSortOrder,
  TableIndent,
  TableToolbarProps,
  TableToolbarActionsProps,
  TableSortMenuProps,
  TableViewMenuProps,
  TableBulkBarProps,
  TableBulkActionProps,
  TableFilterMenuProps,
  TableFilterChipsProps,
  DataTableProps,
  TableColumnMenuProps,
  TableColumnBoundaryProps,
  TableColumnDef,
  TableColumnView,
  TableColumnsState,
  UseTableColumns,
} from './Table';

// Tabs
export { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';
export type {
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
  TabsVariant,
} from './Tabs';

// TagPill — a label a person put there and can take away. Badge is the other
// half of the pair: a label the system applies, which nobody removes.
export { TagPill, tagPillVariants } from './TagPill';
export type { TagPillProps, TagPillOwnProps, TagPillVariants, TagPillShape } from './TagPill';

// Textarea
export { Textarea, textareaVariants } from './Textarea';
export type { TextareaProps, TextareaVariants } from './Textarea';

// Toast
export { Toast, toast } from './Toast';
export type {
  ToastProps,
  ToastPosition,
  ToastTheme,
  ToastType,
  ToasterProps,
  ToastFunction,
  PromiseToastOptions,
} from './Toast';

// Toggle
export { Toggle, toggleVariants } from './Toggle';
export type { ToggleProps, ToggleVariants } from './Toggle';

// ToggleGroup
export {
  ToggleGroup,
  ToggleGroupItem,
  toggleGroupVariants,
  toggleGroupItemVariants,
} from './ToggleGroup';
export type {
  ToggleGroupProps,
  ToggleGroupSingleProps,
  ToggleGroupMultipleProps,
  ToggleGroupItemProps,
  ToggleGroupVariants,
  ToggleGroupItemVariants,
} from './ToggleGroup';

// Toolbar
export { Toolbar, ToolbarSection, ToolbarSpacer, toolbarVariants } from './Toolbar';
export type { ToolbarProps, ToolbarVariants } from './Toolbar';

// Tooltip
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './Tooltip';
export type {
  TooltipProps,
  TooltipTriggerProps,
  TooltipContentProps,
  TooltipContentRef,
  TooltipProviderProps,
} from './Tooltip';
