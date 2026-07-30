// Button
export { Button, ButtonVariants } from './Button';
export type { ButtonProps, ButtonVariantsType } from './Button';

// ButtonGroup
export { ButtonGroup, buttonGroupVariants } from './ButtonGroup';
export type { ButtonGroupProps, ButtonGroupVariants } from './ButtonGroup';

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

// CodeWell — read-only monospace surface. Both Org Mgmt and Agent Fleet asked
// for exactly this in their audits.
export { CodeWell, codeWellVariants } from './CodeWell';
export type { CodeWellProps, CodeWellVariantsType, CodeWellSurface } from './CodeWell';

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

// Label — the uppercase micro-heading, settling three competing letter-spacings
export { Label, labelVariants } from './Label';
export type { LabelProps, LabelVariantsType, LabelSize } from './Label';

// Progress — value fill with optional baseline and floor markers
export { Progress, progressVariants } from './Progress';
export type {
  ProgressProps,
  ProgressOwnProps,
  ProgressVariantsType,
  ProgressTone,
  ProgressSize,
} from './Progress';

// SecretDots — a masked secret, at a fixed length so it leaks nothing
export { SecretDots, BULLET_COUNT } from './SecretDots';
export type { SecretDotsProps, SecretDotsSize } from './SecretDots';

// Badge — one atom covering status pills, chips, counts, protocol pills and
// bare icon+text labels, which the source systems built as five components
export { Badge, badgeVariants } from './Badge';
export type {
  BadgeProps,
  BadgeOwnProps,
  BadgeVariantsType,
  BadgeTone,
  BadgeShape,
  BadgeSize,
} from './Badge';

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

// Popover
export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor, PopoverClose } from './Popover';
export type { PopoverProps, PopoverTriggerProps, PopoverContentProps } from './Popover';

// Select
export { Select, selectTriggerVariants } from './Select';
export type {
  SelectProps,
  SelectOption,
  SelectOptionGroup,
  SelectMode,
  SelectSize,
} from './Select';

// TagPill
export { TagPill, tagPillVariants } from './TagPill';
export type { TagPillProps, TagPillVariants } from './TagPill';

// Toolbar
export { Toolbar, ToolbarSection, ToolbarSpacer, toolbarVariants } from './Toolbar';
export type { ToolbarProps, ToolbarVariants } from './Toolbar';

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

// Container
export { Container, containerVariants } from './Container';
export type { ContainerProps, ContainerVariants } from './Container';

// Stack
export { Stack, stackVariants } from './Stack';
export type { StackProps, StackVariants } from './Stack';

// Separator
export { Separator, separatorVariants } from './Separator';
export type { SeparatorProps, SeparatorVariants } from './Separator';

// Grid
export { Grid, gridVariants } from './Grid';
export type { GridProps, GridVariants } from './Grid';

// Flex
export { Flex, flexVariants } from './Flex';
export type { FlexProps, FlexVariants } from './Flex';

// Checkbox
export * from './Checkbox';

// Radio
export * from './Radio';

// Switch
export { MotadataSwitch, motadataSwitchRootVariants, motadataSwitchThumbVariants } from './Switch';
export type { MotadataSwitchProps, MotadataSwitchVariants } from './Switch';

// Tabs
export { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';
export type {
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
  TabsVariant,
} from './Tabs';

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

// OTPInput
export { OTPInput } from './OTPInput';
export type { OTPInputProps } from './OTPInput';

// Spinner
export { Spinner, spinnerVariants } from './Spinner';
export type { SpinnerProps, SpinnerVariants } from './Spinner';

// Textarea
export { Textarea, textareaVariants } from './Textarea';
export type { TextareaProps, TextareaVariants } from './Textarea';

// Toggle
export { Toggle, toggleVariants } from './Toggle';
export type { ToggleProps, ToggleVariants } from './Toggle';

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

// Tooltip
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './Tooltip';
export type {
  TooltipProps,
  TooltipTriggerProps,
  TooltipContentProps,
  TooltipContentRef,
  TooltipProviderProps,
} from './Tooltip';

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

// Skeleton
export { Skeleton, skeletonVariants } from './Skeleton';
export type { SkeletonProps, SkeletonVariants } from './Skeleton';

// Table
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from './Table';
export type {
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableFooterProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
  TableCaptionProps,
} from './Table';

// Item
export { Item, itemVariants } from './Item';
export type { ItemProps, ItemVariants } from './Item';

// Icon
export { Icon, iconVariants, iconRegistry, iconNames } from './Icon';
export type { IconProps, IconVariants, IconName, IconSize, IconColor } from './Icon';

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
